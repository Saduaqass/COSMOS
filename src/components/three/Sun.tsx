"use client";

import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useUniverseStore } from "@/store/universe";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getRenderProfile } from "@/lib/renderQuality";

export function Sun() {
  const texture = useTexture("/textures/sun.jpg");
  const mesh = useRef<THREE.Mesh>(null);
  const speed = useUniverseStore((state) => state.paused ? 0 : state.speed);
  const quality = useUniverseStore((state) => state.quality);
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
  </group>;
}
