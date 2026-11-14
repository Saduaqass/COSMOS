"use client";

import { useFrame } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import type { SolarPlanet } from "@/data/solarObjects";
import { useUniverseStore } from "@/store/universe";

function Moon() {
  const texture = useTexture("/textures/moon.jpg");
  const orbit = useRef<THREE.Group>(null);
  const speed = useUniverseStore((state) => state.paused ? 0 : state.speed);
  useFrame((_, delta) => { if (orbit.current) orbit.current.rotation.y += delta * 0.65 * speed; });
  return <group ref={orbit}>
    <mesh position={[0.38, 0.02, 0]}>
      <sphereGeometry args={[0.055, 16, 12]} />
      <meshStandardMaterial map={texture} roughness={1} />
    </mesh>
  </group>;
}

export function Planet({ body }: { body: SolarPlanet }) {
  const texture = useTexture(body.texture);
  const orbit = useRef<THREE.Group>(null);
  const surface = useRef<THREE.Mesh>(null);
  const selected = useUniverseStore((state) => state.selected);
  const selectPlanet = useUniverseStore((state) => state.selectPlanet);
  const speed = useUniverseStore((state) => state.paused ? 0 : state.speed);
  const showLabels = useUniverseStore((state) => state.showLabels);
  const [hovered, setHovered] = useState(false);
  useFrame((_, delta) => {
    if (orbit.current && selected !== body.slug) orbit.current.rotation.y += delta * body.orbitSpeed * speed;
    if (surface.current) surface.current.rotation.y += delta * body.spinSpeed * speed;
  });
  return <group ref={orbit} rotation={[0, body.initialAngle, 0]}>
    <group position={[body.radius, 0, 0]} rotation={[0, 0, body.axialTilt]}>
      <mesh ref={surface} name={body.name} scale={hovered || selected === body.slug ? 1.15 : 1}
        onClick={(event) => { event.stopPropagation(); selectPlanet(body.slug); }}
        onPointerOver={(event) => { event.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = ""; }}>
        <sphereGeometry args={[body.size, 32, 24]} />
        <meshStandardMaterial map={texture} roughness={0.94} emissive={hovered ? "#57d9ff" : "#000000"} emissiveIntensity={0.35} />
      </mesh>
      {body.slug === "earth" && <>
        <mesh scale={1.08}>
          <sphereGeometry args={[body.size, 24, 16]} />
          <meshBasicMaterial color="#52baff" transparent opacity={0.12} side={THREE.BackSide} />
        </mesh>
        <Moon />
      </>}
      {body.slug === "saturn" && <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.56, 0.8, 64]} />
        <meshStandardMaterial color="#c7b68d" transparent opacity={0.72} side={THREE.DoubleSide} roughness={1} />
      </mesh>}
      {showLabels && <Html position={[0, body.size + 0.18, 0]} center style={{ pointerEvents: "none", whiteSpace: "nowrap", color: "#cbd5e1", fontSize: 11, textShadow: "0 1px 6px #03050b" }}>
        {body.name}
      </Html>}
    </group>
  </group>;
}
