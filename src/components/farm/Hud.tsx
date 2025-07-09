/**
 * Hud.tsx
 *
 * Displays the in-game heads-up display (HUD) for the Meo Meo Farm game.
 *
 * Features:
 * - Shows the player's current coin count from the farm store
 * - Styled with a semi-transparent background and positioned at the top-left corner
 * - Includes emoji labels for better visual appeal ("🏠 Nhà", "💰 Coins")
 *
 * Notes:
 * - Uses Zustand store (`useFarmStore`) to access reactive game state
 * - Positioned absolutely with high `z-index` to ensure it overlays the canvas
 */

"use client";

import { useFarmStore } from "@/stores/useFarmStore";

export default function Hud() {
    const coins = useFarmStore((s) => s.coins);
    return (
        <div className="absolute top-2 left-2 text-white bg-black/70 px-3 py-1 rounded text-sm z-10">
            🏠 Nhà | 💰 Coins: {coins}
        </div>
    );
}

