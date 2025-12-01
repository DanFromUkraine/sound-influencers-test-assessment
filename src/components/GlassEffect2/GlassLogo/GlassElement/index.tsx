import type { CSSProperties, ReactNode } from "react";
import {
    getDisplacementFilter,
    type DisplacementOptions,
} from "./getDisplacementFilter";

type GlassElementProps = DisplacementOptions & {
    children?: ReactNode | undefined;
    blur?: number;
};

export default function GlassElement({
    height,
    width,
    depth,
    radius,
    children,
    strength,
    chromaticAberration,
    blur = 2,
}: GlassElementProps) {
    const style: CSSProperties = {
        position: "absolute",
        top: 0,
        left: 0,
        height: `${height}px`,
        width: `${width}px`,
        borderRadius: `${radius}px`,
        backdropFilter: `blur(${blur / 2}px) url('${getDisplacementFilter({
            height,
            width,
            radius,
            depth,
            strength,
            chromaticAberration,
        })}') blur(${blur}px) brightness(1.1) saturate(1.5) `,
    };

    return (
        <div className="blurredPlate" style={style}>
            {children}
        </div>
    );
}
