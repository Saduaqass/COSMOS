"use client";

import { useLocale, useTranslations } from "next-intl";
import { solarPlanets } from "@/data/solarObjects";
import { planetFacts, FACT_SHEET_URL, SATELLITE_SOURCE_URL, DATA_CHECKED_DATE } from "@/data/planetFacts";
import { PlanetViewLoader } from "@/components/three/PlanetViewLoader";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Link } from "@/i18n/navigation";
import { localeTags, type AppLocale } from "@/i18n/routing";

export function PlanetDetail({ slug }: { slug: string }) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations();
  const planet = solarPlanets.find((item) => item.slug === slug);
  if (!planet) return null;

  const facts = planetFacts[planet.slug];
  const index = solarPlanets.findIndex((item) => item.slug === planet.slug);
  const previous = solarPlanets[(index + solarPlanets.length - 1) % solarPlanets.length];
  const next = solarPlanets[(index + 1) % solarPlanets.length];
  const number = (value: number) => formatNumber(value, locale);
  const checkedDate = new Date(`${DATA_CHECKED_DATE}T00:00:00Z`);
  const localizedDate = new Intl.DateTimeFormat(localeTags[locale], { dateStyle: "long", timeZone: "UTC" }).format(checkedDate);
  const date = /M\d{1,2}/.test(localizedDate)
    ? formatDateFallback(checkedDate, locale, t.raw("dates.months") as string[])
    : locale === "ru" ? localizedDate.replace(/\.$/, "") : localizedDate;
  const name = t(`planets.${planet.slug}.name`);

  return <main className="min-h-screen bg-[#03050B] text-white">
    <SiteHeader showAbout={false} />
    <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-28 sm:px-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:gap-16">
      <section className="min-w-0 lg:sticky lg:top-8 lg:self-start">
        <p className="text-xs uppercase tracking-[.3em] text-[#57D9FF]">{t("planetPage.position", { current: index + 1 })}</p>
        <h1 className="mt-4 text-5xl font-light tracking-tight sm:text-7xl">{name}</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-[#94A3B8]">{t(`planets.${planet.slug}.summary`)}</p>
        <div className="mt-8 h-[360px] w-full min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_center,#0b2647,#03050B_70%)] sm:h-[520px]" role="region" aria-label={t("planetPage.model", { name })}>
          <PlanetViewLoader slug={planet.slug} />
        </div>
        <p className="mt-3 text-xs text-[#94A3B8]">{t("planetPage.modelHint")}</p>
      </section>
      <section className="min-w-0 pt-2 lg:pt-16">
        <h2 className="text-2xl font-light">{t("planetPage.factsTitle")}</h2>
        <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
          <Fact label={t("planetPage.diameter")} value={`${number(facts.diameterKm)} ${t("planetPage.kilometers")}`} />
          <Fact label={t("planetPage.distance")} value={`${number(facts.distanceMillionKm)} ${t("planetPage.millionKilometers")}`} />
          <Fact label={t("planetPage.rotation")} value={`${number(Math.abs(facts.rotationHours))} ${t("planetPage.hours")}${facts.rotationHours < 0 ? ` · ${t("planetPage.retrograde")}` : ""}`} />
          <Fact label={t("planetPage.orbital")} value={`${number(facts.orbitalDays)} ${t("planetPage.earthDays")}`} />
          <Fact label={t(index >= 4 ? "planetPage.temperatureOneBar" : "planetPage.temperatureSurface")} value={`${number(facts.meanTemperatureC)} ${t("planetPage.celsius")}`} />
          <Fact label={t("planetPage.moons")} value={number(facts.knownMoons)} />
        </dl>
        <p className="mt-3 text-xs leading-5 text-[#94A3B8]">{t("planetPage.satelliteNote", { date })}</p>
        <h2 className="mt-12 text-2xl font-light">{t("planetPage.interesting")}</h2>
        <ul className="mt-5 space-y-4 text-sm leading-7 text-[#CBD5E1]">
          {[0, 1].map((factIndex) => <li key={factIndex} className="border-l-2 border-[#246BFD] pl-4">{t(`planets.${planet.slug}.facts.${factIndex}`)}</li>)}
        </ul>
        <div className="mt-10 rounded-2xl border border-white/10 bg-[#071426]/60 p-5 text-xs leading-6 text-[#94A3B8]">
          <p>{t("planetPage.sources")}: <a className="text-[#57D9FF] underline" href={FACT_SHEET_URL} target="_blank" rel="noopener noreferrer">{t("planetPage.factSheet")}</a> · <a className="text-[#57D9FF] underline" href={SATELLITE_SOURCE_URL} target="_blank" rel="noopener noreferrer">{t("planetPage.satelliteSource")}</a> · <a className="text-[#57D9FF] underline" href={planet.nasaUrl} target="_blank" rel="noopener noreferrer">{t("planetPage.nasaFacts")}</a>.</p>
          <p className="mt-2">{t("planetPage.measurementNote", { date })}</p>
        </div>
        <nav aria-label={t("planetPage.otherPlanets")} className="mt-10 flex flex-wrap gap-3">
          <Link className="action-link action-link-secondary" href={`/planets/${previous.slug}`}>{t("planetPage.previous", { name: t(`planets.${previous.slug}.name`) })}</Link>
          <Link className="action-link action-link-primary" href={`/planets/${next.slug}`}>{t("planetPage.next", { name: t(`planets.${next.slug}.name`) })}</Link>
        </nav>
      </section>
    </div>
  </main>;
}

function formatDateFallback(date: Date, locale: AppLocale, months: string[]) {
  const day = new Intl.NumberFormat(localeTags[locale]).format(date.getUTCDate());
  const year = new Intl.NumberFormat(localeTags[locale], { useGrouping: false }).format(date.getUTCFullYear());
  const month = months[date.getUTCMonth()];
  if (locale === "en") return `${month} ${day}, ${year}`;
  if (locale === "ru") return `${day} ${month} ${year} г.`;
  return `${year} ж. ${day} ${month}`;
}

function formatNumber(value: number, locale: AppLocale) {
  const formatter = new Intl.NumberFormat(localeTags[locale], { maximumFractionDigits: 1 });
  const formatted = formatter.format(value);
  if (locale !== "kk" || formatter.format(1000).includes("\u00a0")) return formatted;

  const normalized = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1, useGrouping: false }).format(value);
  const [integer, fraction] = normalized.split(".");
  const groupedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
  return fraction ? `${groupedInteger},${fraction}` : groupedInteger;
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 py-4">
    <dt className="text-sm text-[#94A3B8]">{label}</dt>
    <dd className="text-right text-base font-medium tabular-nums">{value}</dd>
  </div>;
}
