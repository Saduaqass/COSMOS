import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden bg-[#03050B] px-6 text-white sm:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,#123963_0%,#071426_34%,#03050B_70%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:37px_37px]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <header className="mb-32 text-xl font-bold tracking-[0.3em]">COSMOS <span className="block text-[10px] font-normal tracking-[0.22em] text-[#94A3B8]">INTERACTIVE 3D UNIVERSE</span></header>
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-[#57D9FF]">Исследуй Вселенную без границ</p>
        <h1 className="max-w-3xl text-5xl font-light leading-tight tracking-tight sm:text-7xl">Вселенная ближе, <span className="text-[#57D9FF]">чем кажется.</span></h1>
        <p className="mt-8 max-w-xl text-base leading-7 text-[#94A3B8]">COSMOS — интерактивная образовательная платформа для путешествия по Солнечной системе. 3D-исследование скоро начнётся.</p>
        <Link href="#about" className="mt-10 inline-block rounded-full bg-[#246BFD] px-7 py-3 font-medium transition hover:bg-[#57D9FF] hover:text-[#03050B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#57D9FF]">О проекте</Link>
        <section id="about" className="mt-36 border-t border-white/15 py-8 text-sm text-[#94A3B8]">Интерактивная 3D-сцена и маршруты планет находятся в разработке. Масштаб будущей визуализации будет условным.</section>
      </div>
    </main>
  );
}
