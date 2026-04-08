import type { CTAData, ProductData, PageCustomization, DevicePreview } from "./builder-types";

interface CTASectionProps {
  data: CTAData;
  productData: ProductData;
  customization: PageCustomization;
  previewMode: DevicePreview;
  isSelected: boolean;
  onSelect: () => void;
}

export function CTASection({
  data,
  productData,
  customization,
  previewMode,
  isSelected,
  onSelect,
}: CTASectionProps) {
  const total = productData.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const formatAmount = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: productData.currency, maximumFractionDigits: 0 }).format(n);

  return (
    <div
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      className={[
        "group relative rounded-[16px] border-2 transition-all cursor-pointer",
        isSelected
          ? "border-[#004299] shadow-[0_0_0_3px_rgba(0,66,153,0.12)]"
          : "border-transparent hover:border-[#e0e0e0]",
      ].join(" ")}
    >
      <div
        className={[
          "absolute -top-3 left-4 z-10 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider transition-opacity",
          isSelected
            ? "bg-[#004299] text-white opacity-100"
            : "bg-[#f0f0f0] text-[#7e7e7e] opacity-0 group-hover:opacity-100",
        ].join(" ")}
      >
        Call to Action
      </div>

      <div
        className="rounded-[14px] p-5"
        style={{ backgroundColor: customization.backgroundColor, fontFamily: customization.fontFamily }}
      >
        {/* Amount summary */}
        {data.showAmountSummary && total > 0 && (
          <div className="mb-4 flex items-center justify-between rounded-[10px] bg-[#f8f8f8] px-4 py-3">
            <span className="text-[13px] text-[#7e7e7e]">Amount to pay</span>
            <span className="text-[18px] font-bold" style={{ color: customization.primaryColor }}>
              {formatAmount(total)}
            </span>
          </div>
        )}

        {data.showAmountSummary && total === 0 && (
          <div className="mb-4 flex items-center justify-between rounded-[10px] bg-[#f8f8f8] px-4 py-3">
            <span className="text-[13px] text-[#acacac]">Amount summary will appear here</span>
          </div>
        )}

        {/* CTA button */}
        <button
          type="button"
          className="flex w-full items-center justify-center rounded-[10px] py-3.5 text-[15px] font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: customization.primaryColor }}
        >
          {data.label || "Pay Now"}
          {total > 0 && ` · ${formatAmount(total)}`}
        </button>

        {/* Trust badges */}
        <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-[#acacac]">
          <span>🔒 Secure Payment</span>
          <span>·</span>
          <span>Powered by Razorpay</span>
        </div>
      </div>
    </div>
  );
}
