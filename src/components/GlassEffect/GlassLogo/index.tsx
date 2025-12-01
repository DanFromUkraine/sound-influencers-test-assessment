import { useLayoutEffect, useRef, useState } from "react";
import GlassElement from "./GlassElement";
import svgLogo from "./logo.svg";

type RectSize = {
    width: number;
    height: number;
};

export default function GlassLogo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<RectSize | null>(null);

    useLayoutEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        setSize({
            width: el.clientWidth,
            height: el.clientHeight,
        });
    }, []);

    return (
        <section className="glassLogo" ref={containerRef}>
            {size !== null && (
                <GlassElement
                    width={size.width}
                    height={size.height + 1}
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
