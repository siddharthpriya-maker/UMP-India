import type { ReactNode } from "react";
import { PrimaryButton, SecondaryButton, TertiaryButton } from "../Button";
import { FilterBar } from "../FilterBar";
import { Pagination } from "../Pagination";
import { SearchWithDropdown } from "../SearchWithDropdown";
import { SidebarL1Rail } from "../sidebar/SidebarL1Rail";

export type StoryVariant = {
  id: string;
  label: string;
  preview: ReactNode;
  specs: string[];
  accessibility: string[];
  whenToUse: string[];
};

export type StoryComponent = {
  id: string;
  label: string;
  variants: StoryVariant[];
};

export type StoryCategory = {
  id: string;
  label: string;
  components: StoryComponent[];
};

const searchOptions = [
  { label: "Select Filter", value: "select" },
  { label: "Transaction ID", value: "transaction_id" },
  { label: "Order ID", value: "order_id" },
];

/** Same `d` as `src/assets/icons/symbol.svg` — keep in sync when updating the asset. */
const SYMBOL_PATH_FROM_ASSET =
  "M15.5172 16.2751H21.0126C21.7681 16.2751 22.2428 15.4603 21.8704 14.8031L15.1819 2.99985C14.8042 2.33338 13.844 2.33338 13.4663 2.99986L10.819 7.67158C10.2102 7.49586 9.56688 7.4017 8.90151 7.4017C5.08991 7.4017 2 10.4916 2 14.3032C2 18.1148 5.08991 21.2047 8.90151 21.2047C12.0279 21.2047 14.6688 19.1259 15.5172 16.2751ZM14.302 14.7962H8.48159L11.4684 9.52541C13.1685 10.4407 14.3241 12.237 14.3241 14.3032C14.3241 14.4694 14.3167 14.6338 14.302 14.7962ZM13.9545 16.2751H7.63563C6.88018 16.2751 6.4054 15.4603 6.77785 14.8031L10.0632 9.00533C9.68898 8.92364 9.30027 8.8806 8.90151 8.8806C5.90668 8.8806 3.4789 11.3084 3.4789 14.3032C3.4789 17.298 5.90668 19.7258 8.90151 19.7258C11.2007 19.7258 13.1656 18.2949 13.9545 16.2751ZM15.7857 14.7962C15.7972 14.6334 15.803 14.469 15.803 14.3032C15.803 11.6854 14.3455 9.40802 12.1978 8.23825L14.3241 4.48584L20.1667 14.7962H15.7857Z";

function ButtonStorySymbolMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="block size-full">
      <path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d={SYMBOL_PATH_FROM_ASSET} />
    </svg>
  );
}

type StoryButtonIconMode = "none" | "left" | "right" | "both";
type StoryButtonSize = "small" | "medium" | "large";

function StoryButtonPreviewSingle({
  Btn,
  icon,
  size,
}: {
  Btn: typeof PrimaryButton | typeof SecondaryButton | typeof TertiaryButton;
  icon: StoryButtonIconMode;
  size: StoryButtonSize;
}) {
  const mark = <ButtonStorySymbolMark />;
  const showIcon = icon !== "none";
  const label = size === "small" ? "Small" : size === "medium" ? "Medium" : "Large";
  return (
    <Btn
      size={size}
      type="button"
      icon={showIcon ? mark : undefined}
      iconPosition={icon === "right" ? "right" : "left"}
      trailingIcon={icon === "both" ? mark : undefined}
    >
      {label}
    </Btn>
  );
}

const STORY_BUTTON_PREVIEW_GRID: { id: string; title: string; icon: StoryButtonIconMode; size: StoryButtonSize }[] = [
  { id: "text-s", title: "Text only — Small", icon: "none", size: "small" },
  { id: "text-m", title: "Text only — Medium", icon: "none", size: "medium" },
  { id: "text-l", title: "Text only — Large", icon: "none", size: "large" },
  { id: "left-s", title: "Icon left — Small", icon: "left", size: "small" },
  { id: "left-m", title: "Icon left — Medium", icon: "left", size: "medium" },
  { id: "left-l", title: "Icon left — Large", icon: "left", size: "large" },
  { id: "right-s", title: "Icon right — Small", icon: "right", size: "small" },
  { id: "right-m", title: "Icon right — Medium", icon: "right", size: "medium" },
  { id: "right-l", title: "Icon right — Large", icon: "right", size: "large" },
  { id: "both-s", title: "Icon both sides — Small", icon: "both", size: "small" },
  { id: "both-m", title: "Icon both sides — Medium", icon: "both", size: "medium" },
  { id: "both-l", title: "Icon both sides — Large", icon: "both", size: "large" },
];

function StoryButtonGridPreview({
  Btn,
}: {
  Btn: typeof PrimaryButton | typeof SecondaryButton | typeof TertiaryButton;
}) {
  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-4 md:gap-6">
      {STORY_BUTTON_PREVIEW_GRID.map((cell) => (
        <div
          key={cell.id}
          className="flex min-h-0 flex-col rounded-[12px] bg-white p-5 shadow-[0_1px_3px_rgba(16,16,16,0.05)]"
        >
          <h3 className="text-[13px] font-semibold leading-[18px] text-[#101010]">{cell.title}</h3>
          <div className="mt-4 flex min-h-[48px] flex-1 items-start">
            <StoryButtonPreviewSingle Btn={Btn} icon={cell.icon} size={cell.size} />
          </div>
        </div>
      ))}
    </div>
  );
}

function PrimaryButtonFullPreview() {
  return <StoryButtonGridPreview Btn={PrimaryButton} />;
}

function SecondaryButtonFullPreview() {
  return <StoryButtonGridPreview Btn={SecondaryButton} />;
}

function TertiaryButtonFullPreview() {
  return <StoryButtonGridPreview Btn={TertiaryButton} />;
}

function SidebarL1RailStorybookPreview() {
  return (
    <div className="inline-flex max-h-[85vh] min-h-[560px] w-[88px] shrink-0 flex-col overflow-hidden bg-[#e7f1f8]">
      <SidebarL1Rail
        selectedTab="Storybook"
        pathname="/storybook"
        onItemClick={() => {}}
        onItemHover={() => {}}
        isAcceptPaymentsSubmenuActive={false}
        presentation="storybook-catalog"
      />
    </div>
  );
}

export const STORYBOOK_REGISTRY: StoryCategory[] = [
  {
    id: "buttons",
    label: "Button",
    components: [
      {
        id: "primary",
        label: "Primary",
        variants: [
          {
            id: "default",
            label: "Primary",
            preview: <PrimaryButtonFullPreview />,
            specs: [
              "Preview is a 3×4 grid (12 cards): text-only, icon left, icon right, and icon on both sides × small / medium / large. Each card is titled for its variant.",
              "Default filled CTA — `bg-[#004299]`, hover `bg-[#012A72]`, white label text; sizes per `buttons.mdc`.",
              "Icon: pass `ButtonStorySymbolMark` as `icon`; path `d` matches `src/assets/icons/symbol.svg` via `SYMBOL_PATH_FROM_ASSET` (keep both in sync).",
              "`iconPosition=\"right\"` for trailing single icon; `icon` + `trailingIcon` for symmetric flanks (`trailingIcon` omits single-icon `iconPosition` behavior).",
              "Also supports `loading`, `fullWidth`, and `disabled` on `PrimaryButton` / `Button`.",
            ],
            accessibility: [
              "Use `type=\"button\"` when not submitting a form; `type=\"submit\"` inside forms.",
              "Loading sets `aria-busy`; keep visible label text for screen readers.",
              "Focus ring: `focus-visible:ring-2 ring-[#004299]`.",
              "Decorative SVG uses `aria-hidden`; if an icon is the only “label”, add `aria-label` on the button.",
              "Avoid duplicating meaningful content when using two icons.",
            ],
            whenToUse: [
              "Primary merchant actions: Save, Continue, Generate, Settle, Create.",
              "One primary CTA per logical section when possible.",
              "Icon left: leading affordance (Continue, Pay); icon right: forward / external (Next, Open link); both sides: rare emphasis — prefer single icon in toolbars.",
            ],
          },
        ],
      },
      {
        id: "secondary",
        label: "Secondary",
        variants: [
          {
            id: "default",
            label: "Secondary",
            preview: <SecondaryButtonFullPreview />,
            specs: [
              "Preview matches Primary: 3×4 grid (12 cards) — text-only, icon left, icon right, icon on both sides × small / medium / large; each card titled for its variant.",
              "Outlined style — `border-[#004299]`, `text-[#004299]`, white surface, hover tints per design system.",
              "Same icon API as Primary (`ButtonStorySymbolMark`, `iconPosition`, `trailingIcon`); path `d` synced via `SYMBOL_PATH_FROM_ASSET` with `src/assets/icons/symbol.svg`.",
              "Pairs with Primary for lower-emphasis actions (export, refresh, cancel where destructive is not intended).",
              "Also supports `loading`, `fullWidth`, and `disabled` on `SecondaryButton` / `Button`.",
            ],
            accessibility: [
              "Use `type=\"button\"` when not submitting a form; `type=\"submit\"` inside forms.",
              "Loading sets `aria-busy`; keep visible label text for screen readers.",
              "Focus ring: `focus-visible:ring-2 ring-[#004299]`.",
              "Decorative SVG uses `aria-hidden`; if an icon is the only “label”, add `aria-label` on the button.",
              "Avoid duplicating meaningful content when using two icons.",
              "Disabled state uses muted fill; maintain contrast for remaining enabled actions.",
            ],
            whenToUse: [
              "Secondary actions next to a primary (Download, Send to Email, Refresh).",
              "Do not use for pagination controls — use neutral `Pagination` buttons instead (`pagination.mdc`).",
            ],
          },
        ],
      },
      {
        id: "tertiary",
        label: "Tertiary",
        variants: [
          {
            id: "default",
            label: "Tertiary",
            preview: <TertiaryButtonFullPreview />,
            specs: [
              "Preview matches Primary and Secondary: 3×4 grid (12 cards) — text-only, icon left, icon right, icon on both sides × small / medium / large; each card titled for its variant.",
              "Soft blue surface `bg-[#e7f1f8]`, blue text — lowest emphasis among the three button families.",
              "Same icon API (`ButtonStorySymbolMark`, `iconPosition`, `trailingIcon`); path `d` synced via `SYMBOL_PATH_FROM_ASSET` with `src/assets/icons/symbol.svg`.",
              "Also supports `loading`, `fullWidth`, and `disabled` on `TertiaryButton` / `Button`.",
            ],
            accessibility: [
              "Use `type=\"button\"` when not submitting a form; `type=\"submit\"` inside forms.",
              "Loading sets `aria-busy`; keep visible label text for screen readers.",
              "Focus ring: `focus-visible:ring-2 ring-[#004299]`.",
              "Decorative SVG uses `aria-hidden`; if an icon is the only “label”, add `aria-label` on the button.",
              "Avoid duplicating meaningful content when using two icons.",
            ],
            whenToUse: [
              "Toolbar / summary strip actions (Refresh) where outline secondary would compete with the page frame.",
              "Icon left / right / both: same affordance patterns as Primary and Secondary — prefer a single icon in dense toolbars.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "data",
    label: "Data & filters",
    components: [
      {
        id: "pagination",
        label: "Pagination",
        variants: [
          {
            id: "default",
            label: "Default",
            preview: (
              <div className="max-w-3xl rounded-[12px] bg-white">
                <Pagination currentPage={3} totalPages={12} onPrevious={() => {}} onNext={() => {}} />
              </div>
            ),
            specs: [
              "Neutral gray bordered controls — not `SecondaryButton` (blue outline).",
              "Left: “Page X of Y” in `text-[14px] font-semibold text-[#7e7e7e]`; right: Previous / Next with chevrons.",
              "Place below listing with `flex flex-col gap-0` so no extra gap from page spacing (`pagination.mdc`).",
            ],
            accessibility: [
              "Disable Previous on first page and Next on last page (built into component).",
              "Use sentence case “Page” — not uppercase.",
            ],
            whenToUse: [
              "Paginated grids on Payments, Settlements, Reports, Payment Pages.",
            ],
          },
        ],
      },
      {
        id: "filter-bar",
        label: "FilterBar",
        variants: [
          {
            id: "shell",
            label: "Shell layout",
            preview: (
              <FilterBar>
                <div className="flex w-full flex-col gap-[1px] px-5 py-5 md:h-full md:w-auto md:rounded-bl-[12px] md:rounded-tl-[12px]">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#7e7e7e]">Example</span>
                  <span className="text-[14px] font-semibold text-[#101010]">Filter column</span>
                </div>
                <div className="flex flex-1 items-center justify-end px-5 py-5 md:flex-1">
                  <span className="text-[14px] text-[#7e7e7e]">Tail (search / actions)</span>
                </div>
              </FilterBar>
            ),
            specs: [
              "Outer shell: `rounded-[12px] bg-[#fafafa]`, inner row `md:flex-row md:items-stretch`, no bleed dividers between columns.",
              "Each segment uses `px-5 py-5` with `hover:bg-[#EBEBEB]` for hover affordance.",
            ],
            accessibility: [
              "Real filters should use real controls (`button`, `combobox`) with labels — this demo is layout-only.",
            ],
            whenToUse: [
              "Payments, Settlements, Refunds, Reports, Payment Pages — any L1 list page with date/status/search.",
            ],
          },
        ],
      },
      {
        id: "search-with-dropdown",
        label: "SearchWithDropdown",
        variants: [
          {
            id: "payments-hint",
            label: "Payments (rotating hint)",
            preview: (
              <SearchWithDropdown options={searchOptions} defaultOption="select" transactionRotatingHint />
            ),
            specs: [
              "Left: filter type dropdown; vertical divider; right: search icon + field (`max-w-[560px]` default width).",
              "With `transactionRotatingHint`, empty “Select Filter” shows the same rotating “Search for a …” suffix as the global header.",
            ],
            accessibility: [
              "`aria-label` reflects transaction vs generic hint; reduced motion shows static first suffix.",
            ],
            whenToUse: [
              "Payments FilterBar tail — pass `transactionRotatingHint`.",
              "Settlements / Refunds: omit prop; placeholder stays “Enter search value” until a field is chosen.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "left-navigation",
    label: "Left navigation",
    components: [
      {
        id: "l1-only",
        label: "L1 only",
        variants: [
          {
            id: "main",
            label: "Main page",
            preview: <SidebarL1RailStorybookPreview />,
            specs: [
              "Merchant shell: fixed **88px** rail (`w-[88px]`), `bg-[#e7f1f8]`, scrollable column (`overflow-y-auto`) with logo, primary tabs, divider, secondary tabs — matches `Sidebar` L1 before L2 opens.",
              "Storybook preview uses `presentation=\"storybook-catalog\"`: three symbol-mark rows, divider, three more rows; every caption reads **label**; first row shows active pill (`bg-[#b1e6fb]`). Production uses `presentation=\"merchant\"` (default) with full tab set.",
              "`SidebarL1Rail` is shared with the live sidebar; Storybook preview uses inert `onItemClick` / `onItemHover` handlers.",
              "Symbol path matches `symbol.svg` / Storybook button demos (`RAIL_SYMBOL_PATH` in `SidebarL1Rail.tsx`).",
            ],
            accessibility: [
              "Each destination is a `button` with visible text; keep hit targets at least 44×44px where possible (icon row is 32px tall — pair with padding in real audits).",
              "Storybook entry uses MUI `Book` with `aria-hidden`; label text carries meaning.",
            ],
            whenToUse: [
              "Global L1 navigation for the merchant app; Storybook tile opens the component registry (L2).",
            ],
          },
        ],
      },
    ],
  },
];

export function findVariant(path: string): { category: StoryCategory; component: StoryComponent; variant: StoryVariant } | null {
  const [catId, compId, varId] = path.split("/");
  const category = STORYBOOK_REGISTRY.find((c) => c.id === catId);
  if (!category) return null;
  const component = category.components.find((c) => c.id === compId);
  if (!component) return null;
  const variant = component.variants.find((v) => v.id === varId);
  if (!variant) return null;
  return { category, component, variant };
}

export function defaultStoryPath(): string {
  const first = STORYBOOK_REGISTRY[0]?.components[0]?.variants[0];
  const cat = STORYBOOK_REGISTRY[0];
  const comp = STORYBOOK_REGISTRY[0]?.components[0];
  if (!cat || !comp || !first) return "";
  return `${cat.id}/${comp.id}/${first.id}`;
}
