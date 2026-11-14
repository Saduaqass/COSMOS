"use client";

import { useFrame } from "@react-three/fiber";
import { Billboard, Text, useTexture } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import type { SolarPlanet } from "@/data/solarObjects";
import { useUniverseStore } from "@/store/universe";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getRenderProfile } from "@/lib/renderQuality";

function Moon({ label }: { label: string }) {
  const texture = useTexture("/textures/moon.jpg");
  const orbit = useRef<THREE.Group>(null);
  const speed = useUniverseStore((state) => state.paused ? 0 : state.speed);
  const quality = useUniverseStore((state) => state.quality);
  const reducedMotion = useReducedMotion();
  const showLabels = useUniverseStore((state) => state.showLabels);
  const segments = getRenderProfile(quality).segments;
  useFrame((_, delta) => { if (orbit.current && !reducedMotion) orbit.current.rotation.y += delta * 0.65 * speed; });
  return <group ref={orbit}>
    <mesh position={[0.38, 0.02, 0]}>
      <sphereGeometry args={[0.055, Math.max(12, segments - 8), Math.max(8, segments - 12)]} />
      <meshStandardMaterial map={texture} roughness={1} />
    </mesh>
    {showLabels && <Billboard position={[0.38, 0.13, 0]}><Text fontSize={0.045} color="#cbd5e1" outlineWidth={0.003} outlineColor="#03050b">{label}</Text></Billboard>}
  </group>;
}

export function Planet({ body, label, moonLabel }: { body: SolarPlanet; label: string; moonLabel: string }) {
  const texture = useTexture(body.texture);
  const orbit = useRef<THREE.Group>(null);
  const surface = useRef<THREE.Mesh>(null);
  const selected = useUniverseStore((state) => state.selected);
  const selectPlanet = useUniverseStore((state) => state.selectPlanet);
  const speed = useUniverseStore((state) => state.paused ? 0 : state.speed);
  const showLabels = useUniverseStore((state) => state.showLabels);
  const quality = useUniverseStore((state) => state.quality);
  const profile = getRenderProfile(quality);
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  useFrame((_, delta) => {
    if (!reducedMotion && orbit.current && selected !== body.slug) orbit.current.rotation.y += delta * body.orbitSpeed * speed;
    if (!reducedMotion && surface.current) surface.current.rotation.y += delta * body.spinSpeed * speed;
  }, -1);
  return <group ref={orbit} rotation={[0, body.initialAngle, 0]}>
    <group position={[body.radius, 0, 0]} rotation={[0, 0, body.axialTilt]}>
      <mesh ref={surface} name={`planet-${body.slug}`} scale={hovered || selected === body.slug ? 1.15 : 1}
        onClick={(event) => { event.stopPropagation(); selectPlanet(body.slug); }}
        onPointerOver={(event) => { event.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = ""; }}>
        <sphereGeometry args={[body.size, profile.segments, Math.round(profile.segments * 0.75)]} />
        <meshStandardMaterial map={texture} roughness={0.94} emissive={hovered ? "#57d9ff" : "#000000"} emissiveIntensity={0.35} />
      </mesh>
      {body.slug === "earth" && <>
        <mesh scale={1.08}>
          <sphereGeometry args={[body.size, profile.segments, Math.round(profile.segments * 0.75)]} />
          <meshBasicMaterial color="#52baff" transparent opacity={0.12} side={THREE.BackSide} />
        </mesh>
        <Moon label={moonLabel} />
      </>}
      {body.slug === "saturn" && <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.56, 0.8, 64]} />
        <meshStandardMaterial color="#c7b68d" transparent opacity={0.72} side={THREE.DoubleSide} roughness={1} />
      </mesh>}
      {showLabels && <Billboard position={[0, body.size + 0.24, 0]}>
        <Text fontSize={0.045} color="#cbd5e1" outlineWidth={0.003} outlineColor="#03050b" anchorX="center" anchorY="middle">
          {label}
        </Text>
      </Billboard>}
    </group>
  </group>;
}
