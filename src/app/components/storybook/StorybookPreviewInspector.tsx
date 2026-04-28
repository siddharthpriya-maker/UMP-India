import { createPortal } from "react-dom";
import { useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState, type ReactNode } from "react";
import { cn } from "../ui/utils";
import { TertiaryButton } from "../Button";

const INSPECT_UI = "[data-storybook-inspect-ui]";

function pickInspectableElement(root: HTMLElement, clientX: number, clientY: number, altKey: boolean): Element | null {
  const stack = document.elementsFromPoint(clientX, clientY);
  for (const cand of stack) {
    if (!(cand instanceof Element)) continue;
    if (cand.closest(INSPECT_UI)) continue;
    if (!root.contains(cand)) continue;
    const tag = cand.tagName;
    if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") continue;
    let el: Element = cand;
    if (altKey) {
      const p = el.parentElement;
      if (p && root.contains(p)) el = p;
    }
    return el;
  }
  return null;
}

function formatPx(raw: string): string {
  const n = parseFloat(raw);
  if (!Number.isFinite(n)) return raw.trim() || "—";
  return `${Math.round(n)}px`;
}

function elementSummary(el: Element): { tag: string; cls: string } {
  const tag = el.tagName.toLowerCase();
  let cls = "";
  if (el instanceof HTMLElement && typeof el.className === "string") cls = el.className.trim();
  else if (el instanceof SVGElement) cls = el.getAttribute("class")?.trim() ?? "";
  const short = cls.split(/\s+/).filter(Boolean).slice(0, 5).join(" ");
  return { tag, cls: short.length > 100 ? `${short.slice(0, 100)}…` : short };
}

function readMetrics(el: Element) {
  const rect = el.getBoundingClientRect();
  const s = getComputedStyle(el);
  return {
    w: Math.round(rect.width),
    h: Math.round(rect.height),
    pt: formatPx(s.paddingTop),
    pr: formatPx(s.paddingRight),
    pb: formatPx(s.paddingBottom),
    pl: formatPx(s.paddingLeft),
    mt: formatPx(s.marginTop),
    mr: formatPx(s.marginRight),
    mb: formatPx(s.marginBottom),
    ml: formatPx(s.marginLeft),
    br: (s.borderRadius || "0").trim() || "0",
    display: s.display,
  };
}

function panelPosition(rect: DOMRect, panelW: number, panelH: number) {
  const pad = 8;
  let left = rect.left;
  let top = rect.bottom + 8;
  if (top + panelH > window.innerHeight - pad) top = Math.max(pad, rect.top - panelH - 8);
  if (left + panelW > window.innerWidth - pad) left = window.innerWidth - panelW - pad;
  left = Math.max(pad, left);
  top = Math.max(pad, top);
  return { top, left };
}

function InspectOutline({
  rect,
  variant,
}: {
  rect: DOMRect;
  variant: "hover" | "locked";
}) {
  const isHover = variant === "hover";
  return (
    <div
      className={cn(
        "pointer-events-none fixed z-[100000] box-border",
        isHover ? "border-2 border-dashed border-[#00b8f5] bg-[#00b8f5]/10" : "border-2 border-solid border-[#004299] bg-[#004299]/8",
      )}
      style={{
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      }}
    />
  );
}

function InspectPanel({
  el,
  root,
  onParent,
  onClear,
}: {
  el: Element;
  root: HTMLElement;
  onParent: () => void;
  onClear: () => void;
}) {
  const rect = el.getBoundingClientRect();
  const m = readMetrics(el);
  const { tag, cls } = elementSummary(el);
  const panelW = 288;
  const panelH = 220;
  const { top, left } = panelPosition(rect, panelW, panelH);
  const parent = el.parentElement;
  const canParent = Boolean(parent && root.contains(parent));

  return (
    <div
      data-storybook-inspect-ui
      className="fixed z-[100001] flex w-[288px] max-w-[calc(100vw-16px)] flex-col gap-3 rounded-[12px] border border-[#e0e0e0] bg-white p-3 shadow-[0_12px_40px_-8px_rgba(16,16,16,0.18)]"
      style={{ top, left }}
      role="dialog"
      aria-label="Inspect selection"
    >
      <div className="min-w-0">
        <p className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#7e7e7e]">Element</p>
        <p className="truncate font-mono text-[13px] font-medium leading-[18px] text-[#101010]" title={cls ? `${tag}.${cls}` : tag}>
          {cls ? (
            <>
              {tag}
              <span className="text-[#444746]">.{cls}</span>
            </>
          ) : (
            tag
          )}
        </p>
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[12px] leading-[16px]">
        <dt className="text-[#7e7e7e]">Size</dt>
        <dd className="font-medium tabular-nums text-[#101010]">
          {m.w} × {m.h}px
        </dd>
        <dt className="text-[#7e7e7e]">Display</dt>
        <dd className="font-medium text-[#101010]">{m.display}</dd>
        <dt className="text-[#7e7e7e]">Padding</dt>
        <dd className="font-mono tabular-nums text-[#444746]">
          {m.pt} {m.pr} {m.pb} {m.pl}
        </dd>
        <dt className="text-[#7e7e7e]">Margin</dt>
        <dd className="font-mono tabular-nums text-[#444746]">
          {m.mt} {m.mr} {m.mb} {m.ml}
        </dd>
        <dt className="text-[#7e7e7e]">Radius</dt>
        <dd className="break-all font-mono text-[#444746]">{m.br}</dd>
      </dl>
      <div className="flex flex-wrap gap-2">
        <TertiaryButton type="button" size="small" onClick={onParent} disabled={!canParent}>
          Parent
        </TertiaryButton>
        <TertiaryButton type="button" size="small" onClick={onClear}>
          Clear
        </TertiaryButton>
      </div>
    </div>
  );
}

export type StorybookPreviewInspectorProps = {
  enabled: boolean;
  onExit: () => void;
  className?: string;
  children: ReactNode;
};

export function StorybookPreviewInspector({ enabled, onExit, className, children }: StorybookPreviewInspectorProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<Element | null>(null);
  const [locked, setLocked] = useState<Element | null>(null);
  const [, bump] = useReducer((n) => n + 1, 0);
  const posRef = useRef({ x: 0, y: 0, alt: false });
  const rafMove = useRef(0);
  const scheduled = useRef(false);

  useEffect(() => {
    if (!enabled) {
      setHovered(null);
      setLocked(null);
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onExit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, onExit]);

  useEffect(() => {
    if (!enabled) return;
    const onScrollResize = () => bump();
    window.addEventListener("scroll", onScrollResize, true);
    window.addEventListener("resize", onScrollResize);
    return () => {
      window.removeEventListener("scroll", onScrollResize, true);
      window.removeEventListener("resize", onScrollResize);
    };
  }, [enabled]);

  const flushHover = useCallback(() => {
    scheduled.current = false;
    const rootEl = rootRef.current;
    if (!rootEl || !enabled) return;
    const { x, y, alt } = posRef.current;
    const el = pickInspectableElement(rootEl, x, y, alt);
    setHovered((prev) => (prev === el ? prev : el));
  }, [enabled]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (!enabled) return;
    posRef.current = { x: e.clientX, y: e.clientY, alt: e.altKey };
    if (!scheduled.current) {
      scheduled.current = true;
      rafMove.current = requestAnimationFrame(() => {
        rafMove.current = 0;
        flushHover();
      });
    }
  };

  const onPointerLeave = () => {
    if (!enabled) return;
    if (!locked) setHovered(null);
  };

  useEffect(() => {
    if (!enabled) return;
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target;
      if (!(t instanceof Node) || !rootRef.current) return;
      if (t instanceof Element && t.closest("[data-app-global-header]")) return;
      if (t instanceof Element && t.closest(INSPECT_UI)) return;
      if (!rootRef.current.contains(t)) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      const el = pickInspectableElement(rootRef.current, e.clientX, e.clientY, e.altKey);
      if (el) setLocked(el);
    };
    window.addEventListener("pointerdown", onPointerDown, true);
    return () => window.removeEventListener("pointerdown", onPointerDown, true);
  }, [enabled]);

  useEffect(() => {
    return () => {
      if (rafMove.current) cancelAnimationFrame(rafMove.current);
    };
  }, []);

  useLayoutEffect(() => {
    if (enabled) bump();
  }, [enabled]);

  const focusEl = locked ?? hovered;
  const root = rootRef.current;
  const showHoverOutline = hovered && (!locked || hovered !== locked);
  const hoverRect = showHoverOutline && hovered ? hovered.getBoundingClientRect() : null;
  const lockedRect = locked ? locked.getBoundingClientRect() : null;

  const portal =
    enabled &&
    root &&
    typeof document !== "undefined" &&
    createPortal(
      <>
        {hoverRect ? <InspectOutline rect={hoverRect} variant="hover" /> : null}
        {lockedRect ? <InspectOutline rect={lockedRect} variant="locked" /> : null}
        {focusEl ? (
          <InspectPanel
            el={focusEl}
            root={root}
            onParent={() => {
              const cur = locked ?? hovered;
              const p = cur?.parentElement;
              if (p && root.contains(p)) setLocked(p);
            }}
            onClear={() => {
              setLocked(null);
              setHovered(null);
            }}
          />
        ) : null}
      </>,
      document.body,
    );

  return (
    <>
      <div
        ref={rootRef}
        className={cn("relative min-h-0 w-full", className)}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        {children}
      </div>
      {enabled ? (
        <p className="sr-only" aria-live="polite">
          Inspect mode on. Hover the preview, then click to lock an element. Alt while hovering moves one level up.
          Escape exits inspect mode.
        </p>
      ) : null}
      {portal}
    </>
  );
}
