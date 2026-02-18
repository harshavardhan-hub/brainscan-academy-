"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProcessTimeline() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Adjusted scroll range to minimize empty space after the last card.
    // -40% based on user feedback.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

    const steps = [
        {
            id: "01",
            title: "Registration",
            body: "Book a free consultation. Tell us your child's age, current learning environment, and your goals.",
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                </svg>
            )
        },
        {
            id: "02",
            title: "Assessment Day",
            body: "Your child's DMIT test is conducted. Painless, non-invasive, takes 30 minutes. Results analyzed by our certified experts.",
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.22-7.52-3.22 1.5-6.56 12 10.5-12 10.5-1.49-8z" />
                    {/* Placeholder path for fingerprint-ish look */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                </svg>
            )
        },
        {
            id: "03",
            title: "Intelligence Report",
            body: "You receive a detailed 20-page intelligence profile — dominant intelligences, learning style, hemispheric balance, and career path insights.",
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        },
        {
            id: "04",
            title: "Program Design",
            body: "Our team designs a fully personalized training roadmap for your child based on their unique brain profile.",
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
            )
        },
        {
            id: "05",
            title: "Transformation",
            body: "Your child completes their training program. Measurable improvements in focus, memory, confidence, and academic performance within weeks.",
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        }
    ];

    return (
        <section id="process" ref={targetRef} className="relative h-auto md:h-[300vh] bg-background">
            <div className="relative md:sticky md:top-0 flex flex-col md:flex-row h-auto md:h-screen md:items-center overflow-hidden">

                {/* Mobile Heading Wrapper */}
                <div className="md:hidden pt-20 pb-10 px-6">
                    <span className="text-primary text-[13px] font-medium uppercase tracking-[0.15em] mb-4 block">
                        The Journey
                    </span>
                    <h2 className="text-4xl font-bold text-white mb-6">
                        How it works.
                    </h2>
                    <p className="text-white/70 text-lg leading-relaxed">
                        From the moment you register to the day your child transforms — here is what the process looks like.
                    </p>
                </div>

                <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row h-full md:items-center">

                    {/* Left Static Panel (Desktop Only) */}
                    <div className="hidden md:flex w-full md:w-[30vw] flex-col justify-center h-full pr-12 relative z-10">
                        <span className="text-primary text-[13px] font-medium uppercase tracking-[0.15em] mb-4">
                            The Journey
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            How it works.
                        </h2>
                        <p className="text-white/70 text-lg leading-relaxed">
                            From the moment you register to the day your child transforms — here is what the process looks like.
                        </p>
                    </div>

                    {/* Right Horizontal Scroll Track */}
                    <div className="relative w-full md:w-[70vw] h-full flex items-center">
                        <motion.div style={{ x }} className="hidden md:flex gap-12 items-center pl-12 pr-12">
                            {steps.map((step, i) => (
                                <div key={step.id} className="relative flex items-center min-w-[320px] h-[400px]">
                                    <div className="flex flex-col gap-6 p-8 border border-white/5 bg-white/[0.02] rounded-2xl w-full h-full">
                                        <div className="flex justify-between items-start">
                                            <span className="text-7xl font-extralight text-primary/80">{step.id}</span>
                                            <div className="p-3 rounded-full bg-white/5 border border-white/10">
                                                {step.icon}
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mt-auto">{step.title}</h3>
                                        <p className="text-white/60 leading-relaxed text-sm">
                                            {step.body}
                                        </p>
                                    </div>

                                    {/* Connector Line */}
                                    {i < steps.length - 1 && (
                                        <div className="absolute right-[-48px] top-1/2 w-12 h-[1px] bg-primary/30 flex items-center">
                                            <div className="absolute right-0 w-2 h-2 bg-primary rounded-full" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </motion.div>

                        {/* Mobile Vertical Stack */}
                        <div className="md:hidden flex flex-col gap-8 w-full pb-20">
                            {steps.map((step, i) => (
                                <div key={step.id} className="relative pl-6 border-l border-white/10 ml-2">
                                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-primary" />
                                    <span className="text-3xl font-light text-primary mb-2 block">{step.id}</span>
                                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-white/70 text-sm">{step.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
