/**
 * Plants.tsx
 *
 * Renders all planted crops in the Meo Meo Farm game using react-konva.
 *
 * Features:
 * - Displays emoji-based plant visuals at their `(x, y)` coordinates
 * - Shows a progress bar indicating growth progress
 * - Updates UI every second using a `tick` state and `setInterval`
 * - Displays countdown (in seconds) while growing, and yield amount when ready
 * - Allows harvesting plants by clicking on them when their status is `ready`
 *
 * Store Integration:
 * - Reads `plants` and `harvestPlant` from Zustand store (`useFarmStore`)
 *
 * Notes:
 * - Dead plants are excluded from rendering progress or status overlays
 * - Bar color: blue when growing, green when ready
 */

"use client";

import { useEffect, useState } from "react";
import { Group, Rect, Text } from "react-konva";
import { useFarmStore } from "@/stores/useFarmStore";
import { PlantStatus } from "@/types";

export default function Plants() {
    const plants = useFarmStore((s) => s.plants);
    const harvestPlant = useFarmStore((s) => s.harvestPlant);

    // State dùng để ép re-render mỗi giây
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTick((t) => t + 1); // ép render
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {plants.map((p) => {
                const remaining =
                    p.status === "growing"
                        ? Math.max(0, p.duration - (Date.now() - p.plantedAt))
                        : 0;

                const percent =
                    p.status === "growing"
                        ? 1 - remaining / p.duration
                        : p.status === "ready" as PlantStatus
                            ? 1
                            : 0;

                const barWidth = 48;
                const barHeight = 6;

                return (
                    <Group key={p.id}>
                        {/* Emoji cây */}
                        <Text
                            text={p.emoji}
                            x={p.x}
                            y={p.y}
                            fontSize={40}
                        />
                        {/* Thanh tiến trình */}
                        {p.status !== "dead" && (
                            <Group x={p.x} y={p.y + 44}>
                                <Rect
                                    width={barWidth}
                                    height={barHeight}
                                    fill="#333"
                                    cornerRadius={2}
                                />
                                <Rect
                                    width={barWidth * percent}
                                    height={barHeight}
                                    fill={p.status === "ready" as PlantStatus ? "#4caf50" : "#2196f3"}
                                    cornerRadius={2}
                                />
                            </Group>
                        )}

                        {/* Nhãn hiển thị số / giây còn lại */}
                        {p.status === "ready" as PlantStatus && (
                            <Text
                                text={`+${p.yield}`}
                                x={p.x + 50}
                                y={p.y + 10}
                                fontSize={14}
                                fill="#4caf50"
                            />
                        )}

                        {p.status === "growing" && (
                            <Text
                                text={`${Math.ceil(remaining / 1000)}s`}
                                x={p.x + 50}
                                y={p.y + 10}
                                fontSize={14}
                                fill="#fff"
                            />
                        )}
                    </Group>
                );
            })}
        </>
    );
}

