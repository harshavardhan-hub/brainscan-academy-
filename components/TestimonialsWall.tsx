"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "My daughter used to struggle with reading. After the DMIT report, we finally understood her learning style. Within 3 months she's now reading two grades ahead.",
        author: "Priya R.",
        role: "Mother of 8-year-old",
    },
    {
        quote: "The Mid Brain Activation program is unlike anything I've seen. My son started solving math problems in his head that he couldn't do before. Remarkable.",
        author: "Arjun M.",
        role: "Father of 11-year-old",
    },
    {
        quote: "We were skeptical at first, but the results speak for themselves. The change in her confidence is night and day.",
        author: "Sarah L.",
        role: "Mother of 6-year-old",
    },
    {
        quote: "Professional, scientific, and deeply caring. The team at BrainScan Academy explained everything clearly.",
        author: "David K.",
        role: "Father of 14-year-old",
    },
    {
        quote: "The memory techniques they taught my son helped him ace his finals. He actually enjoys studying now.",
        author: "Meera S.",
        role: "Mother of 12-year-old",
    },
    {
        quote: "Finally, a program that doesn't just treat every child the same. The personalization is what makes this work.",
        author: "Rahul V.",
        role: "Father of 9-year-old",
    },
    {
        quote: "I wish this existed when I was a kid. My daughter knows exactly what she's good at and pursues it with passion.",
        author: "Anita G.",
        role: "Mother of 7-year-old",
    },
    {
        quote: "Incredible insights from the fingerprint analysis. It confirmed things we suspected but didn't know how to address.",
        author: "James T.",
        role: "Father of 5-year-old",
    },
    {
        quote: "Worth every penny. The transformation in focus and discipline has been life-changing for our family.",
        author: "Vikram R.",
        role: "Father of 10-year-old",
    },
];

// Split into 3 columns
const col1 = testimonials.slice(0, 3);
const col2 = testimonials.slice(3, 6);
const col3 = testimonials.slice(6, 9);

const TestimonialCard = ({ item }: { item: typeof testimonials[0] }) => (
    <Card className="mb-6 break-inside-avoid bg-white/[0.03] border-white/[0.07] backdrop-blur-sm p-8">
        <div className="text-secondary/40 text-6xl font-serif leading-none mb-4">"</div>
        <p className="text-white/80 text-lg leading-relaxed mb-6 font-light">
            {item.quote}
        </p>
        <div>
            <h4 className="text-white font-semibold">{item.author}</h4>
            <span className="text-sm text-muted">{item.role}</span>
        </div>
        <div className="flex gap-1 mt-3">
            {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-primary text-sm">★</span>)}
        </div>
    </Card>
);

export default function TestimonialsWall() {
    return (
        <section id="stories" className="relative py-24 bg-background overflow-hidden min-h-screen flex flex-col items-center">
            <div className="container mx-auto px-6 mb-12 text-center z-10">
                <span className="text-primary text-[13px] font-medium uppercase tracking-[0.15em] block mb-4">
                    Parent Stories
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    The proof is in the children.
                </h2>
            </div>

            <div className="relative w-full h-[800px] overflow-hidden mask-linear-fade">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
                    {/* Column 1 - Up */}
                    <div className="flex flex-col animate-marquee-vertical">
                        {[...col1, ...col1, ...col1].map((t, i) => <TestimonialCard key={i} item={t} />)}
                    </div>

                    {/* Column 2 - Down */}
                    <div className="hidden md:flex flex-col animate-marquee-vertical-reverse translation-y-[-50%]">
                        {[...col2, ...col2, ...col2].map((t, i) => <TestimonialCard key={i} item={t} />)}
                    </div>

                    {/* Column 3 - Up */}
                    <div className="hidden lg:flex flex-col animate-marquee-vertical">
                        {[...col3, ...col3, ...col3].map((t, i) => <TestimonialCard key={i} item={t} />)}
                    </div>
                </div>

                {/* Fade Overlays */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-10" />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
            </div>

            <style jsx global>{`
        @keyframes marqueeVertical {
            0% { transform: translateY(0%); }
            100% { transform: translateY(-33.33%); }
        }
        @keyframes marqueeVerticalReverse {
            0% { transform: translateY(-33.33%); }
            100% { transform: translateY(0%); }
        }
        .animate-marquee-vertical {
            animation: marqueeVertical 40s linear infinite;
        }
        .animate-marquee-vertical-reverse {
            animation: marqueeVerticalReverse 45s linear infinite;
        }
      `}</style>
        </section>
    );
}
