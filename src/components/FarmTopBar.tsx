/**
 * FarmTopBar.tsx
 *
 * Displays the top-right status bar in the Meo Meo Farm game.
 *
 * 🧩 Features:
 * - Shows current coin count and number of harvested crops
 * - Fixed positioning in the top-right corner
 * - Styled with Tailwind CSS for a dark semi-transparent background
 * - Uses Zustand (`useFarmStore`) for reactive state values
 */

"use client";

import { useFarmStore } from "@/stores/useFarmStore";

export default function FarmTopBar() {
    const coins = useFarmStore((s) => s.coins);
    const harvested = useFarmStore((s) => s.harvested);

    return (
        <div className="absolute top-2 right-2 text-white bg-black/70 px-3 py-1 rounded text-sm z-10">
            🏠 Home | 💰 Coins: {coins} | 🌾 Harvested: {harvested}
        </div>
    );
}

