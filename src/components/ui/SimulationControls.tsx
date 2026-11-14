"use client";

import { useState } from "react";
import { Pause, Play, RotateCcw, Settings2 } from "lucide-react";
import { useUniverseStore, type SimulationSpeed } from "@/store/universe";

const speeds: readonly SimulationSpeed[] = [0, 0.5, 1, 2, 5];

export function SimulationControls({ onCameraReset }: { onCameraReset: () => void }) {
  const [open, setOpen] = useState(false);
  const speed = useUniverseStore((state) => state.speed);
  const paused = useUniverseStore((state) => state.paused);
  const setSpeed = useUniverseStore((state) => state.setSpeed);
  const togglePause = useUniverseStore((state) => state.togglePause);
  const showOrbits = useUniverseStore((state) => state.showOrbits);
  const showLabels = useUniverseStore((state) => state.showLabels);
  const showStars = useUniverseStore((state) => state.showStars);
  const toggleOrbits = useUniverseStore((state) => state.toggleOrbits);
  const toggleLabels = useUniverseStore((state) => state.toggleLabels);
  const toggleStars = useUniverseStore((state) => state.toggleStars);
  const resetCamera = useUniverseStore((state) => state.resetCamera);

  return <div className="pointer-events-auto absolute right-6 top-28 z-30 w-[min(340px,calc(100vw-3rem))] sm:right-12 sm:top-32">
    <button type="button" aria-expanded={open} aria-controls="simulation-controls" onClick={() => setOpen((value) => !value)}
      className="flex w-full items-center justify-between gap-3 rounded-full border border-white/20 bg-[#071426]/90 px-5 py-3 text-sm font-medium shadow-lg backdrop-blur-md hover:border-[#57D9FF]">
      <span className="flex items-center gap-2"><Settings2 size={17} aria-hidden="true" /> Управление</span><span aria-hidden="true">{open ? "−" : "+"}</span>
    </button>
    {open && <div id="simulation-controls" className="mt-3 rounded-2xl border border-white/15 bg-[#071426]/95 p-5 shadow-2xl backdrop-blur-md">
      <button type="button" onClick={togglePause} className="action-link action-link-primary w-full gap-2">
        {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
        {paused ? "Запустить движение" : "Остановить движение"}
      </button>
      <fieldset className="mt-5">
        <legend className="mb-3 text-xs uppercase tracking-[.2em] text-[#94A3B8]">Скорость анимации</legend>
        <div className="flex gap-1" role="group" aria-label="Скорость анимации">
          {speeds.map((value) => <button type="button" key={value} onClick={() => setSpeed(value)} aria-pressed={speed === value}
            className={`min-h-10 flex-1 rounded-lg border text-xs ${speed === value ? "border-[#57D9FF] bg-[#246BFD]/40 text-white" : "border-white/15 text-[#94A3B8] hover:text-white"}`}>
            {value}×
          </button>)}
        </div>
      </fieldset>
      <div className="mt-5 space-y-1 border-t border-white/10 pt-4">
        <Toggle label="Орбиты" checked={showOrbits} onClick={toggleOrbits} />
        <Toggle label="Названия планет" checked={showLabels} onClick={toggleLabels} />
        <Toggle label="Звёздный фон" checked={showStars} onClick={toggleStars} />
      </div>
      <button type="button" onClick={() => { onCameraReset(); resetCamera(); }} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/20 text-sm hover:border-[#57D9FF]">
        <RotateCcw size={16} aria-hidden="true" /> Сбросить камеру
      </button>
    </div>}
  </div>;
}

function Toggle({ label, checked, onClick }: { label: string; checked: boolean; onClick: () => void }) {
  return <button type="button" role="switch" aria-checked={checked} onClick={onClick} className="flex min-h-11 w-full items-center justify-between text-sm">
    <span>{label}</span><span aria-hidden="true" className={`h-5 w-9 rounded-full p-0.5 transition-colors ${checked ? "bg-[#246BFD]" : "bg-white/20"}`}><span className={`block h-4 w-4 rounded-full bg-white transition-transform ${checked ? "translate-x-4" : ""}`} /></span>
  </button>;
}
