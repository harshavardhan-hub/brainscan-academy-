"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2 } from "lucide-react";

export default function ContactModal({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        location: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        
        try {
            const webhookUrl = "https://discord.com/api/webhooks/1483790450992087172/434CXH-0GEoEK4b5uLMQroitu0-oUPUdjZ-DVDQbFAJAKsMtOnBW8MgaqZ5zoBAulZhx";
            
            const content = `🎉 **New Consultation / Program Guide Request!** 🎉\n\n**Name:** ${formData.name}\n**Email:** ${formData.email || "Not provided"}\n**Phone:** ${formData.phone}\n**Location:** ${formData.location}\n`;

            const response = await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", location: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => setStatus("idle"), 300); // reset status after animation
    };

    return (
        <>
            <div onClick={() => setIsOpen(true)} className="inline-block w-full cursor-pointer h-full">
                {children}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 sm:p-8 shadow-2xl"
                        >
                            <button
                                onClick={closeModal}
                                className="absolute right-4 top-4 rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <X size={20} />
                            </button>

                            {status === "success" ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h3 className="mb-2 text-2xl font-bold text-white">Thank You!</h3>
                                    <p className="text-white/70">
                                        Your details have been submitted successfully. Our team will contact you shortly.
                                    </p>
                                    <button
                                        onClick={closeModal}
                                        className="mt-8 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                                    >
                                        Close Window
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div className="mb-8">
                                        <h2 className="mb-2 text-2xl font-bold text-white">Get in Touch</h2>
                                        <p className="text-sm text-white/60">
                                            Fill out the minimal details below and we will reach out to help you further.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="name" className="text-sm font-medium text-white/80">Name <span className="text-red-400">*</span></label>
                                            <input
                                                required
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-primary focus:bg-white/10"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="phone" className="text-sm font-medium text-white/80">Phone Number <span className="text-red-400">*</span></label>
                                            <input
                                                required
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-primary focus:bg-white/10"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="email" className="text-sm font-medium text-white/80">Email <span className="text-white/40 text-xs font-normal">(Optional)</span></label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-primary focus:bg-white/10"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="location" className="text-sm font-medium text-white/80">Location <span className="text-red-400">*</span></label>
                                            <input
                                                required
                                                type="text"
                                                id="location"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-primary focus:bg-white/10"
                                                placeholder="City, State"
                                            />
                                        </div>

                                        {status === "error" && (
                                            <p className="mt-2 text-sm text-red-400">Something went wrong. Please try again.</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === "loading"}
                                            className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                                            {status === "loading" ? "Submitting..." : "Submit & Send Details"}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
