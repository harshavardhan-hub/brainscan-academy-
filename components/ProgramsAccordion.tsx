"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "../lib/utils";
import Image from "next/image";

const programs = [
    {
        id: "01",
        title: "DMIT Test",
        subtitle: "Dermatoglyphics Multiple Intelligence Test",
        body: "Map the 8 types of intelligence encoded in your child's fingerprints. A one-time, non-invasive test that reveals learning style, dominant brain hemisphere, and career aptitude.",
        stats: "8 Intelligence Types · 30-Min Assessment · Age 3+",
        image: "/images/fingerprint.png", // Reusing fingerprint for DMIT as per prompt (card 1)
    },
    {
        id: "02",
        title: "Mid Brain Activation",
        subtitle: "Unlocking the bridge between hemispheres",
        body: "Activate the mesencephalon — the region governing intuition, memory, and sensory integration. Children develop heightened focus and extraordinary learning abilities.",
        stats: "Ages 5–15 · 4-Week Program · Globally Proven",
        image: "/images/brain-split.png",
    },
    {
        id: "03",
        title: "Advanced Mind Training",
        subtitle: "The complete cognitive performance system",
        body: "A structured program combining memory enhancement, focus conditioning, emotional intelligence, and accelerated learning techniques. Built for children ready to reach their absolute peak.",
        stats: "Ages 8–18 · 12-Week Program · Personalized Path",
        image: "/images/mandala-silhouette.png",
    },
];

export default function ProgramsAccordion() {
    const [activeId, setActiveId] = useState<string>("01");

    return (
        <section id="programs" className="w-full py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="mb-16">
                    <span className="text-primary text-[13px] font-medium uppercase tracking-[0.15em] block mb-4">
                        Our Programs
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white max-w-2xl">
                        Designed for every stage of development.
                    </h2>
                </div>

                {/* Desktop Accordion */}
                <div className="hidden md:flex h-[600px] gap-4">
                    {programs.map((program) => (
                        <motion.div
                            key={program.id}
                            onClick={() => setActiveId(program.id)}
                            className={cn(
                                "relative h-full rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-spring",
                                activeId === program.id ? "flex-[3]" : "flex-[1]"
                            )}
                            initial={false}
                            animate={{ flex: activeId === program.id ? 3 : 1 }}
                        >
                            {/* Background Image & Overlay */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={program.image}
                                    alt={program.title}
                                    fill
                                    className="object-cover transition-transform duration-700"
                                    style={{
                                        filter: activeId === program.id ? "brightness(0.5) blur(0px)" : "brightness(0.3) blur(2px)",
                                        transform: activeId === program.id ? "scale(1.05)" : "scale(1)",
                                    }}
                                />
                                <div className="absolute inset-0 bg-background/20 mix-blend-multiply" />
                            </div>

                            {/* Vertical Text (Inactive State) */}
                            <div
                                className={cn(
                                    "absolute inset-0 z-10 flex flex-col items-center justify-center transition-opacity duration-300",
                                    activeId === program.id ? "opacity-0 pointer-events-none" : "opacity-100"
                                )}
                            >
                                <div className="rotate-[-90deg] whitespace-nowrap">
                                    <h3 className="text-2xl font-bold text-white tracking-wider">{program.title}</h3>
                                </div>
                                <span className="absolute top-8 text-4xl font-light text-primary/50">{program.id}</span>
                            </div>

                            {/* Expanded Content */}
                            <div
                                className={cn(
                                    "absolute inset-0 z-20 p-10 flex flex-col justify-between transition-opacity duration-500 delay-200",
                                    activeId === program.id ? "opacity-100" : "opacity-0 pointer-events-none"
                                )}
                            >
                                <span className="text-6xl font-light text-primary">{program.id}</span>

                                <div className="max-w-xl">
                                    <h3 className="text-3xl font-bold text-white mb-2">{program.title}</h3>
                                    <h4 className="text-lg text-primary mb-6 italic">{program.subtitle}</h4>
                                    <p className="text-white/80 leading-relaxed mb-8">
                                        {program.body}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-muted mb-8 font-medium tracking-wide">
                                        {program.stats}
                                    </div>
                                    <Button variant="ghost" className="rounded-full px-8 border-white/20 text-white hover:bg-white/10 hover:text-primary">
                                        Learn More →
                                    </Button>
                                </div>
                            </div>

                            {/* Animated Border */}
                            <motion.div
                                className="absolute inset-0 border border-primary/50 rounded-3xl pointer-events-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeId === program.id ? 1 : 0 }}
                                transition={{ duration: 0.5 }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Stack */}
                <div className="flex md:hidden flex-col gap-8">
                    {programs.map((program) => (
                        <div key={program.id} className="relative h-[500px] w-full rounded-2xl overflow-hidden group">
                            <Image
                                src={program.image}
                                alt={program.title}
                                fill
                                className="object-cover brightness-[0.4]"
                            />
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <span className="text-4xl font-light text-primary mb-4">{program.id}</span>
                                <h3 className="text-2xl font-bold text-white mb-1">{program.title}</h3>
                                <h4 className="text-sm text-primary mb-4">{program.subtitle}</h4>
                                <p className="text-white/80 text-sm mb-6 line-clamp-3">{program.body}</p>
                                <Button variant="ghost" className="self-start rounded-full border-white/20 text-white">
                                    Learn More →
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
