import type { PlanetSlug } from "./solarObjects";

export type PlanetFacts = {
  diameterKm: number;
  distanceMillionKm: number;
  rotationHours: number;
  orbitalDays: number;
  meanTemperatureC: number;
  knownMoons: number;
  facts: readonly [string, string];
};

// Physical values: NASA NSSDCA Planetary Fact Sheet (metric), checked 2026-11-14.
// Moon counts: JPL IAU-recognized satellite discovery table, checked 2026-11-14.
export const planetFacts: Record<PlanetSlug, PlanetFacts> = {
  mercury: { diameterKm: 4879, distanceMillionKm: 57.9, rotationHours: 1407.6, orbitalDays: 88.0, meanTemperatureC: 167, knownMoons: 0, facts: ["Меркурий — ближайшая к Солнцу планета.", "Один оборот вокруг Солнца занимает около 88 земных суток."] },
  venus: { diameterKm: 12104, distanceMillionKm: 108.2, rotationHours: -5832.5, orbitalDays: 224.7, meanTemperatureC: 464, knownMoons: 0, facts: ["Венера вращается вокруг оси в направлении, противоположном большинству планет.", "Плотная атмосфера удерживает тепло и делает Венеру самой горячей планетой."] },
  earth: { diameterKm: 12756, distanceMillionKm: 149.6, rotationHours: 23.9, orbitalDays: 365.2, meanTemperatureC: 15, knownMoons: 1, facts: ["Большая часть поверхности Земли покрыта жидкой водой.", "Единственный естественный спутник Земли — Луна."] },
  mars: { diameterKm: 6792, distanceMillionKm: 228.0, rotationHours: 24.6, orbitalDays: 687.0, meanTemperatureC: -65, knownMoons: 2, facts: ["Красноватый цвет Марса связан с окислением минералов железа.", "Его естественные спутники — Фобос и Деймос."] },
  jupiter: { diameterKm: 142984, distanceMillionKm: 778.5, rotationHours: 9.9, orbitalDays: 4331, meanTemperatureC: -110, knownMoons: 115, facts: ["Юпитер — самая крупная планета Солнечной системы.", "В атмосфере видны полосы облаков и Большое красное пятно."] },
  saturn: { diameterKm: 120536, distanceMillionKm: 1432.0, rotationHours: 10.7, orbitalDays: 10747, meanTemperatureC: -140, knownMoons: 293, facts: ["Кольца Сатурна состоят преимущественно из частиц льда и камня.", "Титан — крупнейший спутник Сатурна."] },
  uranus: { diameterKm: 51118, distanceMillionKm: 2867.0, rotationHours: -17.2, orbitalDays: 30589, meanTemperatureC: -195, knownMoons: 29, facts: ["Ось Урана наклонена почти на 98° к перпендикуляру орбиты.", "У Урана есть система слабых колец."] },
  neptune: { diameterKm: 49528, distanceMillionKm: 4515.0, rotationHours: 16.1, orbitalDays: 59800, meanTemperatureC: -200, knownMoons: 16, facts: ["Нептун — самая дальняя от Солнца планета.", "Один оборот вокруг Солнца занимает около 165 земных лет."] },
};

export const FACT_SHEET_URL = "https://nssdc.gsfc.nasa.gov/planetary/factsheet/index.html";
export const SATELLITE_SOURCE_URL = "https://ssd.jpl.nasa.gov/sats/discovery.html";
export const DATA_CHECKED_DATE = "14.11.2026";
