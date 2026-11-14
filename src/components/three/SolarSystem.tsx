"use client";

import { Suspense } from "react";
import { solarPlanets } from "@/data/solarObjects";
import { Orbit } from "./Orbit";
import { Planet } from "./Planet";
import { Sun } from "./Sun";

export function SolarSystem() {
  return <group>
    <Suspense fallback={null}><Sun /></Suspense>
    {solarPlanets.map((body) => <group key={body.slug}>
      <Orbit radius={body.radius} />
      <Suspense fallback={null}><Planet body={body} /></Suspense>
    </group>)}
  </group>;
}
