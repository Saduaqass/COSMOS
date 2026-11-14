import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AnimatedLogo } from "@/components/branding/AnimatedLogo";
import { Menu } from "lucide-react";

export function SiteHeader({ showAbout = true }: { showAbout?: boolean }) {
  const t = useTranslations("navigation");
  return (
    <header className="site-header">
      <AnimatedLogo href="/" variant="horizontal" subtitle={t("brandSubtitle")} ariaLabel={`COSMOS — ${t("home")}`} className="brand" />
      <div className="flex items-center gap-3 sm:gap-7">
        {showAbout && <nav aria-label={t("mainNavigation")} className="site-nav">
          <Link href="/planets">{t("planets")}</Link>
          <Link href="/#about">{t("about")}</Link>
        </nav>}
        {showAbout && <details className="site-mobile-nav">
          <summary aria-label={t("menu")}><Menu size={18} aria-hidden="true" /></summary>
          <nav aria-label={t("mainNavigation")}>
            <Link href="/planets">{t("planets")}</Link>
            <Link href="/#about">{t("about")}</Link>
          </nav>
        </details>}
        <LanguageSwitcher />
      </div>
    </header>
  );
}
