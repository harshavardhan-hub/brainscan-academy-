export default function TrustBar() {
    const items = [
        "Certified Neuroscience Framework",
        "Trusted Across 12 Cities",
        "Advanced Brain Mapping",
        "Unlocking Human Potential",
        "Science-Backed Methodology"
    ];

    return (
        <section className="relative w-full h-[72px] border-y border-[rgba(255,255,255,0.06)] bg-transparent overflow-hidden flex items-center">
            {/* 
              Overriding animation duration inline to make it very slow (120s) 
              as requested by the user ("very fast moving make very slow").
            */}
            <div
                className="flex animate-marquee whitespace-nowrap"
                style={{ animationDuration: "120s" }}
            >
                {/* Duplicating items enough times to ensure smooth infinite scroll */}
                {[...items, ...items, ...items, ...items, ...items, ...items].map((item, i) => (
                    <div key={i} className="flex items-center mx-[4vw]">
                        <span className="text-[13px] uppercase tracking-[0.15em] text-muted/80 font-medium">
                            {item}
                        </span>
                        <span className="ml-[4vw] text-primary/30">|</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
