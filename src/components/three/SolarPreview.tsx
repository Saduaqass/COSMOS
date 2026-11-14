"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const bodies = [
  { name: "Меркурий", radius: 2.1, size: 0.1, color: "#a79b8d", speed: 0.28 },
  { name: "Венера", radius: 2.8, size: 0.18, color: "#d5a579", speed: 0.19 },
  { name: "Земля", radius: 3.7, size: 0.19, color: "#3188c8", speed: 0.15 },
  { name: "Марс", radius: 4.6, size: 0.14, color: "#ba6243", speed: 0.12 },
  { name: "Юпитер", radius: 6.1, size: 0.46, color: "#c69c79", speed: 0.075 },
  { name: "Сатурн", radius: 7.7, size: 0.38, color: "#d1bc87", speed: 0.06 },
  { name: "Уран", radius: 9.1, size: 0.28, color: "#8bd2dc", speed: 0.045 },
  { name: "Нептун", radius: 10.5, size: 0.27, color: "#386ad1", speed: 0.035 },
] as const;

function Orbit({ radius }: { radius: number }) {
  const points = useMemo(() => Array.from({ length: 129 }, (_, i) => {
    const angle = i / 128 * Math.PI * 2;
    return new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
  }), [radius]);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  const material = useMemo(() => new THREE.LineBasicMaterial({ color: "#36506d", transparent: true, opacity: 0.45 }), []);
  const line = useMemo(() => new THREE.Line(geometry, material), [geometry, material]);
  useEffect(() => () => { geometry.dispose(); material.dispose(); }, [geometry, material]);
  return <primitive object={line} />;
}

function PreviewPlanet({ body, index }: { body: typeof bodies[number]; index: number }) {
  const pivot = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (pivot.current) pivot.current.rotation.y += delta * body.speed;
    if (mesh.current) mesh.current.rotation.y += delta * 0.3;
  });
  return <group ref={pivot} rotation={[0, index * 0.9, 0]}>
    <mesh ref={mesh} position={[body.radius, 0, 0]} name={body.name}>
      <sphereGeometry args={[body.size, 24, 16]} />
      <meshStandardMaterial color={body.color} roughness={0.9} />
    </mesh>
    {body.name === "Сатурн" && <mesh position={[body.radius, 0, 0]} rotation={[-Math.PI / 2.5, 0, 0]}>
      <ringGeometry args={[0.5, 0.7, 48]} />
      <meshBasicMaterial color="#b9a783" transparent opacity={0.7} side={THREE.DoubleSide} />
    </mesh>}
  </group>;
}

export function SolarPreview() {
  return <group>
    <mesh><sphereGeometry args={[0.9, 40, 32]} /><meshBasicMaterial color="#ffbd5e" /></mesh>
    <pointLight intensity={75} distance={18} color="#ffe6b0" />
    {bodies.map((body, index) => <group key={body.name}><Orbit radius={body.radius} /><PreviewPlanet body={body} index={index} /></group>)}
  </group>;
}
