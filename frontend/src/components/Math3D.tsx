
"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Environment, Grid, PivotControls } from "@react-three/drei";
import { Group, Mesh, TetrahedronGeometry, OctahedronGeometry, IcosahedronGeometry } from "three";
import { useLearningStore } from "@/lib/store";
import MeasurementOverlay from "./MeasurementOverlay";
import { getQuestionDimensions } from "@/lib/questionDimensions";

interface ShapeProps {
    level: number;
    topic: string;
    visualMode: string;
    highlight?: boolean;
    showMeasurements?: boolean;
    hint?: string;
    questionId?: number;
}

function InteractiveShape({ level, topic, visualMode, highlight, showMeasurements, hint, questionId }: ShapeProps) {
    const meshRef = useRef<Mesh>(null);
    const groupRef = useRef<Group>(null);
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const emotion = useLearningStore((state) => state.emotion);

    // Freeze auto-spin when showing measurements so rulers stay aligned.
    const allowAutoSpin = !showMeasurements;

    // Dynamic color based on emotion
    const getColor = () => {
        if (highlight) return '#f43f5e'; // Rose for highlight
        if (visualMode === 'party') {
            return active ? 'cyan' : '#d946ef';
        }
        switch (emotion) {
            case 'confused': return '#fbbf24';
            case 'fear': return '#ef4444';
            case 'happy': return '#10b981';
            case 'bored': return '#94a3b8';
            default: return '#6366f1';
        }
    };

    useFrame((state, delta) => {
        const container = groupRef.current;
        const target = meshRef.current;

        if (target && container) {
            // Base rotation
            let speed = 0.2 + level * 0.1;
            const lockScale = showMeasurements; // keep size stable while hint/measurement shown

            if (highlight) {
                // Pulse effect
                const base = active ? 1.5 : 1;
                const scale = lockScale ? 1 : (base + Math.sin(state.clock.elapsedTime * 8) * 0.1);
                target.scale.set(scale, scale, scale);
                speed = 0.5; // Rotate faster when highlighted
            } else if (visualMode === 'party') {
                speed *= 3;
                // Keep measurements legible: disable bounce/scale when rulers are shown.
                if (!showMeasurements) {
                    container.position.y = Math.sin(state.clock.elapsedTime * 5) * 0.5;
                } else {
                    container.position.y = 0;
                }
                const partyScale = lockScale ? 1 : (active ? 1.5 : 1);
                target.scale.set(partyScale, partyScale, partyScale);
            } else {
                container.position.y = 0;
                const normalScale = lockScale ? 1 : (active ? 1.5 : 1);
                target.scale.set(normalScale, normalScale, normalScale);
            }

            if ((!active || visualMode === 'party' || highlight) && allowAutoSpin) {
                container.rotation.x += delta * speed;
                container.rotation.y += delta * (speed + 0.1);
            }
        }
    });

    const renderGeometry = () => {
        const t = topic?.toLowerCase() || 'cube';
        
        // Basic shapes
        if (t === 'cube') return <boxGeometry args={[2, 2, 2]} />;
        if (t === 'cuboid') {
            // Use actual dimensions from measurementDims if available
            const w = measurementDims?.length ? measurementDims.length / 5 : 2;  // scale down for visual
            const h = measurementDims?.height ? measurementDims.height / 5 : 2;
            const d = measurementDims?.width ? measurementDims.width / 5 : 2;
            return <boxGeometry args={[w, h, d]} />;
        }
        if (t === 'sphere' || t === 'bola') return <sphereGeometry args={[1.5, 32, 32]} />;
        if (t === 'hemisphere') return <sphereGeometry args={[1.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />; // Half sphere
        if (t === 'cone' || t === 'kerucut') return <coneGeometry args={[1.5, 3, 32]} />;
        if (t === 'frustum') return <cylinderGeometry args={[1.2, 0.6, 3, 32]} />; // Truncated cone
        if (t === 'cylinder' || t === 'tabung' || t === 'cylindrical_shell') return <cylinderGeometry args={[1.5, 1.5, 3, 32]} />;
        if (t === 'pyramid' || t === 'limas') return <coneGeometry args={[1.5, 3, 4]} />;
        if (t === 'torus' || t === 'donat') return <torusGeometry args={[1.5, 0.5, 16, 100]} />;
        if (t === 'prism') return <cylinderGeometry args={[1.5, 1.5, 3, 3]} />;
        
        // Platonic solids and advanced shapes
        if (t === 'tetrahedron') return <primitive object={new TetrahedronGeometry(1.5, 0)} />;
        if (t === 'octahedron') return <primitive object={new OctahedronGeometry(1.5, 0)} />;
        if (t === 'dodecahedron') return <primitive object={new IcosahedronGeometry(1.5, 0)} />; // Using icosahedron as approximation
        if (t === 'icosahedron') return <primitive object={new IcosahedronGeometry(1.5, 0)} />;
        if (t === 'dodecahedron') return <dodecahedronGeometry args={[1.5, 0]} />;
        if (t === 'hemisphere') return <sphereGeometry args={[1.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />;
        if (t === 'frustum') return <cylinderGeometry args={[1.2, 1.5, 3, 32]} />;
        
        // Special/advanced topics
        if (t === 'sector') return <coneGeometry args={[1.5, 3, 32]} />;
        if (t === 'optimization') return <boxGeometry args={[2, 2, 2]} />;
        if (t === 'rotation') return <sphereGeometry args={[1.5, 32, 32]} />;
        if (t === 'ellipsoid') return <sphereGeometry args={[1.5, 32, 32]} />; // Will be scaled to ellipsoid shape
        if (t === 'composite' || t === 'archimedes') return <sphereGeometry args={[1.5, 32, 32]} />;
        
        // Default fallback
        return <boxGeometry args={[2, 2, 2]} />;
    };

    // Check if we need composite rendering
    const isComposite = (topic?.toLowerCase() === 'composite' || topic?.toLowerCase() === 'archimedes');
    const isDoubleSphere = topic?.toLowerCase() === 'sphere' && questionId === 31; // Bola A vs Bola B
    const isDoubleCone = topic?.toLowerCase() === 'cone' && questionId === 45; // Double cone
    const isConeInCylinder = questionId === 13; // Cone inside cylinder
    
    // Determine composite type based on question ID
    const getCompositeType = () => {
        if (topic?.toLowerCase() === 'archimedes') return 'sphere-in-cube'; // id 20
        if (!questionId) return 'sphere-in-cube'; // fallback
        
        // Specific composite visualizations
        if (questionId === 13) return 'cone-in-cylinder'; // Cone inside cylinder
        if (questionId === 45) return 'double-cone'; // Two cones joined at base
        if (questionId === 40) return 'ice-cream'; // Cone + hemisphere
        if (questionId === 11) return 'capsule'; // Cylinder + 2 hemispheres
        if (questionId === 13) return 'cone-in-cylinder'; // Cone inside cylinder
        if (questionId === 18) return 'spheres-in-cylinder'; // 3 spheres in cylinder
        if (questionId === 34) return 'half-cylinder'; // Cut cylinder
        
        return 'sphere-in-cube'; // default
    };

    const compositeType = isComposite ? getCompositeType() : (isDoubleSphere ? 'double-sphere' : undefined);

    // Per-question dimensions for measurement labels (cm where applicable)
    const baseDims = getQuestionDimensions(questionId);
    
    const measurementDims = (() => {
        if (compositeType === 'capsule' && questionId === 11) {
            return { ...baseDims, radius: 7, diameter: 14, bodyHeight: 10, unitLabel: 'cm' };
        }
        if (compositeType === 'double-sphere' && questionId === 31) {
            return { ...baseDims, unitLabel: 'cm', labelRadiusB: 'r_B = r', labelRadiusA: 'r_A = 2r' };
        }
        return baseDims;
    })();

    return (
        <Float speed={visualMode === 'party' ? 5 : 2} rotationIntensity={isDragging ? 0 : 0.5} floatIntensity={isDragging ? 0 : 0.5}>
            <PivotControls
                visible={hovered || isDragging} // Show when hovering or dragging
                activeAxes={[true, true, true]}
                disableRotations={false}
                disableScaling={true}
                depthTest={false} // Always render gizmo on top so it doesn't get hidden inside the mesh
                fixed // Keep gizmo size consistent on screen
                scale={120} // Much bigger for easier grabbing
                lineWidth={4} // Thicker lines
                anchor={[0, 0, 0]}
                annotations={true} // Show axis labels
                axisColors={['#ff0000', '#00ff00', '#0000ff']} // Red=X, Green=Y, Blue=Z
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
            >
                <group ref={groupRef}>
                {(isComposite || isDoubleSphere || isDoubleCone || isConeInCylinder) ? (
                    // Composite shapes with multiple objects
                    <group
                        ref={meshRef}
                        onClick={() => setActive(!active)}
                        onPointerOver={() => setHover(true)}
                        onPointerOut={() => setHover(false)}
                    >
                        {compositeType === 'ice-cream' && (
                            <>
                                {/* Ice cream cone */}
                                <mesh position={[0, -1, 0]}>
                                    <coneGeometry args={[0.8, 2.5, 32]} />
                                    <meshStandardMaterial color="#d4a574" roughness={0.8} />
                                </mesh>
                                {/* Ice cream scoop (hemisphere) */}
                                <mesh position={[0, 0.5, 0]}>
                                    <sphereGeometry args={[0.8, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                                    <meshStandardMaterial 
                                        color={hovered ? '#ec4899' : getColor()}
                                        roughness={0.3}
                                        metalness={0.1}
                                    />
                                </mesh>
                            </>
                        )}
                        
                        {compositeType === 'cone-in-cylinder' && (
                            <>
                                {/* Transparent cylinder container */}
                                <mesh>
                                    <cylinderGeometry args={[1.5, 1.5, 3, 32]} />
                                    <meshStandardMaterial
                                        color="#6366f1"
                                        transparent
                                        opacity={0.2}
                                        wireframe={false}
                                    />
                                </mesh>
                                {/* Cone inside */}
                                <mesh>
                                    <coneGeometry args={[1.5, 3, 32]} />
                                    <meshStandardMaterial 
                                        color={hovered ? '#ec4899' : getColor()} 
                                        roughness={0.6} 
                                    />
                                </mesh>
                            </>
                        )}
                        
                        {compositeType === 'double-cone' && (
                            <>
                                {/* First cone pointing up */}
                                <mesh position={[0, 1.2, 0]} rotation={[0, 0, 0]}>
                                    <coneGeometry args={[1, 2.4, 32]} />
                                    <meshStandardMaterial 
                                        color={hovered ? '#ec4899' : getColor()} 
                                        roughness={0.6} 
                                    />
                                </mesh>
                                {/* Second cone pointing down (rotated 180°) */}
                                <mesh position={[0, -1.2, 0]} rotation={[0, 0, Math.PI]}>
                                    <coneGeometry args={[1, 2.4, 32]} />
                                    <meshStandardMaterial 
                                        color={hovered ? '#ec4899' : getColor()} 
                                        roughness={0.6} 
                                    />
                                </mesh>
                            </>
                        )}
                        
                        {compositeType === 'spheres-in-cylinder' && (
                            <>
                                {/* Transparent cylinder container */}
                                <mesh>
                                    <cylinderGeometry args={[0.9, 0.9, 5.4, 32]} />
                                    <meshStandardMaterial
                                        color="#6366f1"
                                        transparent
                                        opacity={0.2}
                                        wireframe={false}
                                    />
                                </mesh>
                                {/* Three tennis balls stacked - use dynamic color */}
                                <mesh position={[0, -1.8, 0]}>
                                    <sphereGeometry args={[0.9, 32, 32]} />
                                    <meshStandardMaterial 
                                        color={hovered ? '#ec4899' : getColor()} 
                                        roughness={0.4} 
                                    />
                                </mesh>
                                <mesh position={[0, 0, 0]}>
                                    <sphereGeometry args={[0.9, 32, 32]} />
                                    <meshStandardMaterial 
                                        color={hovered ? '#ec4899' : getColor()} 
                                        roughness={0.4} 
                                    />
                                </mesh>
                                <mesh position={[0, 1.8, 0]}>
                                    <sphereGeometry args={[0.9, 32, 32]} />
                                    <meshStandardMaterial 
                                        color={hovered ? '#ec4899' : getColor()} 
                                        roughness={0.4} 
                                    />
                                </mesh>
                            </>
                        )}
                        
                        {compositeType === 'sphere-in-cube' && (
                            <>
                                {/* Outer transparent cube */}
                                <mesh>
                                    <boxGeometry args={[3, 3, 3]} />
                                    <meshStandardMaterial
                                        color="#6366f1"
                                        transparent
                                        opacity={0.15}
                                        wireframe={false}
                                    />
                                </mesh>
                                {/* Inner sphere */}
                                <mesh>
                                    <sphereGeometry args={[1.5, 32, 32]} />
                                    <meshStandardMaterial
                                        color={hovered ? '#ec4899' : getColor()}
                                        roughness={visualMode === 'party' ? 0.1 : 0.2}
                                        metalness={visualMode === 'party' ? 0.8 : 0.5}
                                    />
                                </mesh>
                            </>
                        )}

                        {compositeType === 'capsule' && (
                            <>
                                {(() => {
                                    const r = measurementDims?.radius ? measurementDims.radius * 0.2 : 1.5; // cm -> scene units (scale 0.2)
                                    const hBody = measurementDims?.bodyHeight ? measurementDims.bodyHeight * 0.2 : 3;
                                    const hemiOffset = hBody / 2;
                                    return (
                                        <>
                                            {/* Cylinder body */}
                                            <mesh position={[0, 0, 0]}>
                                                <cylinderGeometry args={[r, r, hBody, 32]} />
                                                <meshStandardMaterial
                                                    color={hovered ? '#ec4899' : getColor()}
                                                    roughness={0.4}
                                                />
                                            </mesh>
                                            {/* Top hemisphere */}
                                            <mesh position={[0, hemiOffset, 0]}>
                                                <sphereGeometry args={[r, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                                                <meshStandardMaterial
                                                    color={hovered ? '#ec4899' : getColor()}
                                                    roughness={0.4}
                                                />
                                            </mesh>
                                            {/* Bottom hemisphere */}
                                            <mesh position={[0, -hemiOffset, 0]} rotation={[Math.PI, 0, 0]}>
                                                <sphereGeometry args={[r, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                                                <meshStandardMaterial
                                                    color={hovered ? '#ec4899' : getColor()}
                                                    roughness={0.4}
                                                />
                                            </mesh>
                                        </>
                                    );
                                })()}
                            </>
                        )}

                        {compositeType === 'double-sphere' && (
                            <>
                                {(() => {
                                    // Keep ratio 1:2, but allow future scaling
                                    const rB = 1;
                                    const rA = 2;
                                    const gap = 0.7;
                                    return (
                                        <>
                                            {/* Smaller sphere (B) */}
                                            <mesh position={[-(rA + rB + gap), 0, 0]}>
                                                <sphereGeometry args={[rB, 32, 32]} />
                                                <meshStandardMaterial
                                                    color={hovered ? '#ec4899' : getColor()}
                                                    roughness={0.35}
                                                    metalness={0.2}
                                                />
                                            </mesh>
                                            {/* Larger sphere (A) radius 2x */}
                                            <mesh position={[rA + gap, 0, 0]}>
                                                <sphereGeometry args={[rA, 32, 32]} />
                                                <meshStandardMaterial
                                                    color={hovered ? '#ec4899' : getColor()}
                                                    roughness={0.35}
                                                    metalness={0.2}
                                                />
                                            </mesh>
                                        </>
                                    );
                                })()}
                            </>
                        )}
                        
                        {/* Add other composite types here as needed */}
                    </group>
                ) : (
                    // Regular single shape
                    <mesh
                        ref={meshRef}
                        onClick={() => setActive(!active)}
                        onPointerOver={() => setHover(true)}
                        onPointerOut={() => setHover(false)}
                        scale={topic?.toLowerCase() === 'ellipsoid' ? [1.5, 1, 1.2] : [1, 1, 1]}
                    >
                        {renderGeometry()}
                        <meshStandardMaterial
                            color={hovered ? '#ec4899' : getColor()}
                            roughness={visualMode === 'party' ? 0.1 : 0.2}
                            metalness={visualMode === 'party' ? 0.8 : 0.5}
                            wireframe={level >= 5 && visualMode !== 'party' && !highlight}
                            emissive={highlight ? "#f43f5e" : "#000000"}
                            emissiveIntensity={highlight ? 1 : 0}
                        />
                    </mesh>
                )}

                <MeasurementOverlay
                    topic={topic}
                    compositeType={compositeType}
                    hint={hint}
                    show={showMeasurements}
                    measurementDims={measurementDims}
                />
                </group>
            </PivotControls>
        </Float>
    );
}

export default function Math3D({
    topic = "cube",
    visualMode = "normal",
    highlight = false,
    showMeasurements = false,
    hint = "",
    questionId
}: {
    topic?: string,
    visualMode?: string,
    highlight?: boolean,
    showMeasurements?: boolean,
    hint?: string,
    questionId?: number
}) {
    const currentLevel = useLearningStore((state) => state.currentLevel);

    return (
        <div className="w-full h-full min-h-[400px]">
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }}>
                <color attach="background" args={["#ffffff"]} />
                
                {/* Grid floor */}
                <Grid 
                    args={[20, 20]} 
                    cellColor="#d1d5db" 
                    sectionColor="#9ca3af"
                    sectionSize={2}
                    fadeDistance={30}
                    fadeStrength={1}
                    position={[0, -3, 0]}
                />
                
                <Environment files="/env/potsdamer_platz_1k.hdr" background={false} />
                <ambientLight intensity={0.8} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={1} color="cyan" />

                <InteractiveShape
                    level={currentLevel}
                    topic={topic}
                    visualMode={visualMode}
                    highlight={highlight}
                    showMeasurements={showMeasurements}
                    hint={hint}
                    questionId={questionId}
                />

                <OrbitControls makeDefault enableZoom={true} />
            </Canvas>
        </div>
    );
}
