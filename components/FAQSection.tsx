"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { cn } from "../lib/utils";


const faqs = [
    { q: "What age is DMIT suitable for?", a: "The DMIT test can be done from age 3 onwards. The earlier the assessment, the more time there is to align education and activities with your child's natural intelligence." },
    { q: "Is Mid Brain Activation scientifically proven?", a: "Yes. Mid Brain Activation is rooted in research on the mesencephalon's role in sensory integration and bilateral brain coordination. It has been practiced and validated across Japan, Malaysia, India, and multiple research institutions." },
    { q: "How long before we see results?", a: "Most parents report observable changes in focus and memory within 3–4 weeks of beginning a program. Full transformation results are typically seen at the 12-week milestone." },
    { q: "Is the DMIT test painful or invasive?", a: "Not at all. We gently scan the child's fingerprints using a digital scanner. The process is completely non-invasive and takes under 30 minutes." },
    { q: "Do you offer online programs?", a: "Yes. Our consultation, report delivery, and certain training modules are available online. The DMIT fingerprint scan requires an in-person or courier-based kit appointment." },
    { q: "What makes BrainScan Academy different?", a: "We don't believe in generic education advice. Every recommendation we make is uniquely derived from your child's own neurological fingerprint data — not age charts, not general IQ tests." },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-background border-t border-white/5">
            <div className="container mx-auto px-6 max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">Questions.</h2>

                <div className="flex flex-col">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border-b border-white/10 overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between py-6 text-left group transition-colors hover:bg-white/[0.02]"
                            >
                                <span className="text-lg md:text-xl font-medium text-white/90 group-hover:text-primary transition-colors pr-8">
                                    {faq.q}
                                </span>
                                <div className="relative w-6 h-6 flex items-center justify-center">
                                    <motion.div
                                        animate={{ rotate: openIndex === i ? 90 : 0, opacity: openIndex === i ? 0 : 1 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute"
                                    >
                                        <Plus className="text-primary" />
                                    </motion.div>
                                    <motion.div
                                        animate={{ rotate: openIndex === i ? 90 : 0, opacity: openIndex === i ? 1 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute"
                                    >
                                        <X className="text-primary" />
                                    </motion.div>
                                </div>
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <p className="pb-6 text-muted leading-relaxed pr-8">
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
