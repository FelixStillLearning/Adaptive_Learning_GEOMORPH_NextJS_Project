
"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Stars, Html } from "@react-three/drei";
import { Mesh } from "three";
// import { motion } from "framer-motion-3d"; // Removed due to dependency conflict

// Props for the shape
interface GeometricShapeProps {
    highlight?: boolean;
    showMeasurements?: boolean;
}

function GeometricShape({ highlight, showMeasurements }: GeometricShapeProps) {
    const meshRef = useRef<Mesh>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Base rotation
            meshRef.current.rotation.x += delta * 0.1;
            meshRef.current.rotation.y += delta * 0.2;

            // Highlight Logic: Pulse scale if highlighted
            if (highlight) {
                const scale = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.1;
                meshRef.current.scale.set(scale, scale, scale);
            } else {
                meshRef.current.scale.set(1, 1, 1);
            }
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <group>
                <mesh
                    ref={meshRef}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                >
                    <icosahedronGeometry args={[2.5, 0]} />
                    <meshStandardMaterial
                        color={highlight ? "#f43f5e" : (hovered ? "#818cf8" : "#6366f1")}
                        wireframe
                        transparent
                        opacity={highlight ? 0.6 : 0.3}
                        emissive={highlight ? "#f43f5e" : "#4f46e5"}
                        emissiveIntensity={highlight ? 2 : 0.5}
                    />

                    {/* Inner Core */}
                    <mesh scale={0.5}>
                        <dodecahedronGeometry args={[1, 0]} />
                        <meshStandardMaterial
                            color="#2dd4bf"
                            emissive="#2dd4bf"
                            emissiveIntensity={2}
                            toneMapped={false}
                        />
                    </mesh>
                </mesh>

                {/* Measurements (conditionally shown) */}
                {showMeasurements && (
                    <Html position={[2.8, 0, 0]} center className="pointer-events-none select-none">
                        <div className="bg-slate-900/80 text-teal-300 px-2 py-1 rounded border border-teal-500/50 text-xs font-mono backdrop-blur-sm">
                            s = 5cm
                        </div>
                    </Html>
                )}
            </group>
        </Float>
    );
}

interface ThreeSceneProps {
    highlight?: boolean;
    showMeasurements?: boolean;
}

import { Component, ErrorInfo, ReactNode } from "react";

// Error Boundary to catch WebGL context failures
class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
    constructor(props: { children: ReactNode; fallback: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("WebGL Context Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}

export default function ThreeScene({ highlight = false, showMeasurements = false }: ThreeSceneProps) {
    return (
        <div className="absolute inset-0 -z-10 bg-[#020617]"> {/* Hardcoded dark bg to ensure visibility */}
            <WebGLErrorBoundary
                fallback={
                    <div className="w-full h-full flex items-center justify-center text-slate-800 opacity-20">
                        {/* Fallback pattern or just empty dark bg */}
                        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                    </div>
                }
            >
                <Canvas 
                    camera={{ position: [0, 0, 8] }} 
                    fallback={null}
                    gl={{
                        antialias: true,
                        powerPreference: "high-performance",
                        failIfMajorPerformanceCaveat: false,
                        preserveDrawingBuffer: false,
                    }}
                >
                    <color attach="background" args={["#020617"]} /> {/* Match slate-950 */}
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <pointLight position={[-10, -10, -10]} color="#2dd4bf" intensity={0.5} />

                    <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                    <GeometricShape highlight={highlight} showMeasurements={showMeasurements} />

                    {/* Enabled Zoom and Rotate for interactivity */}
                    <OrbitControls
                        enableZoom={true}
                        enablePan={false}
                        autoRotate={!highlight} // Stop rotating if highlighted so user can see
                        autoRotateSpeed={0.5}
                        minDistance={4}
                        maxDistance={12}
                    />
                </Canvas>
            </WebGLErrorBoundary>
        </div>
    );
}
