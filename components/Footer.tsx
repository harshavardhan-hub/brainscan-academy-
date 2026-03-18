import Link from "next/link";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full border-t border-[rgba(255,255,255,0.06)] bg-background pt-16 pb-8">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 mb-16">
                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white mb-2">
                            <img src="/logo.png" alt="BrainScan Academy Logo" className="h-10 w-auto object-contain bg-white/10 rounded-md p-1" />
                            <span>BrainScan <span className="font-light text-primary">Academy</span></span>
                        </Link>
                        <p className="text-sm text-muted">Where science meets potential.</p>
                        <div className="flex gap-4 mt-2">
                            <a href="#" className="text-muted hover:text-primary transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-muted hover:text-primary transition-colors"><Youtube size={20} /></a>
                            <a href="#" className="text-muted hover:text-primary transition-colors"><Facebook size={20} /></a>
                        </div>
                    </div>

                    {/* Programs */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-muted">Programs</h4>
                        <ul className="flex flex-col gap-2 text-sm text-white/80">
                            <li><Link href="#" className="hover:text-primary transition-colors">DMIT Test</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Mid Brain Activation</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Advanced Mind Training</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-muted">Company</h4>
                        <ul className="flex flex-col gap-2 text-sm text-white/80">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Our Method</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Research</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-muted">Get in Touch</h4>
                        <div className="flex flex-col gap-3 text-sm text-white/80">
                            <a href="mailto:brainscanacademy@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                                <Mail size={16} className="text-primary" /> brainscanacademy@gmail.com
                            </a>
                            <a href="tel:+917013517725" className="flex items-center gap-2 hover:text-primary transition-colors">
                                <Phone size={16} className="text-primary" /> +91 7013517725
                            </a>
                            <div className="flex items-start gap-2">
                                <MapPin size={16} className="text-primary mt-1" />
                                <span>Gooty, Andhra Pradesh, India</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[rgba(255,255,255,0.06)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
                    <p>© 2026 BrainScan Academy. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
