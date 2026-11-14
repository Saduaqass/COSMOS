import { HomeExperience } from "@/components/layout/HomeExperience";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { isAppLocale, localizedAlternates, localeTags } from "@/i18n/routing";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("title"), description: t("description"), alternates: localizedAlternates("", locale), openGraph: { title: t("title"), description: t("description"), locale: localeTags[locale].replace("-", "_"), siteName: "COSMOS" } };
}

export default function Home() {
  return <HomeExperience />;
}
