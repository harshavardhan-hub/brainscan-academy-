import type { Metadata } from "next";
import Link from "next/link";
import AdmissionForm from "@/components/AdmissionForm";

export const metadata: Metadata = {
  title: "BrainScan Academy – Admission Form for Phonics, Finger Maths and Yoga",
};

export default function Admission1Page() {
  const formDescription = (
    <div className="space-y-4 mt-6 text-gray-300 text-left max-w-2xl mx-auto p-6 rounded-xl bg-white/5 border border-white/10">
      <p>
        Enroll your child in our <strong>Phonics Program</strong> to improve reading, writing, and pronunciation skills,{' '}
        <strong>Finger Maths</strong> for fast and easy calculations without tools,{' '}
        and <strong>Yoga</strong> for flexibility and concentration.
      </p>
      <div className="space-y-2 text-sm md:text-base border-l-2 border-primary pl-4 py-2 mt-4">
        <p><strong>Trainer:</strong> G. Bharghavi (M.Tech, Assistant Professor, Phonics and Yoga Trainer)</p>
        <p><strong>📍 Location:</strong> Opposite Andhra Grameena Bank, Bandi Satya House 1st Floor, Anantapur Road, Gooty</p>
        <p className="text-primary font-medium">⚠️ Limited Seats Available</p>
        <p><strong>Age:</strong> 4Y to 10Y</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#07080f] text-foreground selection:bg-primary/30 pb-20 relative overflow-hidden">
      {/* Background glow effects matching the main website */}
      <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]"></div>
      <div className="pointer-events-none absolute right-0 top-[20%] h-[400px] w-[400px] max-w-full translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]"></div>

      {/* Navbar specific to admission page */}
      <nav className="sticky top-0 z-50 flex h-[68px] items-center justify-between px-6 md:px-12 bg-[#07080f]/85 backdrop-blur-md shadow-sm border-b border-white/5">
        <Link href="/" className="flex h-[64px] items-center gap-2 overflow-hidden text-xl font-bold tracking-tight text-white">
          <img src="/logo.png" alt="BrainScan Academy Logo" className="h-[64px] w-[200px] sm:w-[500px] md:w-[800px] max-w-none object-contain object-left scale-[1.5] md:scale-[1.7] origin-left" />
        </Link>
        <Link href="/">
          <div className="inline-flex h-8 md:h-10 items-center justify-center whitespace-nowrap rounded-full bg-primary px-3 md:px-6 py-2 text-xs md:text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            Visit Main Website
          </div>
        </Link>
      </nav>

      {/* Form Container */}
      <div className="container mx-auto px-4 mt-8 md:mt-12 relative z-10">
        <AdmissionForm 
          formId="Admission1"
          title="BrainScan Academy – Admission Form for Phonics, Finger Maths and Yoga"
          description={formDescription}
          courses={["Phonics Level 1", "Finger Maths", "Yoga"]}
        />
      </div>
    </main>
  );
}
