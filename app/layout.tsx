import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brain Scan Academy Gooty | Premium Child Intelligence Training",
  description: "Premium neuroscience-based child intelligence and mind training institute in Gooty.",
  keywords: ["Brain Scan Academy Gooty", "Brain Scan Academy", "Child Intelligence", "Mind Training", "Neuroscience", "Gooty child education"],
  icons: { icon: '/logo.png' },
  openGraph: {
    title: "Brain Scan Academy Gooty",
    description: "Premium neuroscience-based child intelligence and mind training institute.",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Brain Scan Academy Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="antialiased bg-background text-foreground">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
