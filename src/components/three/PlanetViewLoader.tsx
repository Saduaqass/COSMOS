"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { PlanetSlug } from "@/data/solarObjects";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";
import { useTranslations } from "next-intl";

const PlanetView = dynamic(() => import("./PlanetView"), {
  ssr: false,
  loading: () => <Loading />,
});

function Loading() {
  const t = useTranslations("loading");
  return <div className="flex h-full items-center justify-center text-sm text-[#94A3B8]" role="status">{t("planet")}</div>;
}

export function PlanetViewLoader({ slug }: { slug: PlanetSlug }) {
  const t = useTranslations("loading");
  const [webgl, setWebgl] = useState<boolean | null>(null);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const frame = requestAnimationFrame(() => setWebgl(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"))));
    return () => cancelAnimationFrame(frame);
  }, []);
  if (webgl === false) return <div className="flex h-full items-center justify-center text-center text-sm text-[#94A3B8]" role="status">{t("webglPlanet")}</div>;
  if (!webgl) return <div className="flex h-full items-center justify-center text-sm text-[#94A3B8]" role="status">{t("preparing")}</div>;
  return <WebGLErrorBoundary label={t("errorPlanet")}><PlanetView slug={slug} /></WebGLErrorBoundary>;
}
