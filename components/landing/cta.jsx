"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export const CTASection = () => {
    return (
        <section className="py-20 text-center">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-5xl font-bold mb-6">
                    Ready To{" "}
                    <span className="bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Create Something Amazing?
                    </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                    Join Thousands Of Creators Who Are Already Using AI To
                    Transform Their Images And Bring Their Vision To Life.
                </p>
                <Link href="/dashboard">
                    <Button variant="primary" size="xl">
                        🌟 Start Creating Now
                    </Button>
                </Link>
            </div>
        </section>
    );
};
