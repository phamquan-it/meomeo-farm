// components/farm/effects/AutoHarvestEffect.tsx
"use client";

import { useEffect } from "react";
import { useFarmStore } from "@/stores/useFarmStore";
import { PlantStatus } from "@/types";

export default function AutoHarvestEffect() {
    const plants = useFarmStore((s) => s.plants);
    const harvestPlant = useFarmStore((s) => s.harvestPlant);
    const cat = useFarmStore((s) => s.cat);
    const tool = useFarmStore((s) => s.tool);

    useEffect(() => {
        plants.forEach((p) => {
            if (p.status === "ready" as PlantStatus && tool === "sickle") {
                const distance = Math.hypot(p.x - cat.x, p.y - cat.y);
                if (distance < 20) {
                    harvestPlant(p.id);
                }
            }
        });
    }, [plants, cat, tool, harvestPlant]);

    return null;
}

