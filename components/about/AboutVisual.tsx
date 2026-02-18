"use client";

import { useEffect, useRef } from "react";

export default function AboutVisual() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Configuration
        const colors = {
            base: "#07080f",
            gold: "rgba(200, 169, 110, 1)", // #c8a96e
            goldDim: "rgba(200, 169, 110, 0.2)",
            bluePulse: "rgba(74, 144, 217, 1)", // #4a90d9
            blueDim: "rgba(74, 144, 217, 0.3)",
        };

        let animationFrameId: number;
        let time = 0;

        // State identifiers
        let ridges: Ridge[] = [];
        let nodes: Node[] = [];
        let scanLineY = 0;
        let activePoints: Point[] = [];

        // Types
        type Ridge = {
            rx: number;
            ry: number;
            rotation: number;
            segments: { start: number; end: number }[]; // For breaks/irregularity
            noiseOffset: number;
        };

        type Point = {
            x: number;
            y: number;
            birthTime: number;
            life: number; // seconds
        };

        type Node = {
            x: number;
            y: number;
            pulseOffset: number;
            ridgeIndex: number;
            angle: number;
        };

        // Initialization
        const init = () => {
            const width = canvas.width;
            const height = canvas.height;
            const centerX = width / 2;
            const centerY = height / 2;

            ridges = [];
            nodes = [];
            activePoints = [];
            scanLineY = 0;

            const maxRadius = Math.min(width, height) * 0.45;
            const ridgeCount = 15;

            // Generate Ridges (Concentric ovals)
            for (let i = 1; i <= ridgeCount; i++) {
                const progress = i / ridgeCount;
                const rx = maxRadius * progress * 0.9;
                const ry = maxRadius * progress * 1.1; // Slightly oval vertical

                ridges.push({
                    rx,
                    ry,
                    rotation: (Math.random() - 0.5) * 0.2, // Slight random rotation
                    noiseOffset: Math.random() * 100,
                    segments: [{ start: 0, end: Math.PI * 2 }] // Full continuous for now
                });

                // Add random nodes on some ridges
                if (i > 3 && Math.random() > 0.4) {
                    const nodeCount = Math.floor(Math.random() * 3) + 1;
                    for (let n = 0; n < nodeCount; n++) {
                        const angle = Math.random() * Math.PI * 2;
                        // Calculate pos based on ellipse formula
                        // x = h + rx * cos(t) * cos(rot) - ry * sin(t) * sin(rot)
                        // y = k + rx * cos(t) * sin(rot) + ry * sin(t) * cos(rot)
                        // We'll calculate exact pos in render loop to account for breathing
                        nodes.push({
                            x: 0,
                            y: 0,
                            ridgeIndex: i - 1,
                            angle,
                            pulseOffset: Math.random() * Math.PI
                        });
                    }
                }
            }
        };

        const resize = () => {
            if (!canvas.parentElement) return;
            const rect = canvas.parentElement.getBoundingClientRect();
            // Match container size
            canvas.width = rect.width;
            canvas.height = rect.height; // Or maintain aspect ratio? Prompt says "fills its container", "roughly square".

            // Re-init on resize
            init();
        };

        window.addEventListener("resize", resize);
        resize();

        // Render Loop
        const render = () => {
            time += 0.01;
            const width = canvas.width;
            const height = canvas.height;
            const centerX = width / 2;
            const centerY = height / 2;

            // Clear Background
            ctx.fillStyle = colors.base;
            ctx.fillRect(0, 0, width, height);

            // Breathing effect
            const breathScale = 1 + Math.sin(time * 0.5) * 0.02;

            // 1. Draw Central Glow
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, width * 0.4);
            gradient.addColorStop(0, "rgba(200, 169, 110, 0.15)");
            gradient.addColorStop(1, "rgba(7, 8, 15, 0)");
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, width * 0.5, 0, Math.PI * 2);
            ctx.fill();

            // 2. Draw Ridges
            ctx.strokeStyle = colors.goldDim;
            ctx.lineWidth = 1.5;

            ridges.forEach((ridge, idx) => {
                const currentRx = ridge.rx * breathScale;
                const currentRy = ridge.ry * breathScale;

                ctx.beginPath();
                ctx.ellipse(centerX, centerY, currentRx, currentRy, ridge.rotation, 0, Math.PI * 2);
                ctx.stroke();

                // Update node positions for this frame
                nodes.forEach(node => {
                    if (node.ridgeIndex === idx) {
                        const cosT = Math.cos(node.angle);
                        const sinT = Math.sin(node.angle);
                        const cosRot = Math.cos(ridge.rotation);
                        const sinRot = Math.sin(ridge.rotation);

                        node.x = centerX + currentRx * cosT * cosRot - currentRy * sinT * sinRot;
                        node.y = centerY + currentRx * cosT * sinRot + currentRy * sinT * cosRot;
                    }
                });
            });

            // 3. Scan Line Logic
            scanLineY += 1.5; // Speed
            const scanResetHeight = height + 50;
            if (scanLineY > scanResetHeight) {
                scanLineY = -50;
            }

            // Draw Scan Line (faint)
            // ctx.strokeStyle = "rgba(74, 144, 217, 0.1)";
            const scanAlpha = Math.max(0, Math.sin(time * 3)) * 0.2 + 0.1;
            ctx.fillStyle = `linear-gradient(to bottom, transparent, ${colors.blueDim}, transparent)`;
            // Manual gradient for line
            const lg = ctx.createLinearGradient(0, scanLineY - 20, 0, scanLineY + 20);
            lg.addColorStop(0, "rgba(74, 144, 217, 0)");
            lg.addColorStop(0.5, `rgba(74, 144, 217, ${scanAlpha})`);
            lg.addColorStop(1, "rgba(74, 144, 217, 0)");
            ctx.fillStyle = lg;
            ctx.fillRect(0, scanLineY - 20, width, 40);

            // 4. Check for intersections and spawn points
            // Simplified collision: check if scanning line is near any ridge part
            // Actually, easier to just check if scanLineY intersects each ellipse at x
            // Ellipse equation: ((x-h)cosA + (y-k)sinA)^2/rx^2 + ((x-h)sinA - (y-k)cosA)^2/ry^2 = 1
            // This is heavy to solve for X for every Y.
            // Alternative: Probabilistic spawning on nodes or random points on ridges when Y matches

            // Simple approach: When scanLineY is close to a node's Y, activate the node or spawn a point nearby
            // Better: Iterate ridges, find x at scanLine Y? Too expensive.
            // visual hack: spawn points randomly within the "cloud" of the fingerprint when scan passes?
            // "leaving behind glowing gold data points on the ridges it touches"

            // Let's pre-calculate some points on ridges or just spawn them randomly "on" ridges
            if (scanLineY > 0 && scanLineY < height) {
                // Try to spawn points on ridges at this Y
                // Iterate a few random x's, check if they are on a ridge?
                // Or just iterate ridges and compute X for current Y.
                // For an axis-aligned ellipse: x = h +/- rx * sqrt(1 - (y-k)^2/ry^2)
                // We have rotation, so it's harder.
                // Approximation: treat as aligned for spawn calculation or just loop nodes.

                ridges.forEach(ridge => {
                    if (Math.random() > 0.1) return; // Don't spawn on every frame/ridge

                    // Approx y distance from center
                    const dy = scanLineY - centerY;
                    const currentRy = ridge.ry * breathScale;

                    if (Math.abs(dy) < currentRy) {
                        // Calculate x approx
                        const currentRx = ridge.rx * breathScale;
                        const ratio = dy / currentRy;
                        const dx = currentRx * Math.sqrt(1 - ratio * ratio);

                        // Two points: left and right
                        [centerX - dx, centerX + dx].forEach(px => {
                            if (Math.random() > 0.5) { // 50% chance
                                // Jitter slightly
                                const finalX = px + (Math.random() - 0.5) * 10;
                                const finalY = scanLineY + (Math.random() - 0.5) * 5;

                                activePoints.push({
                                    x: finalX,
                                    y: finalY,
                                    birthTime: Date.now(),
                                    life: 2000 + Math.random() * 1000
                                });
                            }
                        });
                    }
                });
            }

            // 5. Draw Active Points
            const now = Date.now();
            activePoints = activePoints.filter(p => now - p.birthTime < p.life);

            activePoints.forEach(p => {
                const age = now - p.birthTime;
                const lifeProgress = age / p.life; // 0 to 1
                const alpha = Math.max(0, 1 - lifeProgress);

                ctx.fillStyle = `rgba(200, 169, 110, ${alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                ctx.fill();
            });

            // 6. Draw Nodes and Connections
            // Connections
            ctx.strokeStyle = `rgba(74, 144, 217, 0.2)`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            nodes.forEach((node, i) => {
                // Draw line to nearby nodes
                nodes.slice(i + 1).forEach(other => {
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 60) {
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                    }
                });
            });
            ctx.stroke();

            // Node Dots
            nodes.forEach(node => {
                const pulse = Math.sin(time * 2 + node.pulseOffset) * 0.5 + 0.5; // 0 to 1
                const size = 2 + pulse * 2;

                // Outer glow
                ctx.fillStyle = `rgba(74, 144, 217, ${pulse * 0.5})`;
                ctx.beginPath();
                ctx.arc(node.x, node.y, size * 2, 0, Math.PI * 2);
                ctx.fill();

                // Inner core
                ctx.fillStyle = colors.bluePulse;
                ctx.beginPath();
                ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="w-full h-full min-h-[400px] flex items-center justify-center relative bg-[#07080f]">
            <canvas
                ref={canvasRef}
                className="w-full h-full object-contain"
                style={{ maxHeight: '100%', maxWidth: '100%' }}
            />
        </div>
    );
}
