import type { ReactNode } from "react";

import { cn } from "./ui/utils";

export interface FilterBarProps {
  /** Filter columns, search row, and any tail actions (per page). */
  children: ReactNode;
  /** Optional classes on the outer `#fafafa` shell. */
  className?: string;
}

/**
 * **FilterBar** — `#fafafa` rounded shell for list filters + search (`filter-dropdown.mdc`).
 * Inner row is `flex-col gap-0 md:flex-row md:items-stretch`; pass segments as `children`.
 */
export function FilterBar({ children, className }: FilterBarProps) {
  return (
    <div
      className={cn("overflow-visible rounded-[12px] bg-[#fafafa] p-0", className)}
      data-component="filter-bar"
    >
      <div className="flex flex-col gap-0 md:flex-row md:items-stretch">{children}</div>
    </div>
  );
}
