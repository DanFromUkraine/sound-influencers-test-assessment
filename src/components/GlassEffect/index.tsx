import {
    Html,
    MeshTransmissionMaterial,
    RoundedBox,
    Text,
    Environment,
} from "@react-three/drei";
import { Canvas, useThree, type Camera } from "@react-three/fiber";
import * as THREE from "three";
import regularFont from "./Sahitya-Regular.ttf";
import "./styles.scss";
import svgLogo from "./logo.svg";
import { useLayoutEffect, useRef, useState } from "react";

export default function GlassEffect() {
    return (
        <Canvas
            gl={{ antialias: true, alpha: true }}
            className="glass-canvas"
            camera={{ position: [0, 0, 10] }}
            style={{ height: "100%", width: "100%" }}
        >
            <color attach="background" args={["#ffffff"]} />

            {/* Додай Environment для коректного освітлення */}
            <Environment preset="studio" environmentIntensity={1.5} />

            <ambientLight intensity={1.5} color={0xffffff} />
            <directionalLight
                position={[10, 10, 10]}
                intensity={1}
                color={0xffffff}
            />

            <BackgroundText />
            <Logo />
        </Canvas>
    );
}

function BackgroundText() {
    const s = useThree();
    const fontSizeInPx = 30;

    return (
        <Text
            position={[0, 0, 0]}
            font={regularFont}
            color="black"
            maxWidth={pixelsToWorld(
                s.camera,
                s.size.width - 50,
                10,
                s.size.height,
            )}
            fontSize={pixelsToWorld(s.camera, fontSizeInPx, 10, s.size.height)}
        >
            TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
            TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
            TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
            TEST TEST TEST TEST TEST TEST TEST
        </Text>
    );
}

interface RectInfo {
    startX: number;
    startY: number;
    width: number;
    height: number;
}

function Logo() {
    const htmlSectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!htmlSectionRef.current) return;
    });

    return (
        <>
            <mesh position={[0, 0, 2]}>
                <RoundedBox args={[4, 2, 0.5]} radius={0.08} smoothness={4}>
                    <MeshTransmissionMaterial
                        transmission={0.85}
                        thickness={0.2}
                        ior={1.2}
                        samples={64}
                        roughness={0.04}
                        anisotropicBlur={0.2}
                        attenuationColor="#ffffff"
                        attenuationDistance={2}
                        depthWrite={true}
                        depthTest={true}
                        toneMapped={false}
                        chromaticAberration={0.5}
                    />
                </RoundedBox>
            </mesh>
            <Html center>
                <section className="glassLogo" ref={htmlSectionRef}>
                    <img src={svgLogo} alt="logo" />
                    <span>SoundInfluencers</span>
                </section>
            </Html>
        </>
    );
}

function pixelsToWorld(
    camera: Camera,
    pixels: number,
    distance: number,
    canvasHeight: number,
): number {
    if (camera instanceof THREE.PerspectiveCamera) {
        const fovInRad = (camera.fov * Math.PI) / 180;
        const worldHeight = 2 * Math.tan(fovInRad / 2) * distance;
        return (pixels / canvasHeight) * worldHeight;
    } else if (camera instanceof THREE.OrthographicCamera) {
        const worldHeight = camera.top - camera.bottom;
        return (pixels / canvasHeight) * worldHeight;
    }

    throw new Error("Camera type not supported");
}
