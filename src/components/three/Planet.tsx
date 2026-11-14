"use client";

import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import type { SolarPlanet } from "@/data/solarObjects";

function Moon() {
  const texture = useTexture("/textures/moon.jpg");
  const orbit = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (orbit.current) orbit.current.rotation.y += delta * 0.65; });
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
  useFrame((_, delta) => {
    if (orbit.current) orbit.current.rotation.y += delta * body.orbitSpeed;
    if (surface.current) surface.current.rotation.y += delta * body.spinSpeed;
  });
  return <group ref={orbit} rotation={[0, body.initialAngle, 0]}>
    <group position={[body.radius, 0, 0]} rotation={[0, 0, body.axialTilt]}>
      <mesh ref={surface} name={body.name}>
        <sphereGeometry args={[body.size, 32, 24]} />
        <meshStandardMaterial map={texture} roughness={0.94} />
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
    </group>
  </group>;
}
