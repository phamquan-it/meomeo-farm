// components/farm/KeyEffectHandler.tsx
"use client";

import { useEffect, useRef } from "react";
import { useFarmStore } from "@/stores/useFarmStore";

/**
 * Handles keyboard movement (Arrow keys / WASD) for the cat.
 */
export default function KeyEffectHandler({
    skyHeight,
    grassHeight,
    canvasWidth,
}: {
    skyHeight: number;
    grassHeight: number;
    canvasWidth: number;
}) {
    const moveCat = useFarmStore((s) => s.moveCat);
    const cat = useFarmStore((s) => s.cat);
    const catRef = useRef(cat);
    catRef.current = cat;

    useEffect(() => {
        const speed = 5;
        const catSize = 48;

        const handleKeyDown = (e: KeyboardEvent) => {
            let { x, y } = catRef.current;

            const minY = skyHeight;
            const maxY = skyHeight + grassHeight - catSize;
            const minX = 0;
            const maxX = canvasWidth - catSize;

            switch (e.key.toLowerCase()) {
                case "arrowleft":
                case "a":
                    x = Math.max(minX, x - speed);
                    break;
                case "arrowright":
                case "d":
                    x = Math.min(maxX, x + speed);
                    break;
                case "arrowup":
                case "w":
                    y = Math.max(minY, y - speed);
                    break;
                case "arrowdown":
                case "s":
                    y = Math.min(maxY, y + speed);
                    break;
                default:
                    return;
            }

            moveCat(x, y);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [skyHeight, grassHeight, canvasWidth, moveCat]);

    return null;
}

