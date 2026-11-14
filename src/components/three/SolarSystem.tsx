"use client";

import { Suspense } from "react";
import { solarPlanets } from "@/data/solarObjects";
import { Orbit } from "./Orbit";
import { Planet } from "./Planet";
import { Sun } from "./Sun";
import { useUniverseStore } from "@/store/universe";
import { useTranslations } from "next-intl";

export function SolarSystem() {
  const showOrbits = useUniverseStore((state) => state.showOrbits);
  const t = useTranslations("planets");
  const celestial = useTranslations("celestial");
  return <group>
    <Suspense fallback={null}><Sun label={celestial("sun")} /></Suspense>
    {solarPlanets.map((body) => <group key={body.slug}>
      {showOrbits && <Orbit radius={body.radius} />}
      <Suspense fallback={null}><Planet body={body} label={t(`${body.slug}.name`)} moonLabel={celestial("moon")} /></Suspense>
    </group>)}
  </group>;
}
