"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SiteHeader } from "./SiteHeader";
import { ActionLink } from "../ui/ActionLink";
import { HeroSceneLoader } from "../three/HeroSceneLoader";
import { solarPlanets } from "@/data/solarObjects";
import { useUniverseStore } from "@/store/universe";
import { Link } from "@/i18n/navigation";
import { SimulationControls } from "@/components/ui/SimulationControls";
import { useTranslations } from "next-intl";

export function HomeExperience() {
  const t = useTranslations();
  const planetText = useTranslations("planets");
  const [explore, setExplore] = useState(false);
  const [arrived, setArrived] = useState(false);
  const intro = useRef<HTMLDivElement>(null);
  const onArrive = useCallback(() => setArrived(true), []);
  const selected = useUniverseStore((state) => state.selected);
  const selectPlanet = useUniverseStore((state) => state.selectPlanet);
  const travelActive = useUniverseStore((state) => state.travelActive);
  const travelPaused = useUniverseStore((state) => state.travelPaused);
  const travelCompleted = useUniverseStore((state) => state.travelCompleted);
  const startTravel = useUniverseStore((state) => state.startTravel);
  const toggleTravelPause = useUniverseStore((state) => state.toggleTravelPause);
  const advanceTravel = useUniverseStore((state) => state.advanceTravel);
  const endTravel = useUniverseStore((state) => state.endTravel);
  const completeTravel = useUniverseStore((state) => state.completeTravel);
  const selectedBody = solarPlanets.find((planet) => planet.slug === selected);
  const selectedIndex = solarPlanets.findIndex((planet) => planet.slug === selected);

  useEffect(() => {
    if (!travelActive || travelPaused || !arrived || !selectedBody) return;
    const timeout = window.setTimeout(() => {
      if (selectedIndex === solarPlanets.length - 1) {
        completeTravel();
        return;
      }
      setArrived(false);
      advanceTravel();
    }, 5200);
    return () => window.clearTimeout(timeout);
  }, [travelActive, travelPaused, arrived, selectedBody, selectedIndex, advanceTravel, completeTravel]);

  const beginTravel = () => {
    setArrived(false);
    setExplore(true);
    startTravel();
  };
  const stopTravel = () => {
    endTravel();
    setArrived(false);
  };

  useEffect(() => {
    if (!intro.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => { gsap.from("[data-intro]", { opacity: 0, y: 24, duration: 0.9, stagger: 0.12, ease: "power2.out" }); }, intro);
    return () => context.revert();
  }, []);

  return <main className="relative min-h-screen overflow-hidden bg-[#03050B] text-white">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_43%,#123963_0%,#071426_34%,#03050B_70%)]" />
    <div className="pointer-events-none absolute right-[-25%] top-[10%] h-[65vh] w-[115%] opacity-75 sm:right-[-14%] sm:top-0 sm:h-screen sm:w-[75%] sm:opacity-100" style={explore ? { position: "fixed", inset: 0, width: "100%", height: "100vh", opacity: 1, pointerEvents: "auto" } : undefined}>
      <HeroSceneLoader explore={explore} selected={selected} onArrive={onArrive} />
    </div>
    <SiteHeader showAbout={!explore} />
    {!explore ? <div ref={intro} className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 pb-16 pt-36 sm:px-12">
      <p data-intro className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#57D9FF] sm:tracking-[0.35em]">{t("hero.eyebrow")}</p>
      <h1 data-intro className="max-w-3xl text-5xl font-light leading-tight tracking-tight sm:text-7xl">{t("hero.title")}</h1>
      <p data-intro className="mt-8 max-w-xl text-base leading-7 text-[#94A3B8]">{t("hero.description")}</p>
      <div data-intro className="mt-10 flex flex-wrap gap-4">
        <button type="button" className="action-link action-link-primary" onClick={() => { setArrived(false); setExplore(true); }}>{t("hero.explore")}</button>
        <button type="button" className="action-link action-link-secondary" onClick={beginTravel}>{t("hero.journey")}</button>
        <ActionLink href="/#about" variant="secondary">{t("hero.about")}</ActionLink>
      </div>
    </div> : <div className="pointer-events-none fixed inset-0 z-20 flex flex-col justify-between p-6 pt-28 sm:p-12 sm:pt-32">
      <SimulationControls onCameraReset={() => { stopTravel(); setArrived(false); }} />
      <div className={`max-w-xl ${selectedBody ? "rounded-2xl border border-white/10 bg-[#071426]/80 p-5 shadow-2xl backdrop-blur-md sm:p-7" : ""}`}>
        <p className="text-xs uppercase tracking-[.3em] text-[#57D9FF]">{t("scene.eyebrow")}</p>
        <h1 className="mt-3 text-3xl font-light sm:text-5xl">{selected ? planetText(`${selected}.name`) : t("scene.solarSystem")}</h1>
        <p className="mt-4 text-sm text-[#94A3B8]">{selected ? planetText(`${selected}.summary`) : t("scene.scaleHint")}</p>
        {selectedBody && <div className="mt-5 flex flex-wrap gap-4 text-sm">
          <Link href={`/planets/${selectedBody.slug}`} className="pointer-events-auto font-medium text-[#57D9FF] underline underline-offset-4">{t("scene.planetPage")}</Link>
          <a href={selectedBody.nasaUrl} target="_blank" rel="noopener noreferrer" className="pointer-events-auto text-[#94A3B8] underline underline-offset-4">{t("scene.source")}</a>
        </div>}
      </div>
      <div className="flex flex-col gap-4">
        <div role="group" aria-label={t("scene.selectPlanet")} className="pointer-events-auto flex max-w-4xl flex-wrap gap-2">
          {solarPlanets.map((planet) => <button type="button" key={planet.slug} onClick={() => { stopTravel(); setArrived(false); selectPlanet(planet.slug); }} aria-pressed={selected === planet.slug}
            className={`rounded-full border px-3 py-2 text-xs transition-colors sm:px-4 sm:text-sm ${selected === planet.slug ? "border-[#57D9FF] bg-[#246BFD]/30 text-white" : "border-white/25 bg-[#071426]/85 text-[#94A3B8] hover:border-[#57D9FF] hover:text-white"}`}>
            {planetText(`${planet.slug}.name`)}
          </button>)}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {!travelActive && !selectedBody && <button type="button" className="pointer-events-auto action-link action-link-primary" onClick={beginTravel}>{t("scene.startJourney")}</button>}
          {travelActive && <>
            <button type="button" className="pointer-events-auto action-link action-link-secondary" onClick={toggleTravelPause}>{travelPaused ? t("journey.resume") : t("journey.pause")}</button>
            <button type="button" className="pointer-events-auto action-link action-link-secondary" onClick={() => { setArrived(false); advanceTravel(); }}>{t("journey.next")}</button>
            <button type="button" className="pointer-events-auto action-link action-link-secondary" onClick={stopTravel}>{t("journey.end")}</button>
          </>}
          {selectedBody && !travelActive && <>
            <button type="button" className="pointer-events-auto action-link action-link-secondary" onClick={() => { setArrived(false); selectPlanet(solarPlanets[(selectedIndex + solarPlanets.length - 1) % solarPlanets.length].slug); }}>{t("scene.previous")}</button>
            <button type="button" className="pointer-events-auto action-link action-link-secondary" onClick={() => { setArrived(false); selectPlanet(solarPlanets[(selectedIndex + 1) % solarPlanets.length].slug); }}>{t("scene.next")}</button>
            <button type="button" className="pointer-events-auto action-link action-link-secondary" onClick={() => { setArrived(false); selectPlanet(null); }}>{t("scene.overview")}</button>
          </>}
          <button type="button" className="pointer-events-auto action-link action-link-secondary" onClick={() => { stopTravel(); selectPlanet(null); setExplore(false); setArrived(false); }}>{t("scene.home")}</button>
          <span role="status" className="text-xs text-[#94A3B8]">{travelPaused ? t("journey.paused") : travelCompleted ? t("journey.completed") : arrived ? travelActive ? t("scene.stopCount", { current: selectedIndex + 1, total: solarPlanets.length }) : t("scene.cameraReady") : t("scene.cameraTransit")}</span>
        </div>
      </div>
    </div>}
    {!explore && <section id="about" className="relative z-10 mx-auto max-w-7xl border-t border-white/15 px-6 py-16 text-sm leading-7 text-[#94A3B8] sm:px-12">
      <h2 className="mb-4 text-2xl font-light text-white">{t("about.title")}</h2>
      <p className="max-w-2xl">{t("about.description")}</p>
    </section>}
  </main>;
}
