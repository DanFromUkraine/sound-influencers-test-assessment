import { useLayoutEffect, useRef, useState } from "react";
import GlassElement from "./GlassElement";
import svgLogo from "./logo.svg";

export default function GlassLogo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState();

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        console.log(containerRef.current.clientWidth);
    });

    return (
        <section className="glassLogo">
            <GlassElement
                width={186}
                height={27}
                radius={8}
                depth={1}
                blur={2}
                chromaticAberration={0.7}
            />

            <div className="mainLogoContent">
                <img src={svgLogo} alt="logo" />

                <span>SoundInfluencers</span>
            </div>
        </section>
    );
}
