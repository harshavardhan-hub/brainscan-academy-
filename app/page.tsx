import NeuralHero from "@/components/NeuralHero";
import TrustBar from "@/components/TrustBar";
import AboutKinetic from "@/components/AboutKinetic";
import ProgramsAccordion from "@/components/ProgramsAccordion";
import ProcessTimeline from "@/components/ProcessTimeline";
import TestimonialsWall from "@/components/TestimonialsWall";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <NeuralHero />
      <TrustBar />
      <AboutKinetic />
      <ProgramsAccordion />
      <ProcessTimeline />
      <TestimonialsWall />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
