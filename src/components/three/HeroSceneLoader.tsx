"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { PlanetSlug } from "@/data/solarObjects";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center text-sm text-[#94A3B8]" role="status">Загружается 3D-вселенная…</div>,
});

export function HeroSceneLoader({ explore, selected, onArrive }: { explore: boolean; selected: PlanetSlug | null; onArrive: () => void }) {
  const [available, setAvailable] = useState<boolean | null>(null);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const frame = requestAnimationFrame(() => setAvailable(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"))));
    return () => cancelAnimationFrame(frame);
  }, []);
  if (available === false) return <div className="flex h-full items-center justify-center px-6 text-center text-sm text-slate-400" role="status">WebGL недоступен в этом браузере. Текстовые разделы и страницы планет остаются доступны.</div>;
  if (!available) return <div className="flex h-full items-center justify-center text-sm text-[#94A3B8]" role="status">Подготовка 3D-сцены…</div>;
  return <WebGLErrorBoundary label="Не удалось загрузить 3D-сцену. Обновите страницу или откройте сайт в другом браузере."><HeroScene explore={explore} selected={selected} onArrive={onArrive} /></WebGLErrorBoundary>;
}
