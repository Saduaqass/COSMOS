"use client";

import { useTranslations } from "next-intl";
import { solarPlanets } from "@/data/solarObjects";
import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function PlanetsIndex() {
  const t = useTranslations();
  return <main className="min-h-screen bg-[#03050B] px-6 pb-20 pt-32 text-white sm:px-12">
    <SiteHeader showAbout={false} />
    <div className="mx-auto max-w-7xl">
      <p className="text-xs uppercase tracking-[.3em] text-[#57D9FF]">{t("planetIndex.eyebrow")}</p>
      <h1 className="mt-4 text-5xl font-light tracking-tight sm:text-7xl">{t("planetIndex.title")}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-[#94A3B8]">{t("planetIndex.description")}</p>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {solarPlanets.map((planet, index) => <li key={planet.slug}>
          <Link href={`/planets/${planet.slug}`} className="group block h-full rounded-2xl border border-white/10 bg-[#071426]/70 p-5 transition-colors hover:border-[#57D9FF]/60">
            <span className="text-xs tracking-[.2em] text-[#57D9FF]">{String(index + 1).padStart(2, "0")}</span>
            <h2 className="mt-4 text-2xl font-light">{t(`planets.${planet.slug}.name`)}</h2>
            <p className="mt-3 min-h-14 text-sm leading-6 text-[#94A3B8]">{t(`planets.${planet.slug}.summary`)}</p>
            <span className="mt-5 inline-block text-sm text-[#57D9FF]">{t("planetIndex.explore")}</span>
          </Link>
        </li>)}
      </ul>
    </div>
  </main>;
}
