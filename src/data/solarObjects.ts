export type PlanetSlug = "mercury" | "venus" | "earth" | "mars" | "jupiter" | "saturn" | "uranus" | "neptune";

export type SolarPlanet = {
  slug: PlanetSlug;
  name: string;
  radius: number;
  size: number;
  texture: string;
  orbitSpeed: number;
  spinSpeed: number;
  axialTilt: number;
  initialAngle: number;
};

// Distances, sizes and speeds are adapted for visual exploration, not astronomical simulation.
export const solarPlanets: readonly SolarPlanet[] = [
  { slug: "mercury", name: "Меркурий", radius: 2.1, size: 0.13, texture: "/textures/mercury.jpg", orbitSpeed: 0.28, spinSpeed: 0.07, axialTilt: 0.001, initialAngle: 0.2 },
  { slug: "venus", name: "Венера", radius: 2.8, size: 0.21, texture: "/textures/venus_atmosphere.jpg", orbitSpeed: 0.19, spinSpeed: -0.035, axialTilt: 3.09, initialAngle: 1.1 },
  { slug: "earth", name: "Земля", radius: 3.7, size: 0.22, texture: "/textures/earth-blue-marble.png", orbitSpeed: 0.15, spinSpeed: 0.3, axialTilt: 0.409, initialAngle: 2.0 },
  { slug: "mars", name: "Марс", radius: 4.6, size: 0.17, texture: "/textures/mars.jpg", orbitSpeed: 0.12, spinSpeed: 0.28, axialTilt: 0.44, initialAngle: 2.9 },
  { slug: "jupiter", name: "Юпитер", radius: 6.1, size: 0.5, texture: "/textures/jupiter.jpg", orbitSpeed: 0.075, spinSpeed: 0.55, axialTilt: 0.055, initialAngle: 3.8 },
  { slug: "saturn", name: "Сатурн", radius: 7.7, size: 0.42, texture: "/textures/saturn.jpg", orbitSpeed: 0.06, spinSpeed: 0.45, axialTilt: 0.466, initialAngle: 4.7 },
  { slug: "uranus", name: "Уран", radius: 9.1, size: 0.31, texture: "/textures/uranus.jpg", orbitSpeed: 0.045, spinSpeed: -0.36, axialTilt: 1.71, initialAngle: 5.6 },
  { slug: "neptune", name: "Нептун", radius: 10.5, size: 0.3, texture: "/textures/neptune.jpg", orbitSpeed: 0.035, spinSpeed: 0.35, axialTilt: 0.494, initialAngle: 0.8 },
];
