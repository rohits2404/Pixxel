import { CTASection } from "@/components/landing/cta";
import { FeaturesSection } from "@/components/landing/features";
import { HeroSection } from "@/components/landing/hero-section";
import { InteractiveStats } from "@/components/landing/interactive-stats";
import { PricingSection } from "@/components/landing/pricing";
import React from "react";

const Home = () => {
    return (
        <div className="pt-36">
            <HeroSection />
            <InteractiveStats />
            <FeaturesSection />
            <PricingSection />
            <CTASection />
        </div>
    );
};

export default Home;
