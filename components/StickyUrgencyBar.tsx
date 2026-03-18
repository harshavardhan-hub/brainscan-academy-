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

        window.addEventListener("scroll", handleScroll);
        // Execute once to check initial scroll position
        handleScroll();
        
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isDismissed]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 pointer-events-auto"
                >
                    <div className="relative bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-2xl p-4 flex flex-row items-center justify-between gap-4">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsDismissed(true);
                                setIsVisible(false);
                            }}
                            className="absolute -top-2 -right-2 bg-neutral-800 text-white/70 hover:text-white rounded-full p-1.5 border border-white/10 shadow-lg transition-transform hover:scale-110 z-10"
                        >
                            <X size={14} />
                        </button>
                        
                        <div className="flex flex-col flex-1 pl-1">
                            <span className="text-white font-bold text-sm flex items-center gap-2">
                                <span className="animate-pulse text-primary text-xs">●</span> Limited Slots
                            </span>
                            <span className="text-white/60 text-xs mt-0.5 leading-tight">Book before we're full.</span>
                        </div>
                        
                        <div className="flex-none">
                            <ContactModal>
                                <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:opacity-90 hover:scale-105 transition-all whitespace-nowrap shadow-lg shadow-primary/20">
                                    Book Now
                                </button>
                            </ContactModal>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
