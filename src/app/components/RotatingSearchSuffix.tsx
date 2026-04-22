import { useEffect, useState, useSyncExternalStore } from "react";

export const SEARCH_HINT_SUFFIXES = ["Transaction ID", "Refund ID", "Order ID", "Topic"] as const;

const ROTATE_MS = 2800;

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export type RotatingSearchSuffixVariant = "header" | "filter";

/**
 * Vertically cycles hint suffixes (Transaction ID, Refund ID, …) for global header and FilterBar search.
 */
export function RotatingSearchSuffix({ variant = "header" }: { variant?: RotatingSearchSuffixVariant }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SEARCH_HINT_SUFFIXES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const lineClass =
    variant === "filter"
      ? "flex h-5 shrink-0 items-center whitespace-nowrap text-[14px] font-semibold leading-5 text-[#7e7e7e]"
      : "flex h-5 shrink-0 items-center whitespace-nowrap text-sm font-medium leading-5 text-[#7e7e7e] md:text-base";

  if (reduceMotion) {
    return <span className={lineClass}>{SEARCH_HINT_SUFFIXES[0]}</span>;
  }

  return (
    <span className="inline-flex h-5 min-w-[10.5rem] overflow-hidden align-middle" aria-hidden>
      <span
        className="flex flex-col transition-transform duration-500 ease-in-out"
        style={{ transform: `translateY(-${index * 1.25}rem)` }}
      >
        {SEARCH_HINT_SUFFIXES.map((label) => (
          <span key={label} className={lineClass}>
            {label}
          </span>
        ))}
      </span>
    </span>
  );
}
