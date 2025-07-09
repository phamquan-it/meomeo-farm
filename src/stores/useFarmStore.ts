/**
 * useFarmStore.ts
 *
 * Zustand store for managing the state of the Meo Meo Farm game.
 *
 * State Includes:
 * - `cat`: Current position of the cat character
 * - `coins`: Player’s coin count
 * - `harvested`: Total number of harvested plants
 * - `plants`: List of all currently planted crops
 * - `soilTiles`: List of soil tiles with position and status (dry, noFertilizer, weedy)
 * - `tool`: Currently selected tool (e.g., sickle, water)
 * - `selectedEmoji`: Emoji used for planting
 *
 * Actions:
 * - `moveCat(x, y)`: Updates cat position
 * - `setEmoji(emoji)`: Sets the currently selected planting emoji
 * - `setTool(tool)`: Sets the current active tool
 * - `addPlant(p)`: Adds a new plant
 * - `updatePlant(id, updates)`: Updates a plant by ID
 * - `harvestPlant(id)`: Removes a plant and increases coin + harvest count
 * - `setSoilTiles(tiles)`: Initializes or replaces soil tile grid
 * - `setTileStatus(id, newStatus)`: Updates tile status (e.g., water/fertilizer/weed)
 * - `updateSoilTile(id, status)`: Same as above (can be merged)
 * - `plantSelectedEmojiAt(x, y)`: Plants the selected emoji at a given position
 *
 * Middleware:
 * - Uses `zustand/devtools` for integration with Redux DevTools
 *
 * Notes:
 * - Designed for use in a small farming simulation game (Meo Meo Farm)
 * - All state logic is centralized for easy debugging and expansion
 */

"use client"
import { Cat, Plant, SoilTile } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface FarmState {
    soilTiles: SoilTile[];
    setSoilTiles: (tiles: SoilTile[]) => void;
    updateSoilTile: (id: string, status: Partial<SoilTile["status"]>) => void;
    setTileStatus: (id: string, newStatus: Partial<SoilTile["status"]>) => void,
    cat: Cat;
    coins: number;
    harvested: number;
    plants: Plant[];
    tool: string;
    setTool: (tool: string) => void;
    selectedEmoji: string;

    moveCat: (x: number, y: number) => void;
    setEmoji: (emoji: string) => void;

    addPlant: (p: Plant) => void;
    updatePlant: (id: string, updates: Partial<Plant>) => void;
    harvestPlant: (id: string) => void;
    plantSelectedEmojiAt: (x: number, y: number) => void;
}

export const useFarmStore = create<FarmState>()(
    devtools((set) => ({
        cat: { x: 100, y: 300 },
        coins: 0,
        harvested: 0,
        plants: [],
        selectedEmoji: "🌳",
        tool: "none",
        setTool: (tool) => set({ tool }),
        moveCat: (x, y) => set({ cat: { x, y } }),
        setEmoji: (emoji) => set({ selectedEmoji: emoji }),

        addPlant: (p) =>
            set((state) => ({
                plants: [...state.plants, p],
            })),

        updatePlant: (id, updates) =>
            set((state) => ({
                plants: state.plants.map((p) =>
                    p.id === id ? { ...p, ...updates } : p
                ),
            })),

        harvestPlant: (id) =>
            set((state) => {
                const coinGain = 10;
                return {
                    coins: state.coins + coinGain,
                    harvested: state.harvested + 1,
                    plants: state.plants.filter((p) => p.id !== id), // ⬅ Xóa luôn cây
                };
            }),

        soilTiles: [],
        setSoilTiles: (tiles) => set({ soilTiles: tiles }),
        setTileStatus: (id, newStatus) =>
            set((state) => {
                return {
                    soilTiles: state.soilTiles.map((tile) =>
                        tile.id === id
                            ? {
                                ...tile,
                                status: {
                                    ...tile.status,
                                    ...newStatus,
                                },
                            }
                            : tile
                    ),
                };
            }),

        updateSoilTile: (id, status) =>
            set((state) => ({
                soilTiles: state.soilTiles.map((tile) =>
                    tile.id === id ? { ...tile, status: { ...tile.status, ...status } } : tile
                ),
            })),
        plantSelectedEmojiAt: (x: number, y: number) =>
            set((state) => {
                const id = `plant-${Date.now()}`;
                const plantedAt = Date.now();
                const duration = 10000; // 10 seconds
                const yieldAmount = 5;

                const newPlant: Plant = {

                    id,
                    emoji: state.selectedEmoji,
                    x,
                    y,
                    plantedAt,
                    duration,
                    yield: yieldAmount,
                    status: "growing",
                };

                return {
                    plants: [...state.plants, newPlant],
                };
            }),
    }))
);

