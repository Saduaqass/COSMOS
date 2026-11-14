import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { solarPlanets } from "@/data/solarObjects";
import { isAppLocale, localeTags, localizedAlternates } from "@/i18n/routing";
import { PlanetDetail } from "./PlanetDetail";

export function generateStaticParams() {
  return solarPlanets.map((planet) => ({ slug: planet.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const planet = solarPlanets.find((item) => item.slug === slug);
  if (!planet || !isAppLocale(locale)) notFound();
  const t = await getTranslations({ locale });
  const title = `${t(`planets.${slug}.name`)} — COSMOS`;
  const description = t(`planets.${slug}.summary`);
  return {
    title,
    description,
    alternates: localizedAlternates(`/planets/${slug}`, locale),
    openGraph: { title, description, locale: localeTags[locale].replace("-", "_"), siteName: "COSMOS", type: "article" },
  };
}

export default async function PlanetPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const planet = solarPlanets.find((item) => item.slug === slug);
  if (!planet || !isAppLocale(locale)) notFound();

  return <PlanetDetail slug={planet.slug} />;
}
