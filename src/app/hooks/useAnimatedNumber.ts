import { useEffect, useRef, useState } from "react";

/**
 * Smoothly interpolates toward `target` when it changes (e.g. after date filter).
 */
export function useAnimatedNumber(target: number, durationMs = 520): number {
  const [value, setValue] = useState(target);
  const valueRef = useRef(value);
  valueRef.current = value;
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const startVal = valueRef.current;
    if (startVal === target) return;

    const t0 = performance.now();
    const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

    const tick = (now: number) => {
      const u = Math.min(1, (now - t0) / durationMs);
      const eased = easeOutCubic(u);
      const next = Math.round(startVal + (target - startVal) * eased);
      setValue(next);
      if (u < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [target, durationMs]);

  return value;
}
