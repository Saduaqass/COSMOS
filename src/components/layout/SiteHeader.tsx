import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function SiteHeader({ showAbout = true }: { showAbout?: boolean }) {
  const t = useTranslations("navigation");
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label={`COSMOS — ${t("home")}`}>
        COSMOS <span>{t("brandSubtitle")}</span>
      </Link>
      <div className="flex items-center gap-3 sm:gap-7">
        {showAbout && <nav aria-label={t("mainNavigation")} className="site-nav">
          <Link href="/planets">{t("planets")}</Link>
          <Link href="/#about">{t("about")}</Link>
        </nav>}
        <LanguageSwitcher />
      </div>
    </header>
  );
}
