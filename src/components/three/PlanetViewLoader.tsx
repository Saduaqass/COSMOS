"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { PlanetSlug } from "@/data/solarObjects";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";

const PlanetView = dynamic(() => import("./PlanetView"), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center text-sm text-[#94A3B8]" role="status">Загружается 3D-модель…</div>,
});

export function PlanetViewLoader({ slug }: { slug: PlanetSlug }) {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const frame = requestAnimationFrame(() => setWebgl(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"))));
    return () => cancelAnimationFrame(frame);
  }, []);
  if (webgl === false) return <div className="flex h-full items-center justify-center text-center text-sm text-[#94A3B8]" role="status">WebGL недоступен в этом браузере. Научные характеристики и факты доступны ниже.</div>;
  if (!webgl) return <div className="flex h-full items-center justify-center text-sm text-[#94A3B8]" role="status">Подготовка 3D-сцены…</div>;
  return <WebGLErrorBoundary label="Не удалось загрузить модель планеты. Научные данные доступны ниже."><PlanetView slug={slug} /></WebGLErrorBoundary>;
}
