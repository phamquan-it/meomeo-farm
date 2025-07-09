/**
 * FarmToolBar.tsx
 *
 * A fixed toolbar component used in the Meo Meo Farm game for selecting different tools.
 *
 * 🧩 Features:
 * - Renders a toolbar at the bottom-left corner of the screen
 * - Each tool is represented by an emoji and a label:
 *   - 🤲 Hand: No tool selected
 *   - 🪓 Sickle: Used for harvesting
 *   - 💧 Water: Used to water dry soil
 *   - 🪱 Fertilizer: Used to fertilize soil
 *   - 🌿 Weeds: Used to remove weeds
 * - Highlights the currently selected tool with a green background
 * - Updates the global tool state via Zustand (`useFarmStore`)
 *
 * 💄 Styling:
 * - Positioned absolutely with high z-index to overlay on top of the canvas
 * - Styled using Tailwind CSS with semi-transparent background
 */


// app/farm/FarmToolBar.tsx
"use client";

import { useFarmStore } from "@/stores/useFarmStore";

export default function FarmToolBar() {
    const tool = useFarmStore((s) => s.tool);
    const setTool = useFarmStore((s) => s.setTool);

    const tools = [
        { id: "none", icon: "🤲", label: "Hand" },
        { id: "sickle", icon: "🪓", label: "Sickle" },
        { id: "water", icon: "💧", label: "Water" },
        { id: "fertilizer", icon: "🪱", label: "Fertilizer" },
        { id: "weed-remover", icon: "🌿", label: "Weeds" },
    ];


    return (
        <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-2 rounded z-20 text-white flex gap-2">
            {tools.map((t) => (
                <button
                    key={t.id}
                    onClick={() => setTool(t.id)}
                    className={`px-2 py-1 rounded transition ${tool === t.id ? "bg-green-500" : "hover:bg-white/10"
                        }`}
                >
                    {t.icon} {t.label}
                </button>
            ))}
        </div>
    );
}

