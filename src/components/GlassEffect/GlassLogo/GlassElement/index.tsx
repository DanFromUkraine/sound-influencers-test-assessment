import type { CSSProperties, ReactNode } from "react";
import {
    getDisplacementFilter,
    type DisplacementOptions,
} from "./getDisplacementFilter";

type GlassElementProps = DisplacementOptions & {
    children?: ReactNode;
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
