import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { solarPlanets, type PlanetSlug } from "@/data/solarObjects";
import { planetFacts, FACT_SHEET_URL, SATELLITE_SOURCE_URL, DATA_CHECKED_DATE } from "@/data/planetFacts";
import { PlanetViewLoader } from "@/components/three/PlanetViewLoader";

export function generateStaticParams() {
  return solarPlanets.map((planet) => ({ slug: planet.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const planet = solarPlanets.find((item) => item.slug === slug);
  return { title: planet ? `${planet.name} — COSMOS` : "Планета — COSMOS", description: planet?.summary };
}

const number = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 });

export default function PlanetPage({ params }: { params: Promise<{ slug: string }> }) {
  return <Suspense fallback={<div className="min-h-screen bg-[#03050B] p-12 text-[#94A3B8]">Загрузка планеты…</div>}>
    <PlanetContent params={params} />
  </Suspense>;
}

async function PlanetContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const planet = solarPlanets.find((item) => item.slug === slug);
  if (!planet) notFound();
  const facts = planetFacts[slug as PlanetSlug];
  const index = solarPlanets.findIndex((item) => item.slug === slug);
  const previous = solarPlanets[(index + solarPlanets.length - 1) % solarPlanets.length];
  const next = solarPlanets[(index + 1) % solarPlanets.length];
  const isGiant = index >= 4;

  return <main className="min-h-screen bg-[#03050B] text-white">
    <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-8 sm:px-12">
      <Link href="/" className="brand">COSMOS <span>INTERACTIVE 3D UNIVERSE</span></Link>
      <Link href="/" className="text-sm text-[#94A3B8] hover:text-white">← На главную</Link>
    </header>
    <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 sm:px-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:gap-16">
      <section className="min-w-0 lg:sticky lg:top-8 lg:self-start">
        <p className="text-xs uppercase tracking-[.3em] text-[#57D9FF]">Планета {index + 1} / 8</p>
        <h1 className="mt-4 text-5xl font-light tracking-tight sm:text-7xl">{planet.name}</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-[#94A3B8]">{planet.summary}</p>
        <div className="mt-8 h-[360px] w-full min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_center,#0b2647,#03050B_70%)] sm:h-[520px]" role="region" aria-label={`Интерактивная 3D-модель планеты ${planet.name}`}>
          <PlanetViewLoader slug={planet.slug} />
        </div>
        <p className="mt-3 text-xs text-[#94A3B8]">Вращайте модель мышью или касанием. Визуальный масштаб условный.</p>
      </section>
      <section className="min-w-0 pt-2 lg:pt-16">
        <h2 className="text-2xl font-light">Основные характеристики</h2>
        <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
          <Fact label="Экваториальный диаметр" value={`${number.format(facts.diameterKm)} км`} />
          <Fact label="Среднее расстояние от Солнца" value={`${number.format(facts.distanceMillionKm)} млн км`} />
          <Fact label="Вращение вокруг оси" value={`${number.format(Math.abs(facts.rotationHours))} ч${facts.rotationHours < 0 ? " · ретроградное" : ""}`} />
          <Fact label="Орбитальный период" value={`${number.format(facts.orbitalDays)} земных суток`} />
          <Fact label={isGiant ? "Средняя температура на уровне 1 бар" : "Средняя температура поверхности"} value={`${number.format(facts.meanTemperatureC)} °C`} />
          <Fact label="Известные естественные спутники" value={number.format(facts.knownMoons)} />
        </dl>
        <p className="mt-3 text-xs leading-5 text-[#94A3B8]">Число спутников по таблице признанных IAU объектов JPL; проверено {DATA_CHECKED_DATE}. Оно может измениться после новых подтверждений.</p>
        <h2 className="mt-12 text-2xl font-light">Интересные факты</h2>
        <ul className="mt-5 space-y-4 text-sm leading-7 text-[#CBD5E1]">
          {facts.facts.map((fact) => <li key={fact} className="border-l-2 border-[#246BFD] pl-4">{fact}</li>)}
        </ul>
        <div className="mt-10 rounded-2xl border border-white/10 bg-[#071426]/60 p-5 text-xs leading-6 text-[#94A3B8]">
          <p>Источники данных: <a className="text-[#57D9FF] underline" href={FACT_SHEET_URL} target="_blank" rel="noopener noreferrer">NASA Planetary Fact Sheet</a> · <a className="text-[#57D9FF] underline" href={SATELLITE_SOURCE_URL} target="_blank" rel="noopener noreferrer">JPL, спутники</a> · <a className="text-[#57D9FF] underline" href={planet.nasaUrl} target="_blank" rel="noopener noreferrer">NASA, факты</a>.</p>
          <p className="mt-2">Диаметр указан по экватору; период вращения — относительно звёзд. Температура гигантов относится к атмосферному уровню 1 бар. Данные проверены {DATA_CHECKED_DATE}.</p>
        </div>
        <nav aria-label="Другие планеты" className="mt-10 flex flex-wrap gap-3">
          <Link className="action-link action-link-secondary" href={`/planets/${previous.slug}`}>← {previous.name}</Link>
          <Link className="action-link action-link-primary" href={`/planets/${next.slug}`}>{next.name} →</Link>
        </nav>
      </section>
    </div>
  </main>;
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 py-4">
    <dt className="text-sm text-[#94A3B8]">{label}</dt>
    <dd className="text-right text-base font-medium tabular-nums">{value}</dd>
  </div>;
}
