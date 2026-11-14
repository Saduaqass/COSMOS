import Link from "next/link";

export function SiteHeader({ showAbout = true }: { showAbout?: boolean }) {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="COSMOS — главная">
        COSMOS <span>INTERACTIVE 3D UNIVERSE</span>
      </Link>
      {showAbout && <nav aria-label="Основная навигация" className="site-nav">
        <Link href="/#about">О проекте</Link>
      </nav>}
    </header>
  );
}
