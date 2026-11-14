import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="COSMOS — главная">
        COSMOS <span>INTERACTIVE 3D UNIVERSE</span>
      </Link>
      <nav aria-label="Основная навигация" className="site-nav">
        <Link href="/#about">О проекте</Link>
      </nav>
    </header>
  );
}
