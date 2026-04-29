import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { cn } from "../ui/utils";
import { StorybookInspectFab } from "./StorybookInspectFab";
import { StorybookPreviewInspector } from "./StorybookPreviewInspector";
import { canonicalStorybookPath, defaultStoryPath, findVariant } from "./storyRegistry";

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

  /** Left nav playbook: variant \`main\` + different labels → L2-style component line + variant as H1. */
  const showComponentEyebrow =
    variant.id === "main" &&
    resolved.component.label !== variant.label &&
    resolved.component.label.trim() !== "";

  return (
    <>
      <header className="mb-4 flex w-full shrink-0 flex-col gap-1 px-[32px] pt-[12px] md:mb-6">
        <p className="text-[12px] font-semibold leading-[16px] tracking-[0.6px] text-[#7e7e7e]">
          {resolved.category.label}
        </p>
        {showComponentEyebrow ? (
          <p className="text-[14px] font-medium leading-[20px] text-[#444746]">{resolved.component.label}</p>
        ) : null}
        <h1 className="min-w-0 text-[32px] font-semibold leading-[40px] text-[#101010]">{variant.label}</h1>
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
