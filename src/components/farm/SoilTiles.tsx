/**
 * SoilTiles.tsx
 *
 * A simplified version of the soil renderer for Meo Meo Farm.
 *
 * Props:
 * - `soilTiles`: Array of tile positions (each with `x` and `y` coordinates)
 * - `tileSize`: Width and height of each soil tile square
 *
 * Features:
 * - Renders brown soil tiles with rounded corners
 * - No tile status or interactivity — purely visual for layout or testing
 *
 * Use Case:
 * - Useful for prototyping or rendering static soil grids without logic
 */

"use client";

import { Rect } from "react-konva";

export default function SoilTiles({
    soilTiles,
    tileSize,
}: {
    soilTiles: { x: number; y: number }[];
    tileSize: number;
}) {
    return (
        <>
            {soilTiles.map((tile, i) => (
                <Rect
                    key={i}
                    x={tile.x}
                    y={tile.y}
                    width={tileSize}
                    height={tileSize}
                    fill="#a0522d"
                    cornerRadius={6}
                />
            ))}
        </>
    );
}

