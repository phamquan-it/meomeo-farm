/**
 * Grass.tsx
 *
 * Renders the grass section of the farm scene using react-konva.
 *
 * Props:
 * - `y`: Vertical position on the canvas
 * - `width`: Full width of the grass layer
 * - `height`: Height of the grass area
 *
 * Features:
 * - Displays a solid green rectangle to visually represent the grass field
 * - Wrapped inside a `Layer` for proper rendering in the Konva stage
 */

"use client";

import { ReactNode } from "react";
import { Layer, Rect } from "react-konva";

export default function Grass({
    y,
    width,
    height,

}: {
    y: number;
    width: number;
    height: number;
}) {
    return (
        <Layer>
            <Rect y={y} width={width} height={height} fill="#4CAF50" />
        </Layer>
    );
}

