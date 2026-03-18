import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReferAndEarnForm from "@/components/ReferAndEarnForm";

export const metadata: Metadata = {
    title: "Refer and Earn | Brain Scan Academy Gooty",
    description: "Refer your friends to Brain Scan Academy Gooty and earn rewards when they join our premium child intelligence programs.",
};

export default function ReferAndEarnPage() {
    return (
        <main className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 flex flex-col">
            <Navbar />
            
            <div className="flex-grow container mx-auto px-6 py-24 md:py-32 flex flex-col items-center">
                <div className="text-center max-w-2xl mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Refer and Earn</h1>
                    <p className="text-white/60 text-lg">
                        Help a friend unlock their true cognitive potential and earn rewards when they join Brain Scan Academy.
                    </p>
                </div>

                <div className="w-full max-w-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
                    <ReferAndEarnForm />
                </div>
            </div>

            <Footer />
        </main>
    );
}
