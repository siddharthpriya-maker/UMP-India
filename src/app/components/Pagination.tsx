import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const btnBase =
    "flex items-center justify-center gap-1 px-4 py-2 h-[32px] bg-white border border-[#e0e0e0] rounded-[8px] text-[12px] font-semibold leading-[16px] text-[#101010] hover:bg-[#f5f9fe] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white";

  return (
    <div className="flex items-center gap-4 py-[24px] px-0">
      <span className="flex-1 text-[14px] font-semibold leading-[20px] text-[#7e7e7e]">
        Page {currentPage} of {totalPages}
      </span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className={btnBase}
          disabled={isFirstPage}
          onClick={onPrevious}
        >
          <ChevronLeft className="size-4" />
          <span>Previous</span>
        </button>
        <button
          type="button"
          className={btnBase}
          disabled={isLastPage}
          onClick={onNext}
        >
          <span>Next</span>
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
