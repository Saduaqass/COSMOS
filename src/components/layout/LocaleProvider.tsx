"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import type { AppLocale } from "@/i18n/routing";
import { localeTags } from "@/i18n/routing";
import kkMessages from "../../../messages/kk.json";
import ruMessages from "../../../messages/ru.json";
import enMessages from "../../../messages/en.json";
import { solarPlanets } from "@/data/solarObjects";

const messages = { kk: kkMessages, ru: ruMessages, en: enMessages };
type MessageTree = Record<string, unknown>;
function messageAt(locale: AppLocale, path: string) {
  const value = path.split(".").reduce<unknown>((node, key) => (node as MessageTree)[key], messages[locale]);
  return typeof value === "string" ? value : "";
}
const ActiveLocaleContext = createContext<{ setLocale: (locale: AppLocale) => void } | null>(null);

export function useActiveLocale() {
  const value = useContext(ActiveLocaleContext);
  if (!value) throw new Error("useActiveLocale must be used inside LocaleProvider");
  return value;
}

export function LocaleProvider({ initialLocale, children }: { initialLocale: AppLocale; children: ReactNode }) {
  const [locale, setLocale] = useState(initialLocale);

  return <ActiveLocaleContext.Provider value={{ setLocale }}>
    <NextIntlClientProvider locale={locale} messages={messages[locale]} timeZone="UTC">
      <LocaleMetadataSync locale={locale} />
      {children}
    </NextIntlClientProvider>
  </ActiveLocaleContext.Provider>;
}

function LocaleMetadataSync({ locale }: { locale: AppLocale }) {
  useEffect(() => {
    document.documentElement.lang = localeTags[locale];
    const segments = window.location.pathname.split("/").filter(Boolean).slice(1);
    const suffix = segments.length ? `/${segments.join("/")}` : "";
    let title = messageAt(locale, "metadata.title");
    let description = messageAt(locale, "metadata.description");

    if (segments[0] === "planets" && segments[1]) {
      const planet = solarPlanets.find((item) => item.slug === segments[1]);
      if (planet) {
        const name = messageAt(locale, `planets.${planet.slug}.name`);
        title = `${name} — COSMOS`;
        description = messageAt(locale, `planets.${planet.slug}.summary`);
      }
    } else if (segments[0] === "planets") {
      title = `${messageAt(locale, "planetIndex.title")} — COSMOS`;
      description = messageAt(locale, "planetIndex.description");
    }

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", localeTags[locale].replace("-", "_"));
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    canonical?.setAttribute("href", new URL(`/${locale}${suffix}`, window.location.origin).href);
    for (const alternate of ["kk", "ru", "en"] as const) {
      document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${alternate}"]`)?.setAttribute("href", new URL(`/${alternate}${suffix}`, window.location.origin).href);
    }
    document.querySelector<HTMLLinkElement>('link[rel="alternate"][hreflang="x-default"]')?.setAttribute("href", new URL(`/kk${suffix}`, window.location.origin).href);
  }, [locale]);

  return null;
}
