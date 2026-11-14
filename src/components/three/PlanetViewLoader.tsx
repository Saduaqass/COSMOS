"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { PlanetSlug } from "@/data/solarObjects";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";
import { useTranslations } from "next-intl";
import { LoadingScreen } from "@/components/branding/LoadingScreen";

const PlanetView = dynamic(() => import("./PlanetView"), {
  ssr: false,
  loading: () => <Loading />,
});

function Loading() {
  const t = useTranslations("loading");
  return <LoadingScreen compact message={t("planet")} />;
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
  if (!webgl) return <LoadingScreen compact message={t("preparing")} />;
  return <WebGLErrorBoundary label={t("errorPlanet")}><PlanetView slug={slug} /></WebGLErrorBoundary>;
}
