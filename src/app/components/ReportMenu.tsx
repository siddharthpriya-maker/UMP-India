import { ChevronRight } from "lucide-react";

export type ReportCategory = {
  id: string;
  label: string;
};

export const REPORT_CATEGORIES: ReportCategory[] = [
  { id: "payment", label: "Payment" },
  { id: "settlement", label: "Settlement" },
  { id: "refund", label: "Refund" },
  { id: "dispute", label: "Dispute" },
  { id: "balance_statement", label: "Balance Statement" },
  { id: "ncmc_recharge", label: "NCMC Recharge Report" },
  { id: "links", label: "Links" },
];

interface ReportMenuProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export function ReportMenu({ selectedCategory, onSelectCategory }: ReportMenuProps) {
  return (
    <nav className="flex flex-col gap-0.5 py-1 px-2" aria-label="Report types">
      {REPORT_CATEGORIES.map((cat) => {
        const isActive = cat.id === selectedCategory;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`flex w-full items-center justify-between rounded-[12px] py-3 pl-6 pr-3 text-left transition-colors ${
              isActive ? "bg-[#b1e6fb] font-bold" : "font-medium hover:bg-[#e0e0e0]"
            }`}
          >
            <span className="text-[14px] leading-[24px] text-[#101010]">{cat.label}</span>
            <ChevronRight className="size-4 shrink-0 text-[#7e7e7e]" aria-hidden />
          </button>
        );
      })}
    </nav>
  );
}
