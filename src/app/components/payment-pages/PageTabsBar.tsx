import { useState } from "react";
import { Plus, X } from "lucide-react";
import type { BuilderPage } from "./types";

interface PageTabsBarProps {
  pages: BuilderPage[];
  activePageIndex: number;
  onSwitchPage: (index: number) => void;
  onAddPage: () => void;
  onDeletePage: (index: number) => void;
  onRenamePage: (index: number, title: string) => void;
}

export function PageTabsBar({
  pages,
  activePageIndex,
  onSwitchPage,
  onAddPage,
  onDeletePage,
  onRenamePage,
}: PageTabsBarProps) {
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const startRename = (idx: number) => {
    setEditingIdx(idx);
    setEditValue(pages[idx].title);
  };

  const commitRename = () => {
    if (editingIdx !== null && editValue.trim()) {
      onRenamePage(editingIdx, editValue.trim());
    }
    setEditingIdx(null);
  };

  return (
    <div className="flex w-full shrink-0 items-end border-b border-[#e0e0e0] bg-[#fafafa] pl-4 pr-2">
      {/* Tabs */}
      <div className="flex min-w-0 flex-1 items-end gap-0 overflow-x-auto">
        {pages.map((page, idx) => {
          const isActive = idx === activePageIndex;

          return (
            <div
              key={idx}
              onClick={() => onSwitchPage(idx)}
              className={[
                "group relative flex max-w-[200px] min-w-[100px] cursor-pointer items-center gap-2 rounded-t-[8px] border-x border-t px-3 py-2 text-[13px] font-medium transition-colors select-none",
                isActive
                  ? "border-[#e0e0e0] bg-white text-[#101010] z-[1] -mb-px"
                  : "border-transparent bg-transparent text-[#7e7e7e] hover:bg-[#f0f0f0] hover:text-[#101010]",
              ].join(" ")}
            >
              {editingIdx === idx ? (
                <input
                  autoFocus
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={commitRename}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitRename();
                    if (e.key === "Escape") setEditingIdx(null);
                  }}
                  className="w-full min-w-0 bg-transparent text-[13px] font-medium text-[#101010] outline-none"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <span
                  className="flex-1 truncate"
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    startRename(idx);
                  }}
                >
                  {page.title}
                </span>
              )}

              {pages.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePage(idx);
                  }}
                  className={[
                    "flex size-5 shrink-0 items-center justify-center rounded-[4px] transition-colors",
                    isActive
                      ? "text-[#7e7e7e] hover:bg-[#ffebef] hover:text-[#fd5154]"
                      : "text-transparent group-hover:text-[#7e7e7e] group-hover:hover:bg-[#ffebef] group-hover:hover:text-[#fd5154]",
                  ].join(" ")}
                  aria-label={`Delete ${page.title}`}
                >
                  <X className="size-3" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Add page */}
      <button
        type="button"
        onClick={onAddPage}
        className="mb-1 ml-1 flex shrink-0 items-center gap-1.5 rounded-[6px] px-2.5 py-1.5 text-[13px] font-semibold text-[#004299] transition-colors hover:bg-[#e7f1f8]"
      >
        <Plus className="size-3.5" />
        Add Page
      </button>
    </div>
  );
}
