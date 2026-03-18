"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

export default function ReferAndEarnForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        referrerName: "",
        referrerPhone: "",
        referrerEmail: "",
        friendName: "",
        friendPhone: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        
        try {
            const content = `🎁 **New Refer & Earn Request!** 🎁\n\n**Referrer Name:** ${formData.referrerName}\n**Referrer Phone:** ${formData.referrerPhone}\n**Referrer Email:** ${formData.referrerEmail || "Not provided"}\n\n**Friend's Name:** ${formData.friendName}\n**Friend's Phone:** ${formData.friendPhone}\n`;

            const response = await fetch("/api/referral", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ referrerName: "", referrerPhone: "", referrerEmail: "", friendName: "", friendPhone: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                    <CheckCircle size={32} />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-white">Thank You for Referring!</h3>
                <p className="text-white/70">
                    Your referral details have been submitted. We will contact your friend shortly!
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                    Submit Another Referral
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-primary border-b border-white/10 pb-2 text-left">Your Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="referrerName" className="text-base font-bold text-white text-left block">Your Name <span className="text-red-400">*</span></label>
                        <input required type="text" id="referrerName" name="referrerName" value={formData.referrerName} onChange={handleChange} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-primary focus:bg-white/10" placeholder="John Doe" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="referrerPhone" className="text-base font-bold text-white text-left block">Your Phone <span className="text-red-400">*</span></label>
                        <input required type="tel" id="referrerPhone" name="referrerPhone" value={formData.referrerPhone} onChange={handleChange} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-primary focus:bg-white/10" placeholder="+91 98765 43210" />
                    </div>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="referrerEmail" className="text-base font-bold text-white text-left block">Your Email <span className="text-white/40 text-sm font-normal">(Optional)</span></label>
                    <input type="email" id="referrerEmail" name="referrerEmail" value={formData.referrerEmail} onChange={handleChange} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-primary focus:bg-white/10" placeholder="john@example.com" />
                </div>
            </div>

            <div className="space-y-4 mt-2">
                <h3 className="text-lg font-bold text-primary border-b border-white/10 pb-2 text-left">Friend's Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="friendName" className="text-base font-bold text-white text-left block">Friend's Name <span className="text-red-400">*</span></label>
                        <input required type="text" id="friendName" name="friendName" value={formData.friendName} onChange={handleChange} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-primary focus:bg-white/10" placeholder="Jane Doe" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="friendPhone" className="text-base font-bold text-white text-left block">Friend's Phone <span className="text-red-400">*</span></label>
                        <input required type="tel" id="friendPhone" name="friendPhone" value={formData.friendPhone} onChange={handleChange} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-primary focus:bg-white/10" placeholder="+91 98765 43210" />
                    </div>
                </div>
            </div>

            {status === "error" && (
                <p className="mt-2 text-sm text-red-400 text-left">Something went wrong. Please try again.</p>
            )}

            <button
                type="submit"
                disabled={status === "loading"}
                className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-4 text-base font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 w-full"
            >
                {status === "loading" && <Loader2 className="h-5 w-5 animate-spin" />}
                {status === "loading" ? "Submitting..." : "Submit Referral"}
            </button>
        </form>
    );
}
