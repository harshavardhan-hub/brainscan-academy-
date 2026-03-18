"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ContactModal from "./ContactModal";

export default function StickyUrgencyBar() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300 && !isDismissed) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isDismissed]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed bottom-4 md:bottom-8 left-0 w-full z-50 pointer-events-none flex justify-center px-4"
                >
                    <div className="relative pointer-events-auto w-full max-w-[95vw] md:max-w-fit bg-[#0A0A0A]/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] rounded-[2rem] md:rounded-full pl-5 pr-3 py-3 md:pl-8 md:pr-4 md:py-3.5 flex flex-row items-center justify-between gap-4 md:gap-8 overflow-hidden">
                        
                        {/* Text Content - Stacks on Mobile, Inline with Divider on Desktop */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4 flex-1 whitespace-nowrap">
                            <div className="flex items-center gap-2.5">
                                <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 hidden md:block"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-primary"></span>
                                </span>
                                <span className="text-white font-bold text-sm md:text-base tracking-wide flex items-center">
                                    Limited Slots
                                </span>
                            </div>
                            <span className="hidden md:block text-white/20 text-lg font-light">|</span>
                            <span className="text-white/70 text-[11px] md:text-sm font-medium tracking-wide">
                                Book before we run out!
                            </span>
                        </div>
                        
                        {/* Actions Container */}
                        <div className="flex items-center gap-3 shrink-0">
                            <ContactModal>
                                <button className="bg-primary text-white px-5 py-2.5 md:px-7 md:py-3 rounded-full font-bold text-xs md:text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-primary/30 whitespace-nowrap">
                                    Book Now
                                </button>
                            </ContactModal>

                            {/* Inline Close Button */}
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsDismissed(true);
                                    setIsVisible(false);
                                }}
                                className="text-white/40 hover:text-white p-1.5 md:p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
