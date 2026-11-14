"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SiteHeader } from "./SiteHeader";
import { ActionLink } from "../ui/ActionLink";
import { HeroSceneLoader } from "../three/HeroSceneLoader";

export function HomeExperience() {
  const [explore, setExplore] = useState(false);
  const [arrived, setArrived] = useState(false);
  const intro = useRef<HTMLDivElement>(null);
  const onArrive = useCallback(() => setArrived(true), []);

  useEffect(() => {
    if (!intro.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => { gsap.from("[data-intro]", { opacity: 0, y: 24, duration: 0.9, stagger: 0.12, ease: "power2.out" }); }, intro);
    return () => context.revert();
  }, []);

  return <main className="relative min-h-screen overflow-hidden bg-[#03050B] text-white">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_43%,#123963_0%,#071426_34%,#03050B_70%)]" />
    <div className="pointer-events-none absolute right-[-25%] top-[10%] h-[65vh] w-[115%] opacity-75 sm:right-[-14%] sm:top-0 sm:h-screen sm:w-[75%] sm:opacity-100" style={explore ? { position: "fixed", inset: 0, width: "100%", height: "100vh", opacity: 1, pointerEvents: "auto" } : undefined}>
      <HeroSceneLoader explore={explore} onArrive={onArrive} />
    </div>
    <SiteHeader showAbout={!explore} />
    {!explore ? <div ref={intro} className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 pb-16 pt-36 sm:px-12">
      <p data-intro className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#57D9FF] sm:tracking-[0.35em]">Исследуй Вселенную без границ</p>
      <h1 data-intro className="max-w-3xl text-5xl font-light leading-tight tracking-tight sm:text-7xl">Вселенная ближе, <span className="text-[#57D9FF]">чем кажется.</span></h1>
      <p data-intro className="mt-8 max-w-xl text-base leading-7 text-[#94A3B8]">COSMOS — интерактивная образовательная платформа для путешествия по Солнечной системе.</p>
      <div data-intro className="mt-10 flex flex-wrap gap-4">
        <button type="button" className="action-link action-link-primary" onClick={() => { setArrived(false); setExplore(true); }}>Начать исследование</button>
        <ActionLink href="#about" variant="secondary">О проекте</ActionLink>
      </div>
    </div> : <div className="pointer-events-none fixed inset-0 z-20 flex flex-col justify-between p-6 pt-28 sm:p-12 sm:pt-32">
      <div className="max-w-xl">
        <p className="text-xs uppercase tracking-[.3em] text-[#57D9FF]">Интерактивный обзор</p>
        <h1 className="mt-3 text-3xl font-light sm:text-5xl">Солнечная система</h1>
        <p className="mt-4 text-sm text-[#94A3B8]">Масштаб условный. Вращайте сцену мышью или касанием, приближайте колесом или жестом.</p>
      </div>
      <div className="flex items-end justify-between gap-4">
        <button type="button" className="pointer-events-auto action-link action-link-secondary" onClick={() => { setExplore(false); setArrived(false); }}>← На главную</button>
        <span role="status" className="text-right text-xs text-[#94A3B8]">{arrived ? "Обзорная сцена" : "Перелёт камеры…"}</span>
      </div>
    </div>}
    {!explore && <section id="about" className="relative z-10 mx-auto max-w-7xl border-t border-white/15 px-6 py-16 text-sm leading-7 text-[#94A3B8] sm:px-12">
      <h2 className="mb-4 text-2xl font-light text-white">Путешествие начинается здесь</h2>
      <p className="max-w-2xl">Интерактивная 3D-сцена позволяет исследовать расположение планет. Масштаб визуализации условный.</p>
    </section>}
  </main>;
}
