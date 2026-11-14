"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { SolarSystem } from "./SolarSystem";
import { solarPlanets, type PlanetSlug } from "@/data/solarObjects";

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

function CameraRig({ explore, selected, onArrive }: { explore: boolean; selected: PlanetSlug | null; onArrive: () => void }) {
  const { camera, scene } = useThree();
  const target = useRef(new THREE.Vector3(-20, 0, 0));
  const previousSelected = useRef<PlanetSlug | null>(null);
  const [readyFor, setReadyFor] = useState<string>("hero");
  const [controlTarget, setControlTarget] = useState<[number, number, number]>([0, 0, 0]);
  const body = solarPlanets.find((planet) => planet.slug === selected);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 0 : 1.8;
    const nextKey = explore ? selected ?? "overview" : "hero";
    const timeline = gsap.timeline({ onComplete: () => { setControlTarget([target.current.x, target.current.y, target.current.z]); setReadyFor(nextKey); if (explore) onArrive(); } });
    const aim = (position: THREE.Vector3, look: THREE.Vector3, length: number) => {
      timeline.to(camera.position, { x: position.x, y: position.y, z: position.z, duration: length, ease: "power2.inOut", onUpdate: () => camera.lookAt(target.current) }, ">" );
      timeline.to(target.current, { x: look.x, y: look.y, z: look.z, duration: length, ease: "power2.inOut", onUpdate: () => camera.lookAt(target.current) }, "<");
    };
    if (explore && selected && previousSelected.current) {
      aim(new THREE.Vector3(0, 22, 32), new THREE.Vector3(0, 0, 0), reduced ? 0 : 1.1);
    }
    if (explore && selected) {
      const object = scene.getObjectByName(body?.name ?? "");
      if (object && body) {
        object.updateWorldMatrix(true, false);
        const planetPosition = object.getWorldPosition(new THREE.Vector3());
        const distance = Math.max(1.8, body.size * 5.5);
        aim(planetPosition.clone().add(new THREE.Vector3(0, distance * 0.32, distance)), planetPosition, duration);
      }
    } else if (explore) {
      aim(new THREE.Vector3(0, 22, 32), new THREE.Vector3(0, 0, 0), reduced ? 0 : 2.5);
    } else {
      aim(new THREE.Vector3(-20, 0, 7.5), new THREE.Vector3(-20, 0, 0), reduced ? 0 : 2.5);
    }
    previousSelected.current = selected;
    return () => { timeline.kill(); };
  }, [camera, scene, explore, selected, body, onArrive]);

  useFrame((state) => {
    if (!explore && !gsap.isTweening(state.camera.position)) {
      state.camera.position.x = -20 + Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
      state.camera.lookAt(target.current);
    }
  });
  const key = explore ? selected ?? "overview" : "hero";
  return readyFor === key && explore ? <OrbitControls
    target={controlTarget}
    minDistance={body ? Math.max(body.size * 2.4, 0.6) : 8}
    maxDistance={body ? 14 : 40}
    enablePan={false}
  /> : null;
}

useTexture.preload("/textures/earth-blue-marble.png");

export default function HeroScene({ explore, selected, onArrive }: { explore: boolean; selected: PlanetSlug | null; onArrive: () => void }) {
  return <Canvas camera={{ position: [-20, 0, 7.5], fov: 45, near: 0.1, far: 200 }} dpr={[1, 1.7]} gl={{ antialias: true, powerPreference: "high-performance" }}>
    <color attach="background" args={["#03050b"]} />
    <ambientLight intensity={0.8} />
    <directionalLight position={[-16, 3, 8]} intensity={3} color="#ffffff" />
    <Suspense fallback={null}><HeroEarth /></Suspense>
    <SolarSystem />
    <Stars radius={80} depth={40} count={1200} factor={2} saturation={0} fade speed={0.15} />
    <CameraRig explore={explore} selected={selected} onArrive={onArrive} />
  </Canvas>;
}
