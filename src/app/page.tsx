import { SiteHeader } from "@/components/layout/SiteHeader";
import { ActionLink } from "@/components/ui/ActionLink";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03050B] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_43%,#123963_0%,#071426_34%,#03050B_70%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:37px_37px]" />
      <SiteHeader />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 pb-16 pt-36 sm:px-12">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#57D9FF] sm:tracking-[0.35em]">Исследуй Вселенную без границ</p>
        <h1 className="max-w-3xl text-5xl font-light leading-tight tracking-tight sm:text-7xl">Вселенная ближе, <span className="text-[#57D9FF]">чем кажется.</span></h1>
        <p className="mt-8 max-w-xl text-base leading-7 text-[#94A3B8]">COSMOS — интерактивная образовательная платформа для путешествия по Солнечной системе. 3D-исследование скоро начнётся.</p>
        <div className="mt-10"><ActionLink href="#about">О проекте</ActionLink></div>
      </div>
      <section id="about" className="relative z-10 mx-auto max-w-7xl border-t border-white/15 px-6 py-16 text-sm leading-7 text-[#94A3B8] sm:px-12">
        <h2 className="mb-4 text-2xl font-light text-white">Путешествие начинается здесь</h2>
        <p className="max-w-2xl">Интерактивная 3D-сцена и маршруты планет находятся в разработке. Масштаб будущей визуализации будет условным.</p>
      </section>
    </main>
  );
}
