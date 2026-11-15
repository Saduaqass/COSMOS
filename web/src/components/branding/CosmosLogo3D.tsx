"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { brand } from "@/lib/brand";

type Props = { position?: [number, number, number]; scale?: number; visible?: boolean };

function createCGeometry() {
  const shape = new THREE.Shape();
  const outer = 1;
  const inner = 0.62;
  const start = Math.PI * 0.205;
  const end = Math.PI * 1.795;
  shape.absarc(0, 0, outer, start, end, false);
  shape.lineTo(Math.cos(end) * inner, Math.sin(end) * inner);
  shape.absarc(0, 0, inner, end, start, true);
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.24,
    bevelEnabled: true,
    bevelSegments: 4,
    bevelSize: 0.055,
    bevelThickness: 0.055,
    curveSegments: 48,
  });
  geometry.translate(0, 0, -0.12);
  geometry.computeVertexNormals();
  return geometry;
}

export function CosmosLogo3D({ position = [0, 0, 0], scale = 1, visible = true }: Props) {
  const root = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();
  const width = useThree((state) => state.size.width);
  const responsiveScale = width < 600 ? 0.68 : 1;
  const geometry = useMemo(() => createCGeometry(), []);
  const metal = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: brand.colors.silver,
    metalness: 0.82,
    roughness: 0.28,
    clearcoat: 0.9,
    clearcoatRoughness: 0.18,
    emissive: brand.colors.deepNavy,
    emissiveIntensity: 0.55,
  }), []);

  useFrame(({ clock }, delta) => {
    if (!root.current || !visible) return;
    if (!reducedMotion) {
      root.current.rotation.y += delta * (hovered ? 0.16 : 0.055);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, hovered ? -0.08 : 0.035, 2.5, delta);
      if (ring.current) ring.current.rotation.z += delta * (hovered ? 0.25 : 0.11);
      const pulse = 1 + Math.sin(clock.elapsedTime * 1.25) * 0.045;
      core.current?.scale.setScalar(pulse);
    }
    const targetScale = scale * responsiveScale * (hovered ? 1.055 : 1);
    const currentScale = root.current.scale.x;
    const nextScale = THREE.MathUtils.damp(currentScale, targetScale, 5, delta);
    root.current.scale.setScalar(nextScale);
  });

  return <group ref={root} position={position} scale={scale * responsiveScale} visible={visible}>
    <mesh geometry={geometry} material={metal} onPointerOver={(event) => { event.stopPropagation(); setHovered(true); }} onPointerOut={() => setHovered(false)} />
    <group ref={ring} rotation={[1.12, 0.12, -0.18]}>
      <mesh>
        <torusGeometry args={[1.27, 0.027, 10, 144]} />
        <meshStandardMaterial color={brand.colors.silver} metalness={0.78} roughness={0.22} emissive={brand.colors.cosmicBlue} emissiveIntensity={0.22} />
      </mesh>
      <mesh position={[1.27, 0, 0]}>
        <sphereGeometry args={[0.075, 16, 12]} />
        <meshBasicMaterial color="#DDF8FF" toneMapped={false} />
      </mesh>
    </group>
    <mesh ref={core} position={[0, 0, 0.24]}>
      <sphereGeometry args={[0.235, 32, 24]} />
      <meshStandardMaterial color={brand.colors.electricCyan} metalness={0.35} roughness={0.16} emissive={brand.colors.cosmicBlue} emissiveIntensity={2.1} toneMapped={false} />
    </mesh>
    <mesh position={[0, 0, 0.24]} scale={1.75}>
      <sphereGeometry args={[0.235, 24, 18]} />
      <meshBasicMaterial color={brand.colors.electricCyan} transparent opacity={0.1} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
    </mesh>
    <pointLight position={[0, 0, 0.9]} color={brand.colors.electricCyan} intensity={1.8} distance={3.4} decay={2} />
  </group>;
}
