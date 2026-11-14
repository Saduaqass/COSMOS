"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { PlanetSlug } from "@/data/solarObjects";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";
import { useTranslations } from "next-intl";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <Loading />,
});

function Loading() {
  const t = useTranslations("loading");
  return <div className="flex h-full items-center justify-center text-sm text-[#94A3B8]" role="status">{t("universe")}</div>;
}

export function HeroSceneLoader({ explore, selected, onArrive }: { explore: boolean; selected: PlanetSlug | null; onArrive: () => void }) {
  const t = useTranslations("loading");
  const [available, setAvailable] = useState<boolean | null>(null);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const frame = requestAnimationFrame(() => setAvailable(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"))));
    return () => cancelAnimationFrame(frame);
  }, []);
  if (available === false) return <div className="flex h-full items-center justify-center px-6 text-center text-sm text-slate-400" role="status">{t("webglHome")}</div>;
  if (!available) return <div className="flex h-full items-center justify-center text-sm text-[#94A3B8]" role="status">{t("preparing")}</div>;
  return <WebGLErrorBoundary label={t("errorHome")}><HeroScene explore={explore} selected={selected} onArrive={onArrive} /></WebGLErrorBoundary>;
}
