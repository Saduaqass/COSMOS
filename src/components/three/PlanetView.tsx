"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { solarPlanets, type PlanetSlug } from "@/data/solarObjects";

function Body({ slug }: { slug: PlanetSlug }) {
  const planet = solarPlanets.find((item) => item.slug === slug)!;
  const texture = useTexture(planet.texture);
  const surface = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (surface.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) surface.current.rotation.y += delta * 0.08;
  });
  return <group rotation={[0, 0, planet.axialTilt]}>
    <mesh ref={surface}>
      <sphereGeometry args={[1.5, 64, 48]} />
      <meshStandardMaterial map={texture} roughness={1} emissive={slug === "earth" ? "#142943" : "#000000"} emissiveIntensity={0.14} />
    </mesh>
    {slug === "earth" && <mesh scale={1.04}>
      <sphereGeometry args={[1.5, 48, 32]} />
      <meshBasicMaterial color="#57baff" transparent opacity={0.07} side={THREE.BackSide} />
    </mesh>}
    {slug === "saturn" && <group rotation={[-1.1, 0, 0]}>
      {[
        { inner: 1.82, outer: 2.05, color: "#a79976", opacity: 0.42 },
        { inner: 2.08, outer: 2.34, color: "#d8c9a3", opacity: 0.72 },
        { inner: 2.39, outer: 2.64, color: "#b7a57f", opacity: 0.52 },
      ].map((ring) => <mesh key={ring.inner}>
        <ringGeometry args={[ring.inner, ring.outer, 96]} />
        <meshStandardMaterial color={ring.color} side={THREE.DoubleSide} transparent opacity={ring.opacity} roughness={1} />
      </mesh>)}
    </group>}
  </group>;
}

export default function PlanetView({ slug }: { slug: PlanetSlug }) {
  return <Canvas camera={{ position: [0, 0, slug === "saturn" ? 7 : 5], fov: 45 }} dpr={[1, 1.8]} gl={{ antialias: true }} style={{ touchAction: "none" }}>
    <ambientLight intensity={0.55} />
    <directionalLight position={[-4, 3, 5]} intensity={2.5} />
    <Suspense fallback={null}><Body slug={slug} /></Suspense>
    <Stars radius={70} depth={30} count={500} factor={1.5} fade />
    <OrbitControls enablePan={false} minDistance={2.5} maxDistance={9} />
  </Canvas>;
}
