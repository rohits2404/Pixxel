"use client";

import {
    Crop,
    Expand,
    Sliders,
    Palette,
    Maximize2,
    Text,
    Eye,
} from "lucide-react";
import { AdjustControls } from "./tools/adjust";
import { BackgroundControls } from "./tools/background-controls";
import { useCanvas } from "@/context/context";
import { TextControls } from "./tools/text";
import { AIExtenderControls } from "./tools/ai-extend";
import { ResizeControls } from "./tools/resize";
import { AIEdit } from "./tools/ai-edit";
import { CropContent } from "./tools/crop";

const TOOL_CONFIGS = {
    resize: {
        title: "Resize",
        icon: Expand,
        description: "Change Project Dimensions",
    },
    crop: {
        title: "Crop",
        icon: Crop,
        description: "Crop And Trim Your Image",
    },
    adjust: {
        title: "Adjust",
        icon: Sliders,
        description: "Brightness, Contrast, And More (Manual Saving Required)",
    },
    background: {
        title: "Background",
        icon: Palette,
        description: "Remove or Change Background",
    },
    ai_extender: {
        title: "AI Image Extender",
        icon: Maximize2,
        description: "Extend Image Boundaries With AI",
    },
    text: {
        title: "Add Text",
        icon: Text,
        description: "Customize In Various Fonts",
    },
    ai_edit: {
        title: "AI Editing",
        icon: Eye,
        description: "Enhance Image Quality With AI",
    },
};

export function EditorSidebar({ project }) {
    const { activeTool } = useCanvas();

    const toolConfig = TOOL_CONFIGS[activeTool];

    if (!toolConfig) {
        return null;
    }

    const Icon = toolConfig.icon;

    return (
        <div className="min-w-96 border-r flex flex-col">
            <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-white" />
                    <h2 className="text-lg font-semibold text-white">
                        {toolConfig.title}
                    </h2>
                </div>
                <p className="text-sm text-white mt-1">
                    {toolConfig.description}
                </p>
            </div>

            <div className="flex-1 p-4 overflow-y-scroll">
                {renderToolContent(activeTool, project)}
            </div>
        </div>
    );
}

function renderToolContent(activeTool, project) {
    switch (activeTool) {
        case "crop":
            return <CropContent />;
        case "resize":
            return <ResizeControls project={project} />;
        case "adjust":
            return <AdjustControls />;
        case "background":
            return <BackgroundControls project={project} />;
        case "ai_extender":
            return <AIExtenderControls project={project} />;
        case "text":
            return <TextControls />;
        case "ai_edit":
            return <AIEdit project={project} />;
        default:
            return (
                <div className="text-white">Select a Tool To Get Started</div>
            );
    }
}
