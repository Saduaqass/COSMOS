"use client";

import { Suspense } from "react";
import { solarPlanets } from "@/data/solarObjects";
import { Orbit } from "./Orbit";
import { Planet } from "./Planet";
import { Sun } from "./Sun";
import { useUniverseStore } from "@/store/universe";

export function SolarSystem() {
  const showOrbits = useUniverseStore((state) => state.showOrbits);
  return <group>
    <Suspense fallback={null}><Sun /></Suspense>
    {solarPlanets.map((body) => <group key={body.slug}>
      {showOrbits && <Orbit radius={body.radius} />}
      <Suspense fallback={null}><Planet body={body} /></Suspense>
    </group>)}
  </group>;
}
