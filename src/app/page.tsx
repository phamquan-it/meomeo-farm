/**
 * Home.tsx
 *
 * This is the main entry point for the Meo Meo Farm game.
 * It dynamically imports the `MeoFarmCanvas` component and disables server-side rendering (SSR)
 * because `react-konva` depends on browser-specific APIs (like `window` and `canvas`).
 *
 * Features:
 * - `dynamic()` is used with `ssr: false` to ensure the canvas renders only on the client side
 * - Displays a fallback loading message while the canvas is being loaded
 */
"use client";
import DisableRightClick from "@/DisableRightClick";
import FunConsoleDonate from "@/components/FunConsoleDonate";
import dynamic from "next/dynamic";
const MeoFarmCanvas = dynamic(() => import("@/components/MeoFarmCanvas.client"), { ssr: false });

export default function Home() {
    return <>
        <DisableRightClick/>
        <FunConsoleDonate/>
        <MeoFarmCanvas />
    </>;
}

