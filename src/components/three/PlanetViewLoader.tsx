"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { PlanetSlug } from "@/data/solarObjects";

const PlanetView = dynamic(() => import("./PlanetView"), { ssr: false });

export function PlanetViewLoader({ slug }: { slug: PlanetSlug }) {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const frame = requestAnimationFrame(() => setWebgl(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"))));
    return () => cancelAnimationFrame(frame);
  }, []);
  if (webgl === false) return <div className="flex h-full items-center justify-center text-sm text-[#94A3B8]" role="status">3D-модель недоступна в этом браузере</div>;
  if (!webgl) return <div className="h-full" aria-hidden="true" />;
  return <PlanetView slug={slug} />;
}
