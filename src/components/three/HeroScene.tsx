"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { SolarSystem } from "./SolarSystem";

function HeroEarth() {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useTexture("/textures/earth-blue-marble.png");
  useFrame((_, delta) => { if (mesh.current) mesh.current.rotation.y += delta * 0.045; });
  return <group position={[-20, 0, 0]}>
    <mesh ref={mesh} rotation={[0.15, 0, 0]}>
      <sphereGeometry args={[1.6, 64, 64]} />
      <meshStandardMaterial map={texture} emissiveMap={texture} emissive="#ffffff" emissiveIntensity={0.25} roughness={1} metalness={0} />
    </mesh>
    <mesh scale={1.07}>
      <sphereGeometry args={[1.6, 48, 48]} />
      <meshBasicMaterial color="#4bb5ff" transparent opacity={0.08} side={THREE.BackSide} />
    </mesh>
  </group>;
}

function CameraRig({ explore, onArrive }: { explore: boolean; onArrive: () => void }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(-20, 0, 0));
  const [controlsReady, setControlsReady] = useState(false);
  useEffect(() => {
    const destination = explore ? { x: 0, y: 22, z: 32 } : { x: -20, y: 0, z: 7.5 };
    const look = explore ? { x: 0, y: 0, z: 0 } : { x: -20, y: 0, z: 0 };
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 2.5;
    const timeline = gsap.timeline({ onComplete: () => { setControlsReady(explore); if (explore) onArrive(); } });
    timeline.to(camera.position, { ...destination, duration, ease: "power2.inOut", onUpdate: () => camera.lookAt(target.current) }, 0);
    timeline.to(target.current, { ...look, duration, ease: "power2.inOut", onUpdate: () => camera.lookAt(target.current) }, 0);
    return () => { timeline.kill(); };
  }, [camera, explore, onArrive]);
  useFrame((state) => {
    if (!explore && !gsap.isTweening(state.camera.position)) {
      state.camera.position.x = -20 + Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
      state.camera.lookAt(target.current);
    }
  });
  return controlsReady && explore ? <OrbitControls target={[0, 0, 0]} minDistance={8} maxDistance={40} enablePan={false} /> : null;
}

useTexture.preload("/textures/earth-blue-marble.png");

export default function HeroScene({ explore, onArrive }: { explore: boolean; onArrive: () => void }) {
  return <Canvas camera={{ position: [-20, 0, 7.5], fov: 45, near: 0.1, far: 200 }} dpr={[1, 1.7]} gl={{ antialias: true, powerPreference: "high-performance" }}>
    <color attach="background" args={["#03050b"]} />
    <ambientLight intensity={0.8} />
    <directionalLight position={[-16, 3, 8]} intensity={3} color="#ffffff" />
    <Suspense fallback={null}><HeroEarth /></Suspense>
    <SolarSystem />
    <Stars radius={80} depth={40} count={1200} factor={2} saturation={0} fade speed={0.15} />
    <CameraRig explore={explore} onArrive={onArrive} />
  </Canvas>;
}
