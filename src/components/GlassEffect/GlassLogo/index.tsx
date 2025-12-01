import { useEffect, useRef, useState } from "react";
import GlassElement from "./GlassElement";
import svgLogo from "./logo.svg";

type RectSize = {
    width: number;
    height: number;
};

export default function GlassLogo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<RectSize | null>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        });

        observer.observe(el);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section className="glassLogo" ref={containerRef}>
            {size !== null && (
                <GlassElement
                    width={size.width}
                    height={size.height}
                    radius={8}
                    depth={1}
                    blur={2.5}
                    chromaticAberration={0.7}
                />
            )}

            <div className="mainLogoContent">
                <img src={svgLogo} alt="logo" />

                <span>SoundInfluencers</span>
            </div>
        </section>
    );
}
