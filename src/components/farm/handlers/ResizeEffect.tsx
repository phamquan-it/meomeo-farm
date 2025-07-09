// components/farm/effects/ResizeEffect.tsx
"use client";

import { useEffect } from "react";

export default function ResizeEffect({
    setSize,
}: {
    setSize: (s: { width: number; height: number }) => void;
}) {
    useEffect(() => {
        const updateSize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        };
        updateSize();

        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, [setSize]);

    return null;
}

