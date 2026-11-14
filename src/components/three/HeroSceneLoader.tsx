"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export function HeroSceneLoader() {
  const [available, setAvailable] = useState<boolean | null>(null);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const frame = requestAnimationFrame(() => setAvailable(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"))));
    return () => cancelAnimationFrame(frame);
  }, []);
  if (available === false) return <div className="flex h-full items-center justify-center text-sm text-slate-400" role="status">3D недоступно в этом браузере</div>;
  if (!available) return <div className="h-full" aria-hidden="true" />;
  return <HeroScene />;
}
