"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Playfair_Display, Inter } from "next/font/google";
import { ArrowRight } from "lucide-react";

// Load Premium Fonts
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "600"] });

const NeuralHero = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

    return (
        <section
            ref={containerRef}
            className={`relative w-full h-[100vh] overflow-hidden text-white ${inter.className}`}
        >
            {/* Background Image Layer: Z-0 */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/brain-active.png"
                    alt="Active Brain Neural Network"
                    fill
                    className="object-cover opacity-60 scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#07080f]/90 via-[#07080f]/50 to-[#07080f]" />
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#07080f]/80" />
            </div>

            {/* Content Layer: Z-10 */}
            <motion.div
                style={{ opacity, y }}
                className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 md:px-12 pointer-events-none"
            >
                <div className="max-w-5xl w-full text-center space-y-12 mt-[-5vh]">

                    {/* Main Headline - Ultra Premium Typography */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center justify-center"
                    >
                        <span className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.2em] uppercase text-white/90 mb-4">
                            Every Child Is Born
                        </span>
                        <span className={`text-5xl md:text-7xl lg:text-8xl ${playfair.className} text-[#c8a96e] drop-shadow-[0_0_30px_rgba(200,169,110,0.3)]`}>
                            A Genius.
                        </span>
                    </motion.h1>

                    {/* Subtext - Refined & Minimal */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0, delay: 0.5, ease: "easeOut" }}
                        className="text-lg md:text-xl text-white/60 mx-auto max-w-2xl leading-relaxed font-light tracking-wide"
                    >
                        Unlock the hidden potential within their mind using advanced dermatoglyphics and neuroscience.
                    </motion.p>

                    {/* Buttons - Premium Glassmorphism */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6 pointer-events-auto"
                    >
                        {/* Primary Gold Button - Glow Effect */}
                        <button className="group relative px-12 py-4 bg-gradient-to-r from-[#c8a96e] to-[#e0c38c] text-[#07080f] text-sm font-bold tracking-widest uppercase rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(200,169,110,0.5)]">
                            <span className="relative z-10 flex items-center gap-2">
                                Start Their Journey <ArrowRight size={16} />
                            </span>
                            <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                        </button>

                        {/* Secondary Ghost Button - High Glass */}
                        <button className="group px-10 py-4 bg-white/5 border border-white/10 text-white/80 text-sm font-medium tracking-widest uppercase rounded-full backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 hover:text-white">
                            Learn More
                        </button>
                    </motion.div>

                </div>
            </motion.div>

            {/* Scroll Indicator - Minimal */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1.5 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none"
            >
                <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase">Scroll</span>
            </motion.div>

        </section>
    );
};

export default NeuralHero;
