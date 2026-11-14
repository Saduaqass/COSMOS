import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["kk", "ru", "en"],
  defaultLocale: "kk",
  localePrefix: "always",
  localeDetection: false,
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  },
});

export type AppLocale = (typeof routing.locales)[number];
export const locales = routing.locales;

export const localeTags: Record<AppLocale, string> = {
  kk: "kk-KZ",
  ru: "ru-RU",
  en: "en-US",
};

export function localizedAlternates(pathname: string, locale: AppLocale) {
  const path = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
  const suffix = path && path !== "/" ? path : "";
  return {
    canonical: `/${locale}${suffix}`,
    languages: { kk: `/kk${suffix}`, ru: `/ru${suffix}`, en: `/en${suffix}`, "x-default": `/kk${suffix}` },
  };
}

export function isAppLocale(locale: string): locale is AppLocale {
  return routing.locales.some((supported) => supported === locale);
}
