"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Stars, useTexture } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { solarPlanets, type PlanetSlug } from "@/data/solarObjects";
import { useUniverseStore } from "@/store/universe";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getRenderProfile } from "@/lib/renderQuality";
import { LoadingScreen } from "@/components/branding/LoadingScreen";
import { useTranslations } from "next-intl";

function Body({ slug }: { slug: PlanetSlug }) {
  const planet = solarPlanets.find((item) => item.slug === slug)!;
  const texture = useTexture(planet.texture);
  const surface = useRef<THREE.Mesh>(null);
  const quality = useUniverseStore((state) => state.quality);
  const segments = getRenderProfile(quality).detailSegments;
  const reducedMotion = useReducedMotion();
  useFrame((_, delta) => { if (surface.current && !reducedMotion) surface.current.rotation.y += delta * 0.08; });
  return <group rotation={[0, 0, planet.axialTilt]}>
    <mesh ref={surface}>
      <sphereGeometry args={[1.5, segments, Math.round(segments * 0.75)]} />
      <meshStandardMaterial map={texture} roughness={1} emissive={slug === "earth" ? "#142943" : "#000000"} emissiveIntensity={0.14} />
    </mesh>
    {slug === "earth" && <mesh scale={1.04}>
        <sphereGeometry args={[1.5, segments, Math.round(segments * 0.75)]} />
      <meshBasicMaterial color="#57baff" transparent opacity={0.07} side={THREE.BackSide} />
    </mesh>}
    {slug === "saturn" && <group rotation={[-1.1, 0, 0]}>
      {[
        { inner: 1.82, outer: 2.05, color: "#a79976", opacity: 0.42 },
        { inner: 2.08, outer: 2.34, color: "#d8c9a3", opacity: 0.72 },
        { inner: 2.39, outer: 2.64, color: "#b7a57f", opacity: 0.52 },
      ].map((ring) => <mesh key={ring.inner}>
        <ringGeometry args={[ring.inner, ring.outer, segments * 2]} />
        <meshStandardMaterial color={ring.color} side={THREE.DoubleSide} transparent opacity={ring.opacity} roughness={1} />
      </mesh>)}
    </group>}
  </group>;
}

export default function PlanetView({ slug }: { slug: PlanetSlug }) {
  const loading = useTranslations("loading");
  const quality = useUniverseStore((state) => state.quality);
  const profile = getRenderProfile(quality);
  const reducedMotion = useReducedMotion();
  return <Canvas camera={{ position: [0, 0, slug === "saturn" ? 7 : 5], fov: 45 }} dpr={[0.85, profile.dpr]} gl={{ antialias: true }} style={{ touchAction: "pan-y" }}>
    <ambientLight intensity={0.55} />
    <directionalLight position={[-4, 3, 5]} intensity={2.5} />
    <Suspense fallback={<Html center><LoadingScreen compact message={loading("planet")} /></Html>}><Body slug={slug} /></Suspense>
    <Stars radius={70} depth={30} count={profile.detailStars} factor={1.5} fade speed={reducedMotion ? 0 : 0.15} />
    <OrbitControls enablePan={false} minDistance={2.5} maxDistance={9} />
  </Canvas>;
}
