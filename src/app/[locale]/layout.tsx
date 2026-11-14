import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, isAppLocale, localeTags } from "@/i18n/routing";
import { LocaleProvider } from "@/components/layout/LocaleProvider";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")),
    title: t("title"),
    description: t("description"),
    openGraph: { locale: localeTags[locale].replace("-", "_"), siteName: "COSMOS" },
  };
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);
  return <html lang={localeTags[locale]} className="h-full antialiased">
    <body className="min-h-full flex flex-col">
      <LocaleProvider key={locale} initialLocale={locale}>
        {children}
        <SiteFooter />
      </LocaleProvider>
    </body>
  </html>;
}
