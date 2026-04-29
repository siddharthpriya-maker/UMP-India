import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router";
import { FilterBar } from "../FilterBar";
import { cn } from "../ui/utils";
import { StorybookInspectFab } from "./StorybookInspectFab";
import { StorybookPreviewInspector } from "./StorybookPreviewInspector";
import {
  canonicalStorybookPath,
  defaultStoryPath,
  findVariant,
  STORYBOOK_REGISTRY,
} from "./storyRegistry";

function slugForTitle(title: string) {
  return title.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase() || "section";
}

function StoryDocTable({
  title,
  items,
  detailColumnHeading,
}: {
  title: string;
  items: string[];
  detailColumnHeading: string;
}) {
  if (items.length === 0) return null;
  const headingId = `storybook-doc-${slugForTitle(title)}`;
  return (
    <section className="flex flex-col gap-2" aria-labelledby={headingId}>
      <h3 id={headingId} className="text-[16px] font-semibold leading-[22px] text-[#101010]">
        {title}
      </h3>
      <div className="overflow-x-auto rounded-[12px] border border-[#e0e0e0] bg-white">
        <table className="w-full min-w-[520px] border-collapse text-left">
          <caption className="sr-only">
            {title}: {items.length} {items.length === 1 ? "row" : "rows"}
          </caption>
          <thead>
            <tr className="border-b border-[#e0e0e0] bg-[#EBEBEB]">
              <th
                scope="col"
                className="w-14 px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.6px] text-[#101010]"
              >
                #
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.6px] text-[#101010]"
              >
                {detailColumnHeading}
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((line, i) => (
              <tr
                key={`${title}-${i}`}
                className="border-b border-[#e0e0e0] bg-white last:border-b-0 even:bg-[#fafafa]"
              >
                <td className="px-4 py-3 align-top text-[13px] font-semibold tabular-nums text-[#7e7e7e]">
                  {i + 1}
                </td>
                <td className="px-4 py-3 text-[14px] leading-[22px] text-[#444746]">{line}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function buildStorybookSearchIndex(): { path: string; title: string; needle: string }[] {
  const rows: { path: string; title: string; needle: string }[] = [];
  for (const cat of STORYBOOK_REGISTRY) {
    for (const comp of cat.components) {
      for (const v of comp.variants) {
        const path = `${cat.id}/${comp.id}/${v.id}`;
        rows.push({
          path,
          title: `${cat.label} › ${comp.label} › ${v.label}`,
          needle: `${cat.label} ${comp.label} ${v.label} ${path}`.toLowerCase(),
        });
      }
    }
  }
  return rows;
}

function StorybookHeaderFilterBar({
  categoryLabel,
  componentLabel,
  variantLabel,
  currentPath,
  onNavigate,
}: {
  categoryLabel: string;
  componentLabel: string;
  variantLabel: string;
  currentPath: string;
  onNavigate: (path: string) => void;
}) {
  const searchIndex = useMemo(() => buildStorybookSearchIndex(), []);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const trimmed = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!trimmed) return [];
    return searchIndex.filter((r) => r.needle.includes(trimmed)).slice(0, 12);
  }, [searchIndex, trimmed]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    setQuery("");
    setOpen(false);
  }, [currentPath]);

  return (
    <FilterBar>
      <div className="flex w-full flex-col gap-[1px] px-5 py-5 transition-colors hover:bg-[#EBEBEB] md:h-full md:w-auto md:rounded-tl-[12px] md:rounded-bl-[12px]">
        <span className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#7e7e7e]">Category</span>
        <span className="text-[14px] font-semibold text-[#101010]">{categoryLabel}</span>
      </div>
      <div className="flex w-full flex-col gap-[1px] px-5 py-5 transition-colors hover:bg-[#EBEBEB] md:h-full md:w-auto">
        <span className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#7e7e7e]">Component</span>
        <span className="text-[14px] font-semibold text-[#101010]">{componentLabel}</span>
      </div>
      <div className="flex w-full flex-col gap-[1px] px-5 py-5 transition-colors hover:bg-[#EBEBEB] md:h-full md:w-auto">
        <span className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#7e7e7e]">Variant</span>
        <span className="text-[14px] font-semibold text-[#101010]">{variantLabel}</span>
      </div>
      <div
        ref={containerRef}
        className="relative z-30 flex min-h-0 w-full flex-1 flex-col justify-center px-5 py-5 md:h-full md:min-w-0 md:flex-1"
      >
        <label htmlFor="storybook-story-search" className="sr-only">
          Search Storybook stories
        </label>
        <div className="relative w-full md:max-w-md md:self-end">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#7e7e7e]"
            aria-hidden
          />
          <input
            id="storybook-story-search"
            type="search"
            value={query}
            onChange={(e) => {
              const v = e.target.value;
              setQuery(v);
              setOpen(v.trim().length > 0);
            }}
            onFocus={() => {
              if (query.trim()) setOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
            placeholder="Search stories…"
            autoComplete="off"
            className="h-[40px] w-full rounded-lg border border-[#e0e0e0] bg-white py-2 pl-10 pr-3 text-[14px] text-[#101010] outline-none transition-colors placeholder:text-[#acacac] focus:border-[#004299] focus:ring-1 focus:ring-[#004299]"
          />
          {open && matches.length > 0 ? (
            <ul
              className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[min(320px,50vh)] overflow-y-auto rounded-lg border border-[#e0e0e0] bg-white py-1 shadow-lg"
              role="listbox"
              aria-label="Matching stories"
            >
              {matches.map((m) => (
                <li key={m.path} role="presentation">
                  <button
                    type="button"
                    role="option"
                    className="w-full px-4 py-2.5 text-left text-[14px] text-[#101010] transition-colors hover:bg-[#EBEBEB]"
                    onClick={() => {
                      onNavigate(m.path);
                      setOpen(false);
                      setQuery("");
                    }}
                  >
                    {m.title}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {open && trimmed && matches.length === 0 ? (
            <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-[#e0e0e0] bg-white px-4 py-3 text-[13px] text-[#7e7e7e] shadow-lg">
              No stories match.
            </div>
          ) : null}
        </div>
      </div>
    </FilterBar>
  );
}

export function StorybookPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inspectMode, setInspectMode] = useState(false);
  const raw = searchParams.get("p") ?? "";
  const fallback = useMemo(() => defaultStoryPath(), []);
  const path = findVariant(raw) ? canonicalStorybookPath(raw) : fallback;

  useEffect(() => {
    if (!findVariant(raw)) {
      setSearchParams({ p: fallback }, { replace: true });
      return;
    }
    const canonical = canonicalStorybookPath(raw);
    if (canonical !== raw) {
      setSearchParams({ p: canonical }, { replace: true });
    }
  }, [raw, fallback, setSearchParams]);

  const resolved = findVariant(path);
  const variant = resolved?.variant;
  const previewWide = Boolean(variant?.previewWide);

  useEffect(() => {
    setInspectMode(false);
  }, [path]);

  if (!variant || !resolved) {
    return (
      <div className="flex h-full w-full min-h-0 flex-1 flex-col px-[32px] pt-[12px] pb-[32px]">
        <p className="text-[14px] leading-[22px] text-[#7e7e7e]">
          Open <span className="font-medium text-[#101010]">Storybook</span> in the left rail (L1), then choose a variant
          in L2 to preview components and record learnings for each one.
        </p>
      </div>
    );
  }

  return (
    <>
      <header className="mb-4 flex w-full shrink-0 flex-col px-[32px] pt-[12px] md:mb-6">
        <StorybookHeaderFilterBar
          categoryLabel={resolved.category.label}
          componentLabel={resolved.component.label}
          variantLabel={variant.label}
          currentPath={path}
          onNavigate={(next) => setSearchParams({ p: canonicalStorybookPath(next) })}
        />
      </header>

      <div
        className={cn(
          "flex min-h-0 w-full flex-1 flex-col gap-4 md:gap-6 px-[32px] pb-24 md:pb-28",
          previewWide && "max-w-full",
        )}
      >
        <section
          id="storybook-preview-anchor"
          aria-labelledby="storybook-preview-title"
          className="min-h-0 shrink-0 scroll-mt-4"
        >
          <h2 id="storybook-preview-title" className="sr-only">
            Preview
          </h2>
          {inspectMode ? (
            <p className="mb-3 text-[13px] leading-[20px] text-[#444746]">
              Hover to highlight, click to lock layout readouts. <span className="font-medium text-[#101010]">Esc</span>{" "}
              exits inspect mode.
            </p>
          ) : null}
          {/* White card is layout-only; inspect targets live inside the inner wrapper (no ring/cursor on the card). */}
          <div
            className={cn(
              "w-full rounded-[12px] bg-white p-6 md:p-8",
              previewWide ? "max-w-none" : "max-w-3xl",
            )}
          >
            <StorybookPreviewInspector
              enabled={inspectMode}
              onExit={() => setInspectMode(false)}
              className="relative min-h-0 w-full"
            >
              {variant.preview}
            </StorybookPreviewInspector>
          </div>
        </section>

        <div className={cn("flex min-h-0 flex-1 flex-col gap-4 md:gap-6", previewWide ? "max-w-none" : "max-w-3xl")}>
          <StoryDocTable
            title="Specs & guidelines"
            items={variant.specs}
            detailColumnHeading="Specification"
          />
          <StoryDocTable
            title="Accessibility"
            items={variant.accessibility}
            detailColumnHeading="Requirement"
          />
          <StoryDocTable title="When to use" items={variant.whenToUse} detailColumnHeading="Guidance" />
        </div>
      </div>

      <StorybookInspectFab pressed={inspectMode} onPress={() => setInspectMode((on) => !on)} />
    </>
  );
}
