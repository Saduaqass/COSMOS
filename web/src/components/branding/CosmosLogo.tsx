import { Link } from "@/i18n/navigation";
import { useId } from "react";

type Props = {
  href?: string;
  ariaLabel?: string;
  subtitle?: string;
  variant?: "horizontal" | "symbol";
  monochrome?: boolean;
  className?: string;
};

function Mark({ monochrome = false, className = "" }: { monochrome?: boolean; className?: string }) {
  const id = useId().replaceAll(":", "");
  return <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={`${id}-metal`} x1="27" y1="22" x2="88" y2="99" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff" /><stop offset=".42" stopColor={monochrome ? "#fff" : "#b8c6d9"} /><stop offset="1" stopColor={monochrome ? "#fff" : "#58718e"} />
      </linearGradient>
      <linearGradient id={`${id}-orbit`} x1="14" y1="83" x2="105" y2="34" gradientUnits="userSpaceOnUse">
        <stop stopColor={monochrome ? "#fff" : "#246bfd"} /><stop offset=".55" stopColor={monochrome ? "#fff" : "#b8c6d9"} /><stop offset="1" stopColor={monochrome ? "#fff" : "#57d9ff"} />
      </linearGradient>
      <radialGradient id={`${id}-core`} cx="0" cy="0" r="1" gradientTransform="matrix(9 12 -12 9 57 46)" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff" /><stop offset=".38" stopColor={monochrome ? "#fff" : "#8debff"} /><stop offset="1" stopColor={monochrome ? "#fff" : "#246bfd"} />
      </radialGradient>
    </defs>
    <g className="cosmos-logo__mark">
      <path d="M82.2 31.7A36.5 36.5 0 1 0 82.2 88.3L72 77.8A21.8 21.8 0 1 1 72 42.2L82.2 31.7Z" fill={`url(#${id}-metal)`} stroke={monochrome ? "#fff" : "#eaf4ff"} strokeOpacity={monochrome ? 1 : 0.24} strokeWidth="1.5" />
      <ellipse cx="60" cy="60" rx="48" ry="20" transform="rotate(-31 60 60)" stroke={`url(#${id}-orbit)`} strokeWidth="3.4" />
      <circle cx="60" cy="60" r="14" fill={monochrome ? "#fff" : "#57d9ff"} opacity=".22" />
      <circle cx="60" cy="60" r="8.5" fill={`url(#${id}-core)`} stroke={monochrome ? "#fff" : "#e9fbff"} strokeOpacity={monochrome ? 1 : 0.82} strokeWidth="1.2" />
      <circle cx="99.5" cy="37.1" r="3.2" fill={monochrome ? "#fff" : "#ddf8ff"} />
    </g>
  </svg>;
}

export function CosmosLogo({ href, ariaLabel = "COSMOS", subtitle, variant = "horizontal", monochrome = false, className = "" }: Props) {
  const contents = <>
    <Mark monochrome={monochrome} className={variant === "symbol" ? "cosmos-logo__icon cosmos-logo__icon-only" : "cosmos-logo__icon"} />
    {variant === "horizontal" && <span className="cosmos-logo__wordmark">
      <span className="cosmos-logo__name">COSMOS</span>
      {subtitle && <span className="cosmos-logo__subtitle">{subtitle}</span>}
    </span>}
  </>;

  if (href) return <Link href={href} aria-label={ariaLabel} className={`cosmos-logo ${variant === "symbol" ? "cosmos-logo--symbol" : ""} ${className}`}>{contents}</Link>;
  return <span aria-label={ariaLabel} className={`cosmos-logo ${variant === "symbol" ? "cosmos-logo--symbol" : ""} ${className}`}>{contents}</span>;
}
