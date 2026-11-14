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

export const localeTags: Record<AppLocale, string> = {
  kk: "kk-KZ",
  ru: "ru-RU",
  en: "en-US",
};

export function isAppLocale(locale: string): locale is AppLocale {
  return routing.locales.some((supported) => supported === locale);
}
