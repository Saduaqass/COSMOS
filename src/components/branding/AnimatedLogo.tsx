"use client";

import { useEffect, useRef, type ComponentProps } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CosmosLogo } from "./CosmosLogo";

type Props = ComponentProps<typeof CosmosLogo>;

export function AnimatedLogo(props: Props) {
  const root = useRef<HTMLSpanElement>(null);
  const hoverTween = useRef<gsap.core.Tween | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = root.current;
    if (!element || reducedMotion) return;
    const context = gsap.context(() => {
      gsap.fromTo(element, { opacity: 0, x: -7 }, { opacity: 1, x: 0, duration: 0.55, ease: "power2.out" });
    }, element);
    return () => {
      hoverTween.current?.kill();
      context.revert();
    };
  }, [reducedMotion]);

  const tilt = (rotation: number, scale: number) => {
    const mark = root.current?.querySelector<SVGSVGElement>(".cosmos-logo__icon");
    if (mark && !reducedMotion) {
      hoverTween.current?.kill();
      hoverTween.current = gsap.to(mark, { rotation, scale, duration: 0.32, ease: "power2.out", overwrite: true });
    }
  };

  return <span ref={root} className="cosmos-logo-motion" onPointerEnter={() => tilt(4, 1.05)} onPointerLeave={() => tilt(0, 1)}>
    <CosmosLogo {...props} />
  </span>;
}
