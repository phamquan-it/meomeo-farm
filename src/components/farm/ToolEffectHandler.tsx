// components/farm/ToolEffectHandler.tsx
"use client";

import { useEffect } from "react";
import { useFarmStore } from "@/stores/useFarmStore";

/**
 * Auto-applies the selected tool (water, fertilizer, weed remover)
 * to nearby soil tiles based on cat position.
 */
export default function ToolEffectHandler() {
    const soilTiles = useFarmStore((s) => s.soilTiles);
    const cat = useFarmStore((s) => s.cat);
    const tool = useFarmStore((s) => s.tool);
    const setTileStatus = useFarmStore((s) => s.setTileStatus);

    useEffect(() => {
        soilTiles.forEach((tile) => {
            const distance = Math.hypot(tile.centerX - cat.x, tile.centerY - cat.y);
            if (distance < 40) {
                switch (tool) {
                    case "water":
                        if (tile.status?.dry) setTileStatus(tile.id, { dry: false });
                        break;
                    case "fertilizer":
                        if (tile.status?.noFertilizer) setTileStatus(tile.id, { noFertilizer: false });
                        break;
                    case "weed-remover":
                        if (tile.status?.weedy) setTileStatus(tile.id, { weedy: false });
                        break;
                    default:
                        if (tile.status?.hasPlant) setTileStatus(tile.id, { hasPlant: false });
                }
            }
        });
    }, [soilTiles, cat, tool, setTileStatus]);

    return null; // invisible component
}

