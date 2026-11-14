import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { isAppLocale, localizedAlternates, localeTags } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { PlanetsIndex } from "./PlanetsIndex";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  const t = await getTranslations({ locale });
  const title = `${t("planetIndex.title")} — COSMOS`;
  const description = t("planetIndex.description");
  return { title, description, alternates: localizedAlternates("/planets", locale), openGraph: { title, description, locale: localeTags[locale].replace("-", "_"), siteName: "COSMOS" } };
}

export default async function PlanetsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  return <PlanetsIndex />;
}
