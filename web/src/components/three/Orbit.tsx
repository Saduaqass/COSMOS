"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";

export function Orbit({ radius }: { radius: number }) {
  const geometry = useMemo(() => {
    const points = Array.from({ length: 129 }, (_, i) => {
      const angle = i / 128 * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    });
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);
  const material = useMemo(() => new THREE.LineBasicMaterial({ color: "#36506d", transparent: true, opacity: 0.45 }), []);
  const line = useMemo(() => new THREE.Line(geometry, material), [geometry, material]);
  useEffect(() => () => { geometry.dispose(); material.dispose(); }, [geometry, material]);
  return <primitive object={line} />;
}
