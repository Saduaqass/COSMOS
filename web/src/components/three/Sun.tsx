"use client";

import { useFrame } from "@react-three/fiber";
import { Billboard, Text, useTexture } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getRenderProfile } from "@/lib/renderQuality";
import { useUniverseStore } from "@/store/universe";

export function Sun({ label }: { label: string }) {
  const texture = useTexture("/textures/sun.jpg");
  const mesh = useRef<THREE.Mesh>(null);
  const speed = useUniverseStore((state) => state.paused ? 0 : state.speed);
  const quality = useUniverseStore((state) => state.quality);
  const showLabels = useUniverseStore((state) => state.showLabels);
  const reducedMotion = useReducedMotion();
  const segments = getRenderProfile(quality).segments;
  useFrame((_, delta) => { if (mesh.current && !reducedMotion) mesh.current.rotation.y += delta * 0.025 * speed; });
  return <group>
    <mesh ref={mesh}>
      <sphereGeometry args={[0.9, segments, Math.round(segments * 0.67)]} />
      <meshBasicMaterial map={texture} color="#ffd9a1" />
    </mesh>
    <mesh scale={1.13}>
      <sphereGeometry args={[0.9, segments, Math.round(segments * 0.67)]} />
      <meshBasicMaterial color="#ffad3f" transparent opacity={0.09} side={THREE.BackSide} />
    </mesh>
    <pointLight intensity={75} distance={18} color="#ffe6b0" />
    {showLabels && <Billboard position={[0, 1.28, 0]}><Text fontSize={0.11} color="#ffe6b0" outlineWidth={0.006} outlineColor="#03050b">{label}</Text></Billboard>}
  </group>;
}
