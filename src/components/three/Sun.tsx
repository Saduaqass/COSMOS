"use client";

import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export function Sun() {
  const texture = useTexture("/textures/sun.jpg");
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => { if (mesh.current) mesh.current.rotation.y += delta * 0.025; });
  return <group>
    <mesh ref={mesh}>
      <sphereGeometry args={[0.9, 48, 32]} />
      <meshBasicMaterial map={texture} color="#ffd9a1" />
    </mesh>
    <mesh scale={1.13}>
      <sphereGeometry args={[0.9, 32, 24]} />
      <meshBasicMaterial color="#ffad3f" transparent opacity={0.09} side={THREE.BackSide} />
    </mesh>
    <pointLight intensity={75} distance={18} color="#ffe6b0" />
  </group>;
}
