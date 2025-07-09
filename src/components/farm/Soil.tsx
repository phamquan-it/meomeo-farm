/**
 * Soil.tsx
 *
 * Renders all soil tiles in the Meo Meo Farm game using react-konva.
 *
 * Props:
 * - `soilTiles`: Array of soil tile objects containing position and status info
 * - `tileSize`: Width and height of each square tile
 *
 * Features:
 * - Displays brown tiles to represent farmable soil, with rounded corners and shadows
 * - Shows status icons on each tile if conditions apply:
 *   - 💧 for dry soil
 *   - 🪱 for lacking fertilizer
 *   - 🌿 for weedy soil
 *
 * Notes:
 * - Each tile is grouped using `Group` for clean organization and performance
 * - Status icons are positioned inside the tile, aligned to the top-right
 */

"use client";

import { SoilTile } from "@/types";
import { Layer, Rect, Group, Text } from "react-konva";

export default function Soil({
    soilTiles,
    tileSize,
}: {
    soilTiles: SoilTile[];
    tileSize: number;
}) {
    return (
        <Layer>
            {soilTiles.map((tile) => (
                <Group key={tile.id}>
                    {/* Ô đất */}
                    <Rect
                        x={tile.x}
                        y={tile.y}
                        width={tileSize}
                        height={tileSize}
                        fill="#a0522d"
                        cornerRadius={6}
                        shadowBlur={4}
                        shadowColor="#5e3928"
                        shadowOffset={{ x: 0, y: 0 }}
                        shadowOpacity={0.4}
                    />


                    {/* Trạng thái đất */}
                    {tile.status?.dry && (
                        <Text
                            text="💧"
                            fontSize={10}
                            x={tile.x + tileSize - 20}
                            y={tile.y + 4}
                        />
                    )}
                    {tile.status?.noFertilizer && (
                        <Text
                            text="🪱"
                            fontSize={10}
                            x={tile.x + tileSize - 20}
                            y={tile.y + 24}
                        />
                    )}
                    {tile.status?.weedy && (
                        <Text
                            text="🌿"
                            fontSize={10}
                            x={tile.x + tileSize - 20}
                            y={tile.y + 44}
                        />
                    )}
                </Group>
            ))}
        </Layer>
    );
}

