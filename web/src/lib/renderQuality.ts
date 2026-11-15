import type { RenderQuality } from "@/store/universe";

const profiles = {
  low: { dpr: 1, segments: 20, detailSegments: 32, stars: 400, detailStars: 240 },
  medium: { dpr: 1.4, segments: 32, detailSegments: 48, stars: 850, detailStars: 420 },
  high: { dpr: 1.75, segments: 48, detailSegments: 64, stars: 1400, detailStars: 700 },
} satisfies Record<RenderQuality, { dpr: number; segments: number; detailSegments: number; stars: number; detailStars: number }>;

export function getRenderProfile(quality: RenderQuality) {
  const profile = profiles[quality];
  const compact = typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;
  const constrained = typeof navigator !== "undefined" && (
    (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4) ||
    ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4
  );

  if (!compact && !constrained) return profile;

  return {
    ...profile,
    dpr: Math.min(profile.dpr, compact ? 1.2 : 1.35),
    segments: Math.min(profile.segments, 32),
    detailSegments: Math.min(profile.detailSegments, 48),
    stars: Math.round(profile.stars * 0.65),
    detailStars: Math.round(profile.detailStars * 0.65),
  };
}
