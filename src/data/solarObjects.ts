export type PlanetSlug = "mercury" | "venus" | "earth" | "mars" | "jupiter" | "saturn" | "uranus" | "neptune";

export type SolarPlanet = {
  slug: PlanetSlug;
  radius: number;
  size: number;
  texture: string;
  orbitSpeed: number;
  spinSpeed: number;
  axialTilt: number;
  initialAngle: number;
  nasaUrl: string;
};

// Distances, sizes and speeds are adapted for visual exploration, not astronomical simulation.
export const solarPlanets: readonly SolarPlanet[] = [
  { slug: "mercury", radius: 2.1, size: 0.13, texture: "/textures/mercury.jpg", orbitSpeed: 0.28, spinSpeed: 0.07, axialTilt: 0.001, initialAngle: 0.2, nasaUrl: "https://science.nasa.gov/mercury/facts/" },
  { slug: "venus", radius: 2.8, size: 0.21, texture: "/textures/venus_atmosphere.jpg", orbitSpeed: 0.19, spinSpeed: -0.035, axialTilt: 3.09, initialAngle: 1.1, nasaUrl: "https://science.nasa.gov/venus/venus-facts/" },
  { slug: "earth", radius: 3.7, size: 0.22, texture: "/textures/earth-blue-marble.png", orbitSpeed: 0.15, spinSpeed: 0.3, axialTilt: 0.409, initialAngle: 2.0, nasaUrl: "https://science.nasa.gov/earth/facts/" },
  { slug: "mars", radius: 4.6, size: 0.17, texture: "/textures/mars.jpg", orbitSpeed: 0.12, spinSpeed: 0.28, axialTilt: 0.44, initialAngle: 2.9, nasaUrl: "https://science.nasa.gov/mars/facts/" },
  { slug: "jupiter", radius: 6.1, size: 0.5, texture: "/textures/jupiter.jpg", orbitSpeed: 0.075, spinSpeed: 0.55, axialTilt: 0.055, initialAngle: 3.8, nasaUrl: "https://science.nasa.gov/jupiter/jupiter-facts/" },
  { slug: "saturn", radius: 7.7, size: 0.42, texture: "/textures/saturn.jpg", orbitSpeed: 0.06, spinSpeed: 0.45, axialTilt: 0.466, initialAngle: 4.7, nasaUrl: "https://science.nasa.gov/saturn/facts/" },
  { slug: "uranus", radius: 9.1, size: 0.31, texture: "/textures/uranus.jpg", orbitSpeed: 0.045, spinSpeed: -0.36, axialTilt: 1.71, initialAngle: 5.6, nasaUrl: "https://science.nasa.gov/uranus/" },
  { slug: "neptune", radius: 10.5, size: 0.3, texture: "/textures/neptune.jpg", orbitSpeed: 0.035, spinSpeed: 0.35, axialTilt: 0.494, initialAngle: 0.8, nasaUrl: "https://science.nasa.gov/neptune/neptune-facts/" },
];
