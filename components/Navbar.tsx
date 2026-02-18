"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 40);
    });

    const links = [
        { name: "Programs", href: "#programs" },
        { name: "How It Works", href: "#process" },
        { name: "About", href: "#about" },
        { name: "Stories", href: "#stories" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className={`fixed top-0 left-0 right-0 z-50 flex h-[68px] items-center justify-between px-6 transition-all duration-300 md:px-12 ${isScrolled || mobileMenuOpen
                        ? "bg-[rgba(7,8,15,0.85)] backdrop-blur-md shadow-sm"
                        : "bg-transparent"
                    }`}
            >
                <div className="flex items-center gap-2">
                    <Link href="/" className="text-xl font-bold tracking-tight text-white">
                        BrainScan <span className="font-light text-primary">Academy</span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <div className="hidden items-center gap-8 md:flex">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="group relative text-sm font-medium text-white/70 transition-colors hover:text-white"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                <div className="hidden md:block">
                    <Button size="sm" className="rounded-full font-semibold animate-pulse-slow">
                        Book Consultation
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="block p-2 text-white md:hidden"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <Menu className="h-6 w-6" />
                </button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] flex flex-col bg-background/95 px-6 py-8 backdrop-blur-xl md:hidden"
                    >
                        <div className="flex items-center justify-between border-b border-border pb-6">
                            <span className="text-xl font-bold tracking-tight text-white">
                                BrainScan <span className="font-light text-primary">Academy</span>
                            </span>
                            <button
                                className="rounded-full p-2 text-white/70 hover:bg-white/10"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-6 pt-12">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-2xl font-medium text-white transition-colors hover:text-primary"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="mt-8">
                                <Button size="lg" className="w-full rounded-full text-lg">
                                    Book Consultation
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
