/**
 * types.ts
 *
 * Shared type definitions for the Meo Meo Farm game.
 * These interfaces and types are used throughout the game logic and UI components.
 *
 * Types & Interfaces:
 *
 * - `PlantStatus`: Defines the possible growth states of a plant:
 *   - "growing" → still in progress
 *   - "ripe" → ready to harvest (note: this is named "ready" in some components)
 *   - "dead" → no longer harvestable
 *
 * - `SoilTile`: Represents a tile of soil in the farm grid
 *   - `id`: Unique identifier
 *   - `x`, `y`: Top-left position of the tile
 *   - `centerX`, `centerY`: Center coordinates, used for alignment and placement
 *   - `status`: Optional status flags for gameplay effects (e.g., dry, weedy, no fertilizer)
 *
 * - `Plant`: Represents a single planted crop
 *   - `id`: Unique identifier
 *   - `emoji`: The emoji used to represent the crop visually
 *   - `x`, `y`: Plant location (usually aligned with a soil tile)
 *   - `plantedAt`: Timestamp when planted
 *   - `duration`: Required growth time in ms
 *   - `status`: Current growth state
 *   - Additional gameplay attributes: `yield`, `isDry`, `hasWeeds`, `hasBugs`
 *
 * - `GameObject`: Generic structure for visual or interactive entities on the farm
 *   - Used for simpler or shared object definitions (e.g., fruit, tools)
 *
 * - `Cat`: Represents the player's controllable cat character
 *   - `x`, `y`: Position on the canvas
 *
 * Notes:
 * - `PlantStatus` is sometimes referred to as `"ready"` in the store logic; make sure to unify if needed
 * - These types are intended to be serializable and game-state-friendly
 */

export type PlantStatus = "growing" | "ripe" | "dead";
export interface SoilTile {
    centerY: number;
    centerX: number;
    id: string;
    x: number;
    y: number;
    status?: {
        dry?: boolean;
        noFertilizer?: boolean;
        weedy?: boolean;
        hasPlant?: boolean;
    };
}


export interface Plant {
    id: string;
    emoji?: string;
    x: number;
    y: number;
    plantedAt: number;
    growthTime?: number;
    status: PlantStatus;
    duration: number;
    isDry?: boolean;
    yield?: any;
    hasWeeds?: boolean;
    hasBugs?: boolean;
}

export type GameObject = {
    id: string;
    emoji: string;
    x: number;
    y: number;
    plantedAt?: number; // timestamp lúc trồng
    duration?: number; // thời gian sinh trưởng (ms)
    yield?: number; // sản lượng
};

export type Cat = {
    x: number;
    y: number;
};

