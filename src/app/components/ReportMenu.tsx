import { ChevronRight } from "lucide-react";
import { REPORT_CATEGORIES } from "./reportMenu.constants";

interface ReportMenuProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export function ReportMenu({ selectedCategory, onSelectCategory }: ReportMenuProps) {
  return (
    <nav className="flex flex-col gap-1 p-0" aria-label="Report types">
      {REPORT_CATEGORIES.map((cat) => {
        const isActive = cat.id === selectedCategory;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`flex w-full items-center justify-between gap-2 rounded-[12px] px-3 py-3 text-left transition-colors ${
              isActive ? "bg-[#e0f5fd] font-bold" : "font-normal hover:bg-[#fafafa]"
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
