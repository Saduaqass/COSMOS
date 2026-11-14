"use client";

import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("footer");
  return <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#03050B] px-6 py-6 text-xs text-[#94A3B8] sm:px-12">
    <span>{t("tagline")}</span>
    <span>{t("copyright")}</span>
  </footer>;
}
