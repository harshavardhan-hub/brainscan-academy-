import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#07080f",
                foreground: "#f0f0f0",
                primary: "#c8a96e",
                secondary: "#4a90d9",
                muted: "#8a8fa8",
                border: "rgba(255,255,255,0.07)",
            },
            fontFamily: {
                sans: ["var(--font-jakarta)", "sans-serif"],
            },
            animation: {
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                marquee: "marquee 25s linear infinite",
                "spin-slow": "spin 8s linear infinite",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-100%)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
