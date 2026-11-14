import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function ActionLink({ href, children, variant = "primary" }: Props) {
  return (
    <Link href={href} className={`action-link ${variant === "primary" ? "action-link-primary" : "action-link-secondary"}`}>
      {children}
    </Link>
  );
}
