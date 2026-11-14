import { create } from "zustand";
import type { PlanetSlug } from "@/data/solarObjects";

type UniverseState = {
  selected: PlanetSlug | null;
  selectPlanet: (slug: PlanetSlug | null) => void;
};

export const useUniverseStore = create<UniverseState>((set) => ({
  selected: null,
  selectPlanet: (slug) => set({ selected: slug }),
}));
