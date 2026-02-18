"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function FinalCTA() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const particles: { x: number; y: number; speed: number; opacity: number; size: number }[] = [];
        const PARTICLE_COUNT = 80;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                speed: 0.2 + Math.random() * 0.5,
                opacity: Math.random() * 0.5,
                size: Math.random() * 2
            });
        }

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.y -= p.speed;
                if (p.y < 0) {
                    p.y = height;
                    p.x = Math.random() * width;
                }

                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <section id="contact" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background with Blur */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center brightness-[0.3] blur-[100px]"
                style={{ backgroundImage: "url('/images/brain-active.png')" }}
            />

            {/* Canvas Layer */}
            <canvas ref={canvasRef} className="absolute inset-0 z-10" />

            {/* Content */}
            <div className="relative z-20 container mx-auto px-6 text-center max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-primary text-[13px] font-medium uppercase tracking-[0.2em] mb-6 block">
                        Begin the Journey
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
                        Your child's potential <br />
                        <span className="text-primary/90">is waiting to be mapped.</span>
                    </h2>
                    <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
                        Book a free consultation with a BrainScan Academy specialist. No commitment. No pressure. Just clarity.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="rounded-full px-12 py-8 text-lg font-bold shadow-lg shadow-primary/20">
                            Book Free Consultation
                        </Button>
                        <Button variant="ghost" size="lg" className="rounded-full px-12 py-8 text-lg border-white/20 text-white hover:bg-white/10">
                            Download Program Guide
                        </Button>
                    </div>

                    <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center text-sm text-muted">
                        <span>✓ Free consultation</span>
                        <span>✓ No credit card</span>
                        <span>✓ Results within 7 days</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
