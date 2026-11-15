"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AnimatedLogo } from "@/components/branding/AnimatedLogo";

export function SiteFooter() {
  const t = useTranslations("footer");
  const nav = useTranslations("navigation");
  return <footer className="site-footer">
    <div className="site-footer__top">
      <AnimatedLogo href="/" variant="horizontal" subtitle={nav("brandSubtitle")} ariaLabel={`COSMOS — ${nav("home")}`} className="site-footer__logo" />
      <nav aria-label={nav("mainNavigation")} className="site-footer__nav">
        <Link href="/">{nav("home")}</Link>
        <Link href="/planets">{nav("planets")}</Link>
        <Link href="/#about">{nav("about")}</Link>
      </nav>
    </div>
    <div className="site-footer__bottom">
      <span>{t("tagline")}</span>
      <span>{t("copyright")}</span>
    </div>
  </footer>;
}
