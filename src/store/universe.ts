import { create } from "zustand";
import type { PlanetSlug } from "@/data/solarObjects";

export type SimulationSpeed = 0 | 0.5 | 1 | 2 | 5;

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
  cameraResetToken: number;
  resetCamera: () => void;
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
  cameraResetToken: 0,
  resetCamera: () => set((state) => ({ selected: null, cameraResetToken: state.cameraResetToken + 1 })),
}));
