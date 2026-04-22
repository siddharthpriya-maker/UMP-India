import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { defaultStoryPath, findVariant } from "./storyRegistry";

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
  const raw = searchParams.get("p") ?? "";
  const fallback = useMemo(() => defaultStoryPath(), []);
  const path = findVariant(raw) ? raw : fallback;

  useEffect(() => {
    if (!findVariant(raw)) {
      setSearchParams({ p: fallback }, { replace: true });
    }
  }, [raw, fallback, setSearchParams]);

  const resolved = findVariant(path);
  const variant = resolved?.variant;

  if (!variant) {
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
      <header className="mb-4 flex w-full shrink-0 flex-col gap-1 px-[32px] pt-[12px] md:mb-6">
        <p className="text-[12px] font-semibold leading-[16px] tracking-[0.6px] text-[#7e7e7e]">
          {resolved.category.label}
        </p>
        <h1 className="text-[32px] font-semibold leading-[40px] text-[#101010]">{variant.label}</h1>
      </header>

      <div className="flex min-h-0 w-full flex-1 flex-col gap-4 md:gap-6 px-[32px] pb-[32px]">
        <section aria-labelledby="storybook-preview-title" className="min-h-0 shrink-0">
          <h2 id="storybook-preview-title" className="sr-only">
            Preview
          </h2>
          {variant.preview}
        </section>

        <div className="flex min-h-0 max-w-3xl flex-1 flex-col gap-4 md:gap-6">
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
    </>
  );
}
