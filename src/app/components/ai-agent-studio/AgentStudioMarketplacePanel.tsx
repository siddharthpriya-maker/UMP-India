import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, Sparkles } from "lucide-react";
import { FilterBar } from "../FilterBar";
import { PrimaryButton, SecondaryButton } from "../Button";
import { MARKETPLACE_AGENTS, type MarketplaceAgent } from "./agentStudioMock";
import type { AgentStudioTab } from "./agentStudioTabs";

const CATEGORIES = ["All", "Payments", "Settlements", "Disputes", "Subscriptions", "Insights"] as const;

function AgentMarketCard({ agent, onInstall }: { agent: MarketplaceAgent; onInstall: () => void }) {
  return (
    <article className="flex flex-col rounded-[12px] border border-[#e0e0e0] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-[10px] bg-[#e0f5fd] text-[#004299]">
          <Sparkles className="size-5" aria-hidden />
        </div>
        <span className="rounded-full bg-[#f0f0f0] px-2.5 py-0.5 text-[11px] font-semibold text-[#7e7e7e]">{agent.category}</span>
      </div>
      <h3 className="mt-4 text-[18px] font-semibold leading-snug text-[#101010]">{agent.name}</h3>
      <p className="mt-1 min-h-[40px] text-[14px] leading-[20px] text-[#7e7e7e]">{agent.tagline}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-[12px] text-[#7e7e7e]">
        <span>{agent.installs.toLocaleString("en-IN")} installs</span>
        <span aria-hidden>·</span>
        <span>{agent.rating.toFixed(1)} rating</span>
        {agent.observeByDefault ? (
          <>
            <span aria-hidden>·</span>
            <span className="font-medium text-[#ff9d00]">Observe by default</span>
          </>
        ) : null}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <SecondaryButton size="small" className="flex-1 min-w-[120px]" type="button">
          View details
        </SecondaryButton>
        <PrimaryButton size="small" className="flex-1 min-w-[120px]" onClick={onInstall}>
          Add to my agents
        </PrimaryButton>
      </div>
    </article>
  );
}

export function AgentStudioMarketplacePanel({ onSelectTab }: { onSelectTab: (tab: AgentStudioTab) => void }) {
  const [category, setCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [catOpen, setCatOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setCatOpen(false);
      }
    };
    if (catOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [catOpen]);

  const filtered = useMemo(() => {
    return MARKETPLACE_AGENTS.filter((a) => {
      if (category !== "All" && a.category !== category) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return a.name.toLowerCase().includes(q) || a.tagline.toLowerCase().includes(q);
      }
      return true;
    });
  }, [category, search]);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <p className="max-w-[720px] text-[14px] leading-[20px] text-[#7e7e7e]">
        Discover agents built for Paytm PG operations. Install starts a guided path: sandbox test, observe window, then
        production with your consent.
      </p>

      <FilterBar>
        <div
          ref={categoryDropdownRef}
          className={`flex w-full flex-col gap-[1px] px-5 py-5 transition-colors hover:bg-[#EBEBEB] md:h-full md:w-auto md:rounded-bl-[12px] md:rounded-tl-[12px] ${
            catOpen ? "relative z-30 bg-[#EBEBEB]" : ""
          }`}
        >
          <span className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#7e7e7e]">Category</span>
          <div className="relative">
            <button
              type="button"
              aria-expanded={catOpen}
              aria-haspopup="listbox"
              className="flex items-center gap-2 text-left text-[14px] font-semibold text-[#101010]"
              onClick={() => setCatOpen(!catOpen)}
            >
              <span>{category}</span>
              <ChevronDown
                className={`size-4 shrink-0 text-[#101010] transition-transform ${catOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {catOpen ? (
              <div
                className="absolute left-0 top-full z-50 mt-1 max-h-[min(50vh,280px)] w-max min-w-[200px] overflow-auto rounded-lg border border-[#e0e0e0] bg-white py-1 shadow-lg"
                role="listbox"
                aria-label="Category"
              >
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    role="option"
                    aria-selected={category === c}
                    className="w-full whitespace-nowrap px-4 py-2 text-left text-[14px] text-[#101010] transition-colors hover:bg-[#EBEBEB]"
                    onClick={() => {
                      setCategory(c);
                      setCatOpen(false);
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex w-full flex-1 items-center justify-end px-5 py-5 md:h-full md:w-auto md:flex-1">
          <div className="flex h-[40px] w-full max-w-[320px] shrink-0 flex-row items-center overflow-hidden rounded-lg border border-[#e0e0e0] bg-white">
            <div className="flex items-center px-3 text-[#7e7e7e]">
              <Search className="size-5" aria-hidden />
            </div>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search agents…"
              className="h-full min-w-0 flex-1 bg-transparent pr-3 text-[14px] text-[#101010] outline-none placeholder:text-[#7e7e7e]"
              aria-label="Search marketplace agents"
            />
          </div>
        </div>
      </FilterBar>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[12px] border border-dashed border-[#e0e0e0] py-16">
          <p className="text-[14px] text-[#7e7e7e]">No agents match your filters.</p>
          <button
            type="button"
            className="mt-3 text-[14px] font-semibold text-[#004299] hover:underline"
            onClick={() => {
              setCategory("All");
              setSearch("");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((agent) => (
            <AgentMarketCard key={agent.id} agent={agent} onInstall={() => onSelectTab("my_agents")} />
          ))}
        </div>
      )}
    </div>
  );
}
