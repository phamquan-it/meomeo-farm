/**
 * MeoFarmCanvas.tsx
 *
 * The main game canvas for "Meo Meo Farm", built with React and react-konva.
 * This component renders an interactive 2D farm scene where players control a cat character
 * to move around, plant emoji crops, water soil, fertilize, remove weeds, and harvest.
 *
 * 🧩 Features:
 * - Fullscreen responsive canvas with sky, grass, and ground layers
 * - Cat movement via arrow keys or WASD
 * - Planting emoji-based crops on clickable soil tiles
 * - Random soil status effects on planting (dry, weedy, no fertilizer)
 * - Auto-update for plant growth over time
 * - Harvest-ready detection and auto-harvest when holding the sickle tool
 * - Tool interactions based on proximity (water, fertilizer, weed remover)
 *
 * 🏗️ Components Used:
 * - `Sky`, `Grass`, `Pond`, and ground layer for background environment
 * - `Soil`, `Plants`, and `Cat` to render game objects
 * - UI controls: `FarmTopBar`, `FarmToolBar`, `EmojiGridMenu`
 *
 * 💾 State Management:
 * - Zustand (`useFarmStore`) handles state: plants, tools, cat position, soil tiles, etc.
 *
 * ⚙️ Effects & Logic:
 * - `ResizeEffect`: Resizes canvas on window change
 * - `AutoGrowEffect`: Grows plants automatically over time
 * - `AutoHarvestEffect`: Automatically harvests ready plants near the cat
 * - `ToolEffectHandler`: Uses active tool (e.g. watering) near cat
 * - `KeyEffectHandler`: Handles arrow/WASD cat movement
 * - `InteractiveStage`: Handles click-to-plant interaction
 */

"use client";

import { Stage, Layer, Rect } from "react-konva";
import { useEffect, useRef, useState } from "react";
import { useFarmStore } from "@/stores/useFarmStore";
import EmojiGridMenu from "./EmojiGridMenu";
import FarmTopBar from "./FarmTopBar";
import FarmToolBar from "./FarmToolBar";
import Plants from "./farm/Plants";
import Sky from "./farm/Sky";
import Grass from "./farm/Grass";
import Pond from "./Pond";
import Soil from "./farm/Soil";
import { PlantStatus, SoilTile } from "@/types";
import { generateSoilTiles } from "@/utils/generateSoilTiles";
import ToolEffectHandler from "./farm/ToolEffectHandler";
import KeyEffectHandler from "./farm/KeyEffectHandler";
import ResizeEffect from "./farm/handlers/ResizeEffect";
import AutoGrowEffect from "./farm/handlers/AutoGrowEffect";
import AutoHarvestEffect from "./farm/handlers/AutoHarvestEffect";
import InteractiveStage from "./InteractiveStage";
import Cat from "./farm/Cat.client";

export default function MeoFarmCanvas() {
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    const cat = useFarmStore((s) => s.cat);
    const moveCat = useFarmStore((s) => s.moveCat);
    const selectedEmoji = useFarmStore((s) => s.selectedEmoji);
    const setSelectedEmoji = useFarmStore((s) => s.setEmoji);
    const plants = useFarmStore((s) => s.plants);
    const plantSelectedEmojiAt = useFarmStore((s) => s.plantSelectedEmojiAt);
    const updatePlant = useFarmStore((s) => s.updatePlant);
    const harvestPlant = useFarmStore((s) => s.harvestPlant);
    const tool = useFarmStore((s) => s.tool);
    const setTileStatus = useFarmStore((s) => s.setTileStatus);

    const catRef = useRef(cat);
    catRef.current = cat;

    const skyHeight = size.height * 0.5;
    const grassHeight = size.height * 0.3;
    const groundHeight = size.height * 0.2;

    const [offsetY, setOffsetY] = useState(size.height - skyHeight + grassHeight / 9)
    const soilArea = {
        rows: 2,
        cols: 4,
        tileSize: 50,
        padding: 8,
        offsetX: 40,
        offsetY
    };

    const soilTiles = useFarmStore((s) => s.soilTiles);
    const setSoilTiles = useFarmStore((s) => s.setSoilTiles);
    useEffect(() => {
        const updateSize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        };
        updateSize();

        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, [setSize]);


    useEffect(() => {
        moveCat(100, window.innerHeight - skyHeight)
        setOffsetY(size.height - skyHeight + grassHeight / 9)
    }, [window.innerWidth, window.innerHeight])
    useEffect(() => {
        setSoilTiles(
            generateSoilTiles(
                soilArea.rows,
                soilArea.cols,
                soilArea.tileSize,
                soilArea.padding,
                soilArea.offsetX,
                soilArea.offsetY
            )
        );
    }, [offsetY]);

    return (
        <div className="relative w-full h-screen">
            <ResizeEffect setSize={setSize} />
            <AutoGrowEffect />
            <AutoHarvestEffect />
            <EmojiGridMenu
                emojis={["🌳", "🪴", "🌾", "🌽", "🍓", "🍇", "🍄", "🌻", "🥕"]}
                selectedEmoji={selectedEmoji}
                onSelect={setSelectedEmoji}
            />
            <FarmTopBar />
            <FarmToolBar />
            <ToolEffectHandler />
            <KeyEffectHandler
                skyHeight={skyHeight}
                grassHeight={grassHeight}
                canvasWidth={size.width}
            />
            <InteractiveStage
                width={size.width}
                height={size.height}
                soilTiles={soilTiles}
                soilArea={soilArea}
            >
                <Grass y={skyHeight} width={size.width} height={grassHeight} ></Grass>
                <Sky width={size.width} height={skyHeight} />
                <Soil soilTiles={soilTiles} tileSize={soilArea.tileSize} />
                <Layer>
                    <Rect
                        y={skyHeight + grassHeight}
                        width={size.width}
                        height={groundHeight}
                        fill="#8B4513"
                    />
                </Layer>

                <Pond stageWidth={size.width} y={skyHeight} />

                <Layer>
                    <Cat />
                    <Plants />
                </Layer>
            </InteractiveStage>
        </div>
    );
}
