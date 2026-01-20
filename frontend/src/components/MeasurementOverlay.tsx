"use client";

import { Html, Line } from "@react-three/drei";

interface MeasurementSpec {
    start: [number, number, number];
    end: [number, number, number];
    label: string;
}

interface MeasurementOverlayProps {
    topic: string;
    compositeType?: string;
    hint?: string;
    show?: boolean;
    measurementDims?: {
        radius?: number;
        diameter?: number;
        height?: number;
        side?: number;
        length?: number;
        width?: number;
        bodyHeight?: number;
        radiusA?: number;
        radiusB?: number;
        radiusOuter?: number;
        radiusInner?: number;
        unitLabel?: string;
        labelRadiusA?: string;
        labelRadiusB?: string;
    };
}

const accent = "#0ea5e9";

function MeasurementLabel({ position, text }: { position: [number, number, number]; text: string }) {
    return (
        <Html position={position} center className="pointer-events-none select-none">
            <div className="bg-slate-900/90 text-sky-200 px-2 py-1 rounded border border-sky-500/50 text-[10px] font-mono shadow-lg">
                {text}
            </div>
        </Html>
    );
}

function fmt(value?: number, unit?: string) {
    if (value === undefined) return "";
    return unit ? `${value}${unit}` : `${value}`;
}

function buildSpecs(topic: string, compositeType?: string, dims?: MeasurementOverlayProps["measurementDims"]): MeasurementSpec[] {
    const t = topic?.toLowerCase() || "";
    const unit = dims?.unitLabel || "u";

    const dLabel = (v?: number) => v !== undefined ? `${fmt(v, unit)}` : "";
    const hLabel = (v?: number) => v !== undefined ? `${fmt(v, unit)}` : "";
    const rLabel = (v?: number) => v !== undefined ? `${fmt(v, unit)}` : "";

    if (t === "composite" || t === "archimedes") {
        switch (compositeType) {
            case "ice-cream":
                return [
                    { start: [-0.8, -1.3, 1.1], end: [0.8, -1.3, 1.1], label: `d = ${dLabel(dims?.diameter ?? (2 * (dims?.radius ?? 0.8)))}` },
                    { start: [0, -2, 1.1], end: [0, 0.5, 1.1], label: `h = ${hLabel(dims?.height ?? 2.5)}` },
                    { start: [0, 0.5, 0], end: [0, 1.3, 0], label: `r = ${rLabel(dims?.radius ?? 0.8)}` },
                ];
            case "capsule":
                return [
                    { start: [-1.5, -1.9, 1.1], end: [1.5, -1.9, 1.1], label: `d = ${dLabel(dims?.diameter ?? (2 * (dims?.radius ?? 1.5)))}` },
                    { start: [0, -1.5, 1.1], end: [0, 1.5, 1.1], label: `h(body) = ${hLabel(dims?.bodyHeight ?? 3)}` },
                    { start: [0, 1.5, 0], end: [0, 3.0, 0], label: `r = ${rLabel(dims?.radius ?? 1.5)}` },
                ];
            case "double-sphere":
                return [
                    { start: [-3.2, -1.6, 1.2], end: [-1.2, -1.6, 1.2], label: dims?.labelRadiusB ?? `r_B = ${rLabel(dims?.radiusB ?? 1)}` },
                    { start: [1.5, -2.0, 1.2], end: [3.5, -2.0, 1.2], label: dims?.labelRadiusA ?? `r_A = ${rLabel(dims?.radiusA ?? 2)}` },
                ];
            case "double-cone":
                return [
                    { start: [-1, -2.6, 1.1], end: [1, -2.6, 1.1], label: `d = ${dLabel(dims?.diameter ?? (2 * (dims?.radius ?? 1)))}` },
                    { start: [0, -2.4, 1.1], end: [0, 0, 1.1], label: `t = ${hLabel(dims?.height ?? 2.4)}` },
                    { start: [0, 0, 1.1], end: [0, 2.4, 1.1], label: `t = ${hLabel(dims?.height ?? 2.4)}` },
                ];
            case "cone-in-cylinder":
                return [
                    { start: [-1.5, -1.7, 1.1], end: [1.5, -1.7, 1.1], label: `r = ${rLabel(dims?.radius ?? 1.5)}` },
                    { start: [0, -1.5, 1.1], end: [0, 1.5, 1.1], label: `h = ${hLabel(dims?.height ?? 3)}` },
                ];
            case "spheres-in-cylinder":
                return [
                    { start: [-0.9, -3, 1.2], end: [0.9, -3, 1.2], label: `d = ${dLabel(dims?.diameter ?? (2 * (dims?.radius ?? 0.9)))}` },
                    { start: [0, -2.7, 1.2], end: [0, 2.7, 1.2], label: `h = ${hLabel(dims?.height ?? 5.4)}` },
                ];
            case "sphere-in-cube":
            default:
                return [
                    { start: [-1.5, -1.9, 1.6], end: [1.5, -1.9, 1.6], label: `s = ${dLabel(dims?.side ?? (dims?.diameter ?? 3))}` },
                    { start: [0, -1.5, 1.6], end: [0, 1.5, 1.6], label: `d = ${dLabel(dims?.diameter ?? (dims?.side ?? 3))}` },
                ];
        }
    }

    switch (t) {
        case "cube":
            return [
                { start: [-1, -1.6, 1.2], end: [1, -1.6, 1.2], label: `s = ${dLabel(dims?.side ?? 2)}` },
                { start: [1.2, -1, 1.2], end: [1.2, 1, 1.2], label: `s = ${dLabel(dims?.side ?? 2)}` },
                { start: [1.2, -1.2, -1], end: [1.2, -1.2, 1], label: `s = ${dLabel(dims?.side ?? 2)}` },
            ];
        case "cuboid": {
            // Use actual dimensions for positioning measurement lines
            const w = dims?.length ? dims.length / 5 : 1;  // width in 3D space (length in real)
            const h = dims?.height ? dims.height / 5 : 1;  // height in 3D space
            const d = dims?.width ? dims.width / 5 : 1;    // depth in 3D space (width in real)
            const offset = 0.2;
            return [
                { start: [-w/2, -(h/2 + offset), d/2 + offset], end: [w/2, -(h/2 + offset), d/2 + offset], label: `p = ${dLabel(dims?.length)}` },
                { start: [w/2 + offset, -h/2, d/2 + offset], end: [w/2 + offset, h/2, d/2 + offset], label: `t = ${hLabel(dims?.height)}` },
                { start: [w/2 + offset, -(h/2 + offset), -d/2], end: [w/2 + offset, -(h/2 + offset), d/2], label: `l = ${dLabel(dims?.width)}` },
            ];
        }
        case "sphere":
        case "bola":
            return [
                { start: [-1.5, 1.8, 0], end: [1.5, 1.8, 0], label: `d = ${dLabel(dims?.diameter ?? (2 * (dims?.radius ?? 1.5)))}` },
            ];
        case "hemisphere":
            return [
                { start: [-1.5, -1.8, 0], end: [1.5, -1.8, 0], label: `d = ${dLabel(dims?.diameter ?? (2 * (dims?.radius ?? 1.5)))}` },
                { start: [0, 0, 0], end: [0, 1.5, 0], label: `r = ${rLabel(dims?.radius ?? 1.5)}` },
            ];
        case "cone":
        case "kerucut":
            return [
                { start: [-1.5, -1.9, 1.1], end: [1.5, -1.9, 1.1], label: `d = ${dLabel(dims?.diameter ?? (2 * (dims?.radius ?? 1.5)))}` },
                { start: [0, -1.5, 1.1], end: [0, 1.5, 1.1], label: `h = ${hLabel(dims?.height ?? 3)}` },
            ];
        case "frustum":
            return [
                { start: [-1.2, -1.7, 1.1], end: [1.2, -1.7, 1.1], label: `R = ${rLabel(dims?.radiusA ?? 1.2)}` },
                { start: [-0.6, 1.7, 1.1], end: [0.6, 1.7, 1.1], label: `r = ${rLabel(dims?.radiusB ?? 0.6)}` },
                { start: [0, -1.5, 1.1], end: [0, 1.5, 1.1], label: `h = ${hLabel(dims?.height ?? 3)}` },
            ];
        case "cylinder":
        case "tabung":
        case "cylindrical_shell":
            return [
                { start: [-1.5, -2.1, 1.1], end: [1.5, -2.1, 1.1], label: `d = ${dLabel(dims?.diameter ?? (2 * (dims?.radius ?? 1.5)))}` },
                { start: [0, -1.5, 1.1], end: [0, 1.5, 1.1], label: `h = ${hLabel(dims?.height ?? 3)}` },
            ];
        case "pyramid":
        case "limas":
            return [
                { start: [-1.5, -1.9, 1.1], end: [1.5, -1.9, 1.1], label: `s = ${dLabel(dims?.side ?? 3)}` },
                { start: [0, -1.5, 1.1], end: [0, 1.5, 1.1], label: `h = ${hLabel(dims?.height ?? 3)}` },
            ];
        case "torus":
        case "donat":
            return [
                { start: [0, 0, 0], end: [1.5, 0, 0], label: `R = ${rLabel(dims?.radiusOuter ?? 1.5)}` },
                { start: [0, 1.1, 0], end: [0, 1.6, 0], label: `r = ${rLabel(dims?.radiusInner ?? 0.5)}` },
            ];
        case "ellipsoid":
            return [
                { start: [-2.25, -1.6, 1.2], end: [2.25, -1.6, 1.2], label: `a = ${rLabel(dims?.width ?? 2.25)}` },
                { start: [0, -1.5, 1.2], end: [0, 1.5, 1.2], label: `b = ${hLabel(dims?.height ?? 1.5)}` },
                { start: [1.2, -1.2, -1.8], end: [1.2, -1.2, 1.8], label: `c = ${rLabel(dims?.length ?? 1.8)}` },
            ];
        default:
            return [];
    }
}

export default function MeasurementOverlay({ topic, compositeType, hint, show, measurementDims }: MeasurementOverlayProps) {
    if (!show) return null;

    const specs = buildSpecs(topic, compositeType, measurementDims);

    return (
        <group>
            {specs.map((spec, idx) => (
                <group key={idx}>
                    <Line points={[spec.start, spec.end]} color={accent} lineWidth={1.5} transparent opacity={0.7} />
                    <MeasurementLabel position={[
                        (spec.start[0] + spec.end[0]) / 2,
                        (spec.start[1] + spec.end[1]) / 2,
                        (spec.start[2] + spec.end[2]) / 2
                    ]} text={spec.label} />
                </group>
            ))}
            {hint && (
                <Html position={[0, 2.2, 0]} center className="pointer-events-none select-none">
                    <div className="bg-slate-900/90 text-teal-200 px-3 py-1 rounded border border-teal-500/50 text-xs font-mono shadow-xl">
                        {hint}
                    </div>
                </Html>
            )}
        </group>
    );
}
