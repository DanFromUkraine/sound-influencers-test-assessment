import {
    Environment,
    Html,
    MeshTransmissionMaterial,
    RoundedBox,
    Text,
} from "@react-three/drei";
import { Canvas, useThree, type Camera } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";
import svgLogo from "./logo.svg";
import regularFont from "./Sahitya-Regular.ttf";
import "./styles.scss";

export default function GlassEffect() {
    return (
        <Canvas
            gl={{ antialias: true, alpha: true }}
            className="glass-canvas"
            camera={{ position: [0, 0, 10] }}
            style={{ height: "100%", width: "100%" }}
        >
            <color attach="background" args={["#ffffff"]} />
            {/*<Environment preset="studio" environmentIntensity={0.8} />*/}
            <ambientLight intensity={0.8} color={0xffffff} />

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
            TEST TEST TEST TEST TEST TEST
        </Text>
    );
}

interface RectInfo {
    width: number;
    height: number;
}

function Logo() {
    const { camera, size } = useThree();
    const [rectInfo, setRectInfo] = useState<RectInfo | null>(null);

    useEffect(() => {
        const findElement = () => {
            const el = document.querySelector(".glassLogo") as HTMLDivElement;
            if (el && el.offsetWidth > 0 && el.offsetHeight > 0) {
                setRectInfo({
                    width: el.offsetWidth,
                    height: el.offsetHeight,
                });
                return true;
            }
            return false;
        };

        if (!findElement()) {
            const timer = setInterval(() => {
                if (findElement()) {
                    clearInterval(timer);
                }
            }, 50);

            return () => clearInterval(timer);
        }
    }, []);

    return (
        <>
            {rectInfo !== null && (
                <mesh position={[0, 0, 2]}>
                    <RoundedBox
                        args={[
                            pixelsToWorld(
                                camera,
                                rectInfo.width,
                                8,
                                size.height,
                            ),
                            pixelsToWorld(
                                camera,
                                rectInfo.height,
                                8,
                                size.height,
                            ),
                            0.2,
                        ]}
                        radius={pixelsToWorld(camera, 8, 8, size.height)}
                        smoothness={4}
                    >
                        <MeshTransmissionMaterial
                            samples={64}
                            anisotropicBlur={0.3}
                            attenuationColor="#ffffff"
                            attenuationDistance={0.2}
                            // depthWrite={true}
                            depthTest={true}
                            toneMapped={false}
                            transmission={1}
                            thickness={0.2}
                            roughness={0.04}
                            ior={1.8}
                            chromaticAberration={0.5}
                        />
                    </RoundedBox>
                </mesh>
            )}
            <Html center>
                <section className="glassLogo">
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
