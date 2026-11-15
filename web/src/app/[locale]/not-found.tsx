"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("errors");
  return <main className="flex min-h-screen flex-col items-center justify-center bg-[#03050B] px-6 text-center text-white">
    <p className="text-xs uppercase tracking-[.3em] text-[#57D9FF]">COSMOS</p>
    <h1 className="mt-5 text-4xl font-light">{t("notFoundTitle")}</h1>
    <p className="mt-4 text-[#94A3B8]">{t("notFoundDescription")}</p>
    <Link className="action-link action-link-primary mt-8" href="/">{t("notFoundHome")}</Link>
  </main>;
}
