import { HomeExperience } from "@/components/layout/HomeExperience";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { isAppLocale, localizedAlternates, localeTags } from "@/i18n/routing";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("title"), description: t("description"), alternates: localizedAlternates("", locale), openGraph: { title: t("title"), description: t("description"), locale: localeTags[locale].replace("-", "_"), siteName: "COSMOS", images: [{ url: "/branding/cosmos-og.jpg", width: 1200, height: 630, alt: t("title") }] } };
}

export default function Home() {
  return <HomeExperience />;
}
