/**
 * Sky.tsx
 *
 * Renders the animated sky layer for the Meo Meo Farm game using react-konva.
 *
 * Features:
 * - Displays a blue sky background (`skyblue`)
 * - Generates 5 random clouds at mount time with varying sizes, positions, and movement vectors
 * - Animates clouds using simple physics (vx, vy) updated every ~40ms (~25fps)
 * - Clouds loop around the screen edges for continuous motion
 *
 * Visual:
 * - Each cloud is an emoji ("☁️") with opacity and soft shadow for depth
 *
 * Notes:
 * - Uses a fixed update interval via `setInterval` inside `useEffect`
 * - Automatically re-generates clouds when `width` or `height` changes
 */

"use client";

import { useEffect, useState } from "react";
import { Layer, Rect, Text } from "react-konva";

interface Cloud {
    id: number;
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
}

export default function Sky({ width, height }: { width: number; height: number }) {
    const [clouds, setClouds] = useState<Cloud[]>([]);

    // Khởi tạo mây ban đầu
    useEffect(() => {
        const initialClouds: Cloud[] = Array.from({ length: 5 }).map((_, i) => {
            const speed = Math.random() * 0.4 + 0.1; // 0.1 → 0.5 px/frame
            const angle = Math.random() * Math.PI * 2; // góc gió ngẫu nhiên
            return {
                id: i,
                x: Math.random() * width,
                y: Math.random() * height * 0.5,
                size: Math.random() * 12 + 28,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
            };
        });
        setClouds(initialClouds);
    }, [width, height]);

    // Gió thổi mây
    useEffect(() => {
        const interval = setInterval(() => {
            setClouds((prev) =>
                prev.map((cloud) => {
                    let newX = cloud.x + cloud.vx;
                    let newY = cloud.y + cloud.vy;

                    // Nếu ra khỏi vùng bầu trời → quay lại
                    if (newX > width + 100) newX = -100;
                    if (newX < -100) newX = width + 100;
                    if (newY > height * 0.5 + 50) newY = -50;
                    if (newY < -50) newY = height * 0.5 + 50;

                    return { ...cloud, x: newX, y: newY };
                })
            );
        }, 40); // ~25fps

        return () => clearInterval(interval);
    }, [width, height]);

    return (
        <Layer>
            <Rect width={width} height={height} fill="skyblue" />
            {clouds.map((cloud) => (
                <Text
                    key={cloud.id}
                    text="☁️"
                    x={cloud.x}
                    y={cloud.y}
                    fontSize={cloud.size}
                    shadowColor="white"
                    shadowBlur={4}
                    opacity={0.9}
                />
            ))}
        </Layer>
    );
}

