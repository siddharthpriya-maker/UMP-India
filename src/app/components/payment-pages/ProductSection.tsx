import { Package, ShoppingCart, Check } from "lucide-react";
import type { ProductData, ProductItem, PageCustomization, DevicePreview } from "./builder-types";

interface ProductSectionProps {
  data: ProductData;
  customization: PageCustomization;
  previewMode: DevicePreview;
  isSelected: boolean;
  onSelect: () => void;
}

export function ProductSection({
  data,
  customization,
  previewMode,
  isSelected,
  onSelect,
}: ProductSectionProps) {
  const isMobile = previewMode === "mobile";
  const useTwoCol = !isMobile && data.items.length > 1;
  const total = data.items.reduce((sum, i) => sum + lineTotal(i), 0);

  const formatAmount = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: data.currency, maximumFractionDigits: 0 }).format(n);

  const hasAnyFilledItem = data.items.some((i) => i.title.trim());

  return (
    <div
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      className={[
        "group relative rounded-[16px] border-2 p-5 transition-all cursor-pointer",
        isSelected
          ? "border-[#004299] shadow-[0_0_0_3px_rgba(0,66,153,0.12)]"
          : "border-transparent hover:border-[#e0e0e0]",
      ].join(" ")}
      style={{ backgroundColor: customization.backgroundColor, fontFamily: customization.fontFamily }}
    >
      <div
        className={[
          "absolute -top-3 left-4 z-10 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider transition-opacity",
          isSelected
            ? "bg-[#004299] text-white opacity-100"
            : "bg-[#f0f0f0] text-[#7e7e7e] opacity-0 group-hover:opacity-100",
        ].join(" ")}
      >
        Products
      </div>

      {data.items.length === 0 ? (
        <EmptyProductState />
      ) : (
        <>
          <div className={`grid gap-3 ${useTwoCol ? "grid-cols-2" : "grid-cols-1"}`}>
            {data.items.map((item) =>
              item.title.trim() ? (
                <ItemCard
                  key={item.id}
                  item={item}
                  currency={data.currency}
                  primaryColor={customization.primaryColor}
                  showQuantity={item.enableQuantity}
                  itemAddonsEnabled={data.itemAddonsEnabled}
                  showImageSlot={data.itemCardsUseImage ?? true}
                />
              ) : (
                <ItemCardShimmer key={item.id} showImageSlot={data.itemCardsUseImage ?? true} />
              ),
            )}
          </div>

          {hasAnyFilledItem && total > 0 && (
            <div className="mt-3 flex items-center justify-between border-t border-[#f0f0f0] pt-3">
              <span className="text-[13px] font-medium text-[#7e7e7e]">Total</span>
              <span className="text-[16px] font-bold" style={{ color: customization.primaryColor }}>
                {formatAmount(total)}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function EmptyProductState() {
  return (
    <div className="flex flex-col items-center gap-3 py-8">
      <div className="flex size-12 items-center justify-center rounded-full bg-[#f5f9fe]">
        <Package className="size-6 text-[#7e7e7e]" />
      </div>
      <p className="text-center text-[13px] text-[#acacac]">
        Set the number of items in Properties, then fill in each item&apos;s details
      </p>
    </div>
  );
}

function lineTotal(item: ProductItem) {
  const qty = item.enableQuantity ? Math.max(1, item.quantity) : 1;
  const base = item.price * qty;
  const addons = item.addons ?? [];
  const addonSum =
    addons.filter((a) => a.defaultSelected).reduce((s, a) => s + a.price, 0) * qty;
  return base + addonSum;
}

function shimmerBar(className: string) {
  return (
    <div
      className={["rounded-md bg-[#ebebeb] animate-pulse", className].join(" ")}
      aria-hidden
    />
  );
}

function ItemCardShimmer({ showImageSlot }: { showImageSlot: boolean }) {
  return (
    <div className="flex gap-3 rounded-[12px] border border-[#f0f0f0] bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      {showImageSlot ? (
        <div className="size-[56px] shrink-0 rounded-[8px] bg-[#ebebeb] animate-pulse" aria-hidden />
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 py-0.5">
        {shimmerBar("h-3.5 w-[72%]")}
        {shimmerBar("h-3 w-[55%]")}
        {shimmerBar("h-4 w-20 mt-1")}
      </div>
    </div>
  );
}

function ItemCard({
  item,
  currency,
  primaryColor,
  showQuantity,
  itemAddonsEnabled,
  showImageSlot,
}: {
  item: ProductItem;
  currency: string;
  primaryColor: string;
  showQuantity: boolean;
  itemAddonsEnabled: boolean;
  showImageSlot: boolean;
}) {
  const hasImage = showImageSlot && !!item.image;
  const formatAmount = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);

  const addons = item.addons ?? [];

  return (
    <div className="flex gap-3 rounded-[12px] border border-[#f0f0f0] bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md">
      {showImageSlot ? (
        hasImage ? (
          <img src={item.image} alt={item.title} className="size-[56px] shrink-0 rounded-[8px] object-cover" />
        ) : (
          <div className="flex size-[56px] shrink-0 items-center justify-center rounded-[8px] bg-[#f5f5f5]">
            <ShoppingCart className="size-5 text-[#ccc]" />
          </div>
        )
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <span className="truncate text-[14px] font-semibold text-[#101010]">
          {item.title || "Untitled Item"}
        </span>
        {item.description && (
          <span className="truncate text-[12px] text-[#7e7e7e]">{item.description}</span>
        )}
        <div className="mt-1 flex items-center gap-2">
          <span className="text-[14px] font-bold" style={{ color: primaryColor }}>
            {formatAmount(item.price)}
          </span>
          {showQuantity && (
            <span className="rounded-full bg-[#f0f0f0] px-2 py-0.5 text-[11px] text-[#7e7e7e]">
              Qty: {item.quantity}
            </span>
          )}
        </div>
        {itemAddonsEnabled && addons.length > 0 ? (
          <ul className="mt-2 flex flex-col gap-1.5 border-t border-[#f5f5f5] pt-2">
            {addons.map((addon) => (
              <li key={addon.id} className="flex items-center gap-2">
                <span
                  className={[
                    "flex size-4 shrink-0 items-center justify-center rounded border",
                    addon.defaultSelected ? "border-[currentColor] bg-[currentColor]" : "border-[#ccc] bg-white",
                  ].join(" ")}
                  style={addon.defaultSelected ? { color: primaryColor } : undefined}
                  aria-hidden
                >
                  {addon.defaultSelected ? (
                    <Check className="size-3 text-white" strokeWidth={3} />
                  ) : null}
                </span>
                <span className="min-w-0 flex-1 truncate text-[12px] text-[#444746]">
                  {addon.label || "Add-on"}
                </span>
                <span className="shrink-0 text-[12px] font-semibold tabular-nums text-[#101010]">
                  +{formatAmount(addon.price)}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
