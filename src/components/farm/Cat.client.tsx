"use client";
import { Text, Group } from "react-konva";
import { useEffect, useRef } from "react";
import { Tween, Easings } from "konva/lib/Tween";
import { useFarmStore } from "@/stores/useFarmStore";

export default function Cat() {
    const cat = useFarmStore((s) => s.cat);
    const { x, y } = cat;

    const tailRef = useRef<any>(null);

    useEffect(() => {
        if (!tailRef.current) return;

        const tween = new Tween({
            node: tailRef.current,
            rotation: 10,
            duration: 0.4,
            easing: Easings.EaseInOut,
            yoyo: true,
            repeat: Infinity,
        });

        tween.play();

        return () => tween.destroy();
    }, []);

    return (
        <Group x={x} y={y}>
            <Text text="😺" fontSize={48} />
        </Group>
    );
}

