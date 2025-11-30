import { Environment, MeshTransmissionMaterial, Text } from "@react-three/drei";
import { Canvas, useThree, type Camera } from "@react-three/fiber";
import * as THREE from "three";
import regularFont from "./Sahitya-Regular.ttf";
import "./styles.scss";
import { useControls } from "leva";

export default function GlassEffect() {
    return (
        <Canvas
            gl={{ antialias: true, alpha: true }}
            className="glass-canvas"
            camera={{ position: [0, 0, 10] }}
            style={{ height: "100%", width: "100%" }}
        >
            <Environment preset="city" />
            {/*<ambientLight intensity={Math.PI} />*/}
            <BluredPlate />
            {/*<pointLight position={[10, 10, 10]} intensity={2} />*/}
            {/*<mesh position={[0, 0, 6]}>
                <boxGeometry args={[4, 2, 0]} />
                <MeshTransmissionMaterial
                    transmissionSampler
                    transmission={1}
                    thickness={0.5}
                    roughness={0.05}
                    ior={1.45}
                    chromaticAberration={0.03}
                    attenuationDistance={1}
                    anisotropicBlur={2}
                    attenuationColor="#ffffff"
                />
            </mesh>*/}
            <BackgroundText />
        </Canvas>
    );
}

function BluredPlate() {
    return (
        <mesh position={[0, 0, 6]}>
            <boxGeometry args={[4, 2, 1]} />
            <MeshTransmissionMaterial
            
            />
        </mesh>
    );
}

function BackgroundText() {
    const s = useThree();

    const fontSizeInPx = 30;

    return (
        <Text
            position={[0, 0, 5]}
            font={regularFont}
            color="black"
            maxWidth={pixelsToWorld(
                s.camera,
                s.size.width - 50,
                5,
                s.size.height,
            )}
            fontSize={pixelsToWorld(s.camera, fontSizeInPx, 5, s.size.height)}
        >
            TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
            TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
            TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
            TEST TEST TEST TEST TEST TEST TEST
        </Text>
    );
}

function pixelsToWorld(
    camera: Camera,
    pixels: number,
    distance: number,
    canvasHeight: number,
): number {
    if (camera instanceof THREE.PerspectiveCamera) {
        // worldHeight на відстані distance від камери
        const fovInRad = (camera.fov * Math.PI) / 180;
        const worldHeight = 2 * Math.tan(fovInRad / 2) * distance;
        return (pixels / canvasHeight) * worldHeight;
    } else if (camera instanceof THREE.OrthographicCamera) {
        const worldHeight = camera.top - camera.bottom;
        return (pixels / canvasHeight) * worldHeight;
    }

    throw new Error("Camera type not supported");
}
