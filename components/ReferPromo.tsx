import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ReferPromo() {
    return (
        <section className="py-16 md:py-24 bg-background relative overflow-hidden">
            {/* Background elements to make it look premium */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="w-full max-w-5xl mx-auto bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                    
                    {/* Subtle hover effect light */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="flex flex-col gap-3 text-center md:text-left z-10 w-full md:w-auto">
                        <span className="text-primary text-xs font-bold uppercase tracking-widest block">Rewards Program</span>
                        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">Share the Gift of<br/>Intelligence</h3>
                        <p className="text-white/60 text-base md:text-lg max-w-md mt-2">
                            Refer a friend to Brain Scan Academy and earn exclusive rewards when they join. Help them unlock their true cognitive potential.
                        </p>
                    </div>
                    
                    <div className="z-10 shrink-0">
                        <Link href="/refer-and-earn">
                            <button className="bg-white text-primary px-8 py-4 rounded-full font-bold text-sm md:text-base hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center gap-3 whitespace-nowrap active:scale-95 group/btn">
                                Learn More <ArrowRight size={18} className="transform group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
