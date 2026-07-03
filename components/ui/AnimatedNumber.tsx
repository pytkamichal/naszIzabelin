"use client";

import { useEffect, useRef, useState } from "react";
import { formatNumberPL } from "@/lib/format";

type AnimatedNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
};

/** Counts up from 0 to `value` (ease-out) the first time it scrolls into
 *  view. Falls back to the final value for reduced-motion users. */
export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let frame = 0;
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      frame = requestAnimationFrame(() => {
        setDisplay(value);
        setDone(true);
      });
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(value * eased));
          if (t < 1) {
            frame = requestAnimationFrame(tick);
          } else {
            setDone(true);
          }
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {prefix}
      {formatNumberPL(done ? value : display)}
      {suffix}
    </span>
  );
}
