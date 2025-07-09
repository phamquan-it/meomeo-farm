import { SoilTile } from "@/types";

/**
 * Generate a 2D grid of soil tiles for the farm.
 * @param rows Number of rows of tiles
 * @param cols Number of columns of tiles
 * @param tileSize Width/height of each tile (square)
 * @param padding Space between tiles
 * @param offsetX Starting X position
 * @param offsetY Starting Y position
 * @returns SoilTile[]
 */
export function generateSoilTiles(
    rows: number,
    cols: number,
    tileSize: number,
    padding: number,
    offsetX: number,
    offsetY: number
): SoilTile[] {
    return Array.from({ length: rows }).flatMap((_, row) =>
        Array.from({ length: cols }).map((_, col) => {
            const x = col * (tileSize + padding) + offsetX;
            const y = row * (tileSize + padding) + offsetY;
            const centerX = x + tileSize / 2;
            const centerY = y + tileSize / 2;
            const id = `tile-${row}-${col}`;
            return {
                id,
                x,
                y,
                centerX,
                centerY,
                status: {
                    dry: Math.random() < 0.2,
                    noFertilizer: Math.random() < 0.2,
                    weedy: Math.random() < 0.2,
                },
            };
        })
    );
}

