"use client";

import { useState, useEffect } from "react";

export function useImagePreloader(frameCount: number, pathPrefix: string, extension: string = "png") {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let isMounted = true;
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            let loadedCount = 0;

            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                // Format: frame_000_delay-0.033s.png
                // We probably need to handle the variable numbering.
                // The prompt said: frame_000_delay-0.033s.webp to frame_109...
                // But actual files are .png and have the same naming pattern.
                // Let's assume the naming pattern is consistent: frame_XXX_delay-0.033s.png
                // But some might have 0.034s?
                // Wait, the file list showed:
                // frame_000_delay-0.033s.png
                // frame_001_delay-0.034s.png
                // So I CANNOT predict the exact filename without knowing it.
                // However, I can't read the file list efficiently from the client.
                // I should have generated a JSON manifest of filenames during build or I need to standardise them.
                // Since I cannot run a build script easily to generate a manifest json now without extra steps...
                // A better approach: The prompt implies I should just load them.
                // Maybe I should assume a standard name `frame_XXX.png` and I should RENAME them?
                // Renaming them to `frame_001.png` etc would make this trivial.
                // The prompt details: "Naming: frame_000_delay-0.033s.webp ... match original video timing".
                // If I rename them, I lose the timing info, but the prompt says "Target playback speed: match original video timing - each frame displays for 33ms (0.033s)".
                // Most are 0.033s, some 0.034s. That's 30fps essentially.
                // So I can just force 30fps (33.33ms) and ignore the filename timing.
                // SO I WILL RENAME THE FILES to `frame_000.png` etc. for simplicity.

                // Wait, I need to do that via command line first!
                // I will add a step to rename files in the task.

                // For now, I'll write the hook assuming they are renamed to `frame_{index}.png` (padded to 3 digits).

                const padIndex = i.toString().padStart(3, "0");
                img.src = `${pathPrefix}frame_${padIndex}.${extension}`;

                await new Promise((resolve, reject) => {
                    img.onload = () => {
                        if (isMounted) {
                            loadedCount++;
                            setProgress(Math.round((loadedCount / frameCount) * 100));
                            resolve(true);
                        }
                    };
                    img.onerror = () => {
                        // Skip missing frames visually but keep the slot? 
                        // Or just resolve.
                        console.warn(`Failed to load frame ${i}`);
                        resolve(false);
                    };
                });
                loadedImages.push(img);
            }

            if (isMounted) {
                setImages(loadedImages);
                setLoaded(true);
            }
        };

        loadImages();

        return () => {
            isMounted = false;
        };
    }, [frameCount, pathPrefix, extension]);

    return { images, loaded, progress };
}
