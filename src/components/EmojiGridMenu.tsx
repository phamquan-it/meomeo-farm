/**
 * EmojiGridMenu.tsx
 *
 * Renders a grid of selectable emoji buttons for planting in Meo Meo Farm.
 *
 * Props:
 * - `emojis`: Array of emoji strings to display as options
 * - `selectedEmoji`: Currently selected emoji (highlighted)
 * - `onSelect`: Callback triggered when an emoji is clicked
 *
 * Features:
 * - Displayed as a floating UI panel in the top-left corner
 * - Highlights the selected emoji with a blue background
 * - Simple and intuitive interaction using buttons styled with Tailwind CSS
 *
 * Notes:
 * - Styled using a responsive 9-column CSS grid
 * - High `z-index` ensures visibility over the canvas
 */

"use client";
import React from "react";

type Props = {
    emojis: string[];
    selectedEmoji: string;
    onSelect: (e: string) => void;
};

export default function EmojiGridMenu({ emojis, selectedEmoji, onSelect }: Props) {
    return (
        <div className="absolute top-4 left-4 bg-white p-2 rounded grid grid-cols-9 gap-2 z-10">
            {emojis.map((emoji) => (
                <button
                    key={emoji}
                    className={`text-2xl p-1 rounded ${selectedEmoji === emoji ? "bg-blue-200" : "hover:bg-gray-100"
                        }`}
                    onClick={() => onSelect(emoji)}
                >
                    {emoji}
                </button>
            ))}
        </div>
    );
}

