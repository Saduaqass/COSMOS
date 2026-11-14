"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, useTexture } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Earth() {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useTexture("/textures/earth-blue-marble.png");
  useFrame((state, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.045;
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.15;
    state.camera.lookAt(0, 0, 0);
  });
  return (
    <group>
      <mesh ref={mesh} rotation={[0.15, 0, 0]}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshStandardMaterial map={texture} roughness={1} metalness={0} />
      </mesh>
      <mesh scale={1.025}>
        <sphereGeometry args={[2.2, 48, 48]} />
        <meshBasicMaterial color="#4bb5ff" transparent opacity={0.075} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6.6], fov: 45 }} dpr={[1, 1.7]} gl={{ antialias: true, powerPreference: "high-performance" }} aria-label="Вращающаяся трёхмерная Земля">
      <color attach="background" args={["#03050b"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[-5, 2, 7]} intensity={2.8} color="#ffffff" />
      <Suspense fallback={null}><Earth /></Suspense>
      <Stars radius={80} depth={40} count={1200} factor={2} saturation={0} fade speed={0.15} />
    </Canvas>
  );
}
