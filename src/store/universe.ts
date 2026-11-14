import { create } from "zustand";
import type { PlanetSlug } from "@/data/solarObjects";
import { solarPlanets } from "@/data/solarObjects";

export type SimulationSpeed = 0 | 0.5 | 1 | 2 | 5;
export type RenderQuality = "low" | "medium" | "high";

type UniverseState = {
  selected: PlanetSlug | null;
  selectPlanet: (slug: PlanetSlug | null) => void;
  speed: SimulationSpeed;
  paused: boolean;
  setSpeed: (speed: SimulationSpeed) => void;
  togglePause: () => void;
  showOrbits: boolean;
  showLabels: boolean;
  showStars: boolean;
  toggleOrbits: () => void;
  toggleLabels: () => void;
  toggleStars: () => void;
  quality: RenderQuality;
  setQuality: (quality: RenderQuality) => void;
  cameraResetToken: number;
  resetCamera: () => void;
  travelActive: boolean;
  travelPaused: boolean;
  travelCompleted: boolean;
  startTravel: () => void;
  toggleTravelPause: () => void;
  advanceTravel: () => void;
  endTravel: () => void;
  completeTravel: () => void;
};

export const useUniverseStore = create<UniverseState>((set) => ({
  selected: null,
  selectPlanet: (slug) => set({ selected: slug }),
  speed: 1,
  paused: false,
  setSpeed: (speed) => set({ speed, paused: speed === 0 }),
  togglePause: () => set((state) => state.paused ? { paused: false, speed: state.speed === 0 ? 1 : state.speed } : { paused: true }),
  showOrbits: true,
  showLabels: true,
  showStars: true,
  toggleOrbits: () => set((state) => ({ showOrbits: !state.showOrbits })),
  toggleLabels: () => set((state) => ({ showLabels: !state.showLabels })),
  toggleStars: () => set((state) => ({ showStars: !state.showStars })),
  quality: "medium",
  setQuality: (quality) => set({ quality }),
  cameraResetToken: 0,
  resetCamera: () => set((state) => ({ selected: null, cameraResetToken: state.cameraResetToken + 1 })),
  travelActive: false,
  travelPaused: false,
  travelCompleted: false,
  startTravel: () => set({ travelActive: true, travelPaused: false, travelCompleted: false, selected: solarPlanets[0].slug }),
  toggleTravelPause: () => set((state) => ({ travelPaused: !state.travelPaused })),
  advanceTravel: () => set((state) => {
    const currentIndex = solarPlanets.findIndex((planet) => planet.slug === state.selected);
    const next = solarPlanets[(currentIndex + 1) % solarPlanets.length];
    return { selected: next.slug };
  }),
  endTravel: () => set({ travelActive: false, travelPaused: false, travelCompleted: false }),
  completeTravel: () => set({ travelActive: false, travelPaused: false, travelCompleted: true }),
}));
