/**
 * Pond.tsx
 *
 * Renders a decorative pond in the Meo Meo Farm scene using react-konva.
 *
 * Props:
 * - `stageWidth`: Full width of the canvas; used to position the pond near the right edge
 * - `y`: Vertical offset for aligning the pond with the sky or grass layers
 *
 * Features:
 * - Draws a light-blue rounded rectangle with a subtle blue stroke
 * - Positioned statically near the top-right corner of the canvas
 *
 * Notes:
 * - Purely visual; currently has no interactivity or gameplay effect
 * - Could be expanded later for fishing features or decorative animation
 */

"use client";

import { Layer, Rect } from "react-konva";

export default function Pond({ stageWidth, y }: { stageWidth: number; y: number }) {
    return (
        <Layer>
            <Rect
                x={stageWidth - 140}
                y={y + 30}
                width={100}
                height={60}
                fill="#00bfff"
                stroke="blue"
                strokeWidth={0.3}
                cornerRadius={30}
            />
        </Layer>
    );
}

