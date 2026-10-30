"use client";

import { useIntersectionObserver } from "@/hooks/use-landing-hooks";
import { useState } from "react";

const FeatureCard = ({ icon, title, description, delay = 0 }) => {
    const [ref, isVisible] = useIntersectionObserver();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            ref={ref}
            className={`backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-700 cursor-pointer ${
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
            } ${isHovered ? "transform scale-105 rotate-1 shadow-2xl" : ""}`}
            style={{ transitionDelay: `${delay}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-gray-300 leading-relaxed">{description}</p>
        </div>
    );
};

export const FeaturesSection = () => {
    const features = [
        {
            icon: "✂️",
            title: "Smart Crop & Resize",
            description:
                "Interactive Cropping With Aspect Ratio Constraints And Intelligent Resizing That Preserves Image Quality Across Any Dimension.",
        },
        {
            icon: "🎨",
            title: "Color & Light Adjustment",
            description:
                "Professional-Grade Brightness, Contrast, Saturation Controls With Real-Time Preview And Auto-Enhance Capabilities.",
        },
        {
            icon: "🤖",
            title: "AI Background Removal",
            description:
                "Remove Or Replace Backgrounds Instantly Using Advanced AI That Detects Complex Edges And Fine Details With Precision.",
        },
        {
            icon: "🔧",
            title: "AI Content Editor",
            description:
                "Edit Images With Natural Language Prompts. Remove Objects, Change Elements, Or Add New Content Using Generative AI.",
        },
        {
            icon: "📏",
            title: "Image Extender",
            description:
                "Expand Your Canvas In Any Direction With AI-Powered Generative Fill That Seamlessly Blends New Content With Existing Images.",
        },
        {
            icon: "⬆️",
            title: "AI Upscaler",
            description:
                "Enhance Image Resolution Up To 4x Using AI Upscaling Technology That Preserves Details And Reduces Artifacts.",
        },
    ];

    return (
        <section className="py-20" id="features">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
                        Powerful AI Features
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Everything You Need To Create, Edit, And Enhance Images
                        With Professional-Grade Tools Powered By Cutting-Edge AI
                        Technology.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            {...feature}
                            delay={index * 100}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
