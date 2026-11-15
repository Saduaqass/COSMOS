"use client";

import { useTranslations } from "next-intl";
import { CosmosLogo } from "./CosmosLogo";

export function LoadingScreen({ message, compact = false }: { message?: string; compact?: boolean }) {
  const t = useTranslations("navigation");
  const loading = useTranslations("loading");
  return <div className={`cosmos-loading ${compact ? "cosmos-loading--compact" : ""}`} role="status" aria-live="polite">
    <CosmosLogo variant="horizontal" subtitle={t("brandSubtitle")} ariaLabel="COSMOS" className="cosmos-loading__logo" />
    <span className="cosmos-loading__orbit" aria-hidden="true" />
    <span className="cosmos-loading__message">{message ?? loading("journey")}</span>
  </div>;
}
