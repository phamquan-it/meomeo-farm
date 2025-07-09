// components/farm/effects/AutoGrowEffect.tsx
"use client";

import { useEffect } from "react";
import { useFarmStore } from "@/stores/useFarmStore";
import { PlantStatus } from "@/types";

export default function AutoGrowEffect() {
    const plants = useFarmStore((s) => s.plants);
    const updatePlant = useFarmStore((s) => s.updatePlant);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            plants.forEach((p) => {
                if (p.status === "growing" && now - p.plantedAt >= p.duration) {
                    updatePlant(p.id, { status: "ready" as PlantStatus });
                }
            });
        }, 500);
        return () => clearInterval(interval);
    }, [plants, updatePlant]);

    return null;
}

