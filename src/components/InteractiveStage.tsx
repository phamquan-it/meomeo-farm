// components/farm/wrappers/InteractiveStage.tsx
"use client";

import { ReactNode } from "react";
import { Stage } from "react-konva";
import { useFarmStore } from "@/stores/useFarmStore";
import { SoilTile } from "@/types";

type Props = {
    width: number;
    height: number;
    soilTiles: SoilTile[];
    soilArea: {
        tileSize: number;
    };
    children: ReactNode;
};

export default function InteractiveStage({
    width,
    height,
    soilTiles,
    soilArea,
    children,
}: Props) {
    const plantSelectedEmojiAt = useFarmStore((s) => s.plantSelectedEmojiAt);
    const setTileStatus = useFarmStore((s) => s.setTileStatus);

    const handleCanvasClick = (e: any) => {
        const stage = e.target.getStage();
        const pointer = stage?.getPointerPosition();
        if (!pointer) return;

        const matchedTile = soilTiles.find(
            (tile) =>
                pointer.x >= tile.x &&
                pointer.x <= tile.x + soilArea.tileSize &&
                pointer.y >= tile.y &&
                pointer.y <= tile.y + soilArea.tileSize
        );

        if (!matchedTile) return;

        // ❌ Đã có cây thì không cho trồng nữa
        if (matchedTile?.status?.hasPlant) return;

        const centerX = matchedTile.centerX - 24;
        const centerY = matchedTile.centerY - 24;

        plantSelectedEmojiAt(centerX, centerY);

        // ✅ Cập nhật trạng thái có cây sau khi trồng
        setTileStatus(matchedTile.id, {
            dry: Math.random() < 0.2,
            noFertilizer: Math.random() < 0.2,
            weedy: Math.random() < 0.2,
            hasPlant: true, // <--- đánh dấu đã trồng
        });
    };

    return (
        <Stage width={width} height={height} onClick={handleCanvasClick}>
            {children}
        </Stage>
    );
}

