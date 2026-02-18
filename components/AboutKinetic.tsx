"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";

import { useRef } from "react";
import AboutVisual from "./about/AboutVisual";

export default function AboutKinetic() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} id="about" className="relative min-h-screen flex items-center py-20 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24 items-center">
                {/* Left Column (Text) - 60% approx -> 3 cols */}
                <div className="lg:col-span-3 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-[1px] w-8 bg-primary" />
                        <span className="text-primary text-[13px] font-medium uppercase tracking-[0.15em]">
                            The Science of Intelligence
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-8">
                        We don't guess <br />
                        <span className="relative inline-block text-white">
                            your child's potential.
                            <motion.svg
                                className="absolute -bottom-2 left-0 w-full h-3 text-primary"
                                viewBox="0 0 100 10"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                            >
                                <motion.path
                                    d="M0 5 Q 50 10 100 5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                            </motion.svg>
                        </span>
                    </h2>

                    <p className="text-[17px] text-muted leading-[1.75] mb-10 max-w-2xl">
                        BrainScan Academy uses validated neuroscience — Dermatoglyphics, Mid Brain research, and advanced
                        cognitive training — to map your child's unique intelligence profile and activate their full potential.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Badge variant="default" className="bg-white/5 border-white/10 px-4 py-2 text-white hover:bg-white/10">
                            🧬 Science-backed
                        </Badge>
                        <Badge variant="default" className="bg-white/5 border-white/10 px-4 py-2 text-white hover:bg-white/10">
                            🏆 Award Recognized
                        </Badge>
                        <Badge variant="default" className="bg-white/5 border-white/10 px-4 py-2 text-white hover:bg-white/10">
                            🌍 Globally Validated
                        </Badge>
                    </div>
                </div>

                {/* Right Column (Visual) - 40% approx -> 2 cols */}
                <div className="lg:col-span-2 relative flex justify-center lg:justify-end h-[400px] lg:h-[500px]">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5 bg-[#07080f]/50 backdrop-blur-sm">
                        <AboutVisual />
                    </div>
                </div>
            </div>
        </section>
    );
}
