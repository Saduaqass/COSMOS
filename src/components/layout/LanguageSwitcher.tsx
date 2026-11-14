"use client";

import { useLocale, useTranslations } from "next-intl";
import { locales, type AppLocale } from "@/i18n/routing";
import { useActiveLocale } from "./LocaleProvider";

const labels: Record<AppLocale, string> = { kk: "ҚАЗ", ru: "РУС", en: "ENG" };

export function LanguageSwitcher() {
  const locale = useLocale() as AppLocale;
  const { setLocale } = useActiveLocale();
  const t = useTranslations("navigation");

  const switchLocale = (nextLocale: AppLocale) => {
    if (nextLocale === locale) return;
    const segments = window.location.pathname.split("/");
    segments[1] = nextLocale;
    window.history.replaceState(window.history.state, "", `${segments.join("/")}${window.location.search}${window.location.hash}`);
    setLocale(nextLocale);
    void fetch("/api/locale", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ locale: nextLocale }) });
  };

  return <div role="group" aria-label={t("language")} className="flex items-center gap-1 rounded-full border border-white/15 bg-[#071426]/70 p-1">
    {locales.map((option) => <button
      key={option}
      type="button"
      onClick={() => switchLocale(option)}
      aria-label={t(`languages.${option}`)}
      aria-pressed={locale === option}
      title={t(`languages.${option}`)}
      className={`min-h-9 rounded-full px-2.5 text-[.65rem] font-semibold tracking-wide transition-colors sm:px-3 sm:text-xs ${locale === option ? "bg-[#246BFD] text-white" : "text-[#94A3B8] hover:text-white"}`}
    >{labels[option]}</button>)}
  </div>;
}
