import { MoreVertical } from "lucide-react";
import { PrimaryButton } from "../Button";
import { INSTALLED_AGENTS, type AgentLifecycle } from "./agentStudioMock";
import type { AgentStudioTab } from "./agentStudioTabs";

const lifecycleChip: Record<AgentLifecycle, { label: string; textClass: string; bgClass: string }> = {
  observe: { label: "Observe", textClass: "text-[#ff9d00]", bgClass: "bg-[#fff8e1]" },
  active: { label: "Live", textClass: "text-[#21c179]", bgClass: "bg-[#e3f6ec]" },
  paused: { label: "Paused", textClass: "text-[#7e7e7e]", bgClass: "bg-[#fafafa]" },
  draft: { label: "Draft", textClass: "text-[#7e7e7e]", bgClass: "bg-[#fafafa]" },
};

export function AgentStudioMyAgentsPanel({ onSelectTab }: { onSelectTab: (tab: AgentStudioTab) => void }) {
  const rows = INSTALLED_AGENTS;

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-[640px] text-[14px] leading-[20px] text-[#7e7e7e]">
          Installed instances for this merchant. Open an agent to configure triggers, channels, and limits—or promote
          from observe to live when you are satisfied.
        </p>
        <PrimaryButton size="medium" onClick={() => onSelectTab("marketplace")}>
          Browse marketplace
        </PrimaryButton>
      </div>

      {rows.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[12px] border border-dashed border-[#e0e0e0] py-20">
          <p className="text-[16px] font-semibold text-[#101010]">No agents installed yet</p>
          <p className="mt-2 max-w-[400px] text-center text-[14px] text-[#7e7e7e]">
            Add agents from the marketplace. Each install includes a sandbox check and observe window before autonomous
            actions.
          </p>
          <PrimaryButton className="mt-6" onClick={() => onSelectTab("marketplace")}>
            Go to marketplace
          </PrimaryButton>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-[12px] border border-[#e0e0e0]">
          <div className="min-w-[720px]">
            <div className="grid grid-cols-[1.4fr_0.9fr_1.2fr_1.2fr_0.5fr] gap-6 border-b border-[#e0e0e0] bg-[#EBEBEB] px-6 py-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#101010]">Agent</span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#101010]">Status</span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#101010]">Last activity</span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#101010]">Next / note</span>
              <span className="text-right text-[12px] font-semibold uppercase tracking-[0.6px] text-[#101010]">
                Actions
              </span>
            </div>
            {rows.map((row, idx) => {
              const chip = lifecycleChip[row.lifecycle];
              return (
                <div
                  key={row.id}
                  className={`grid grid-cols-[1.4fr_0.9fr_1.2fr_1.2fr_0.5fr] items-center gap-6 border-b border-[#e0e0e0] px-6 py-4 last:border-b-0 ${
                    idx % 2 === 0 ? "bg-white" : "bg-[#fafafa]"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold text-[#101010]">{row.name}</p>
                    <p className="text-[12px] text-[#7e7e7e]">ID {row.definitionId}</p>
                  </div>
                  <div>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${chip.textClass} ${chip.bgClass}`}
                    >
                      {chip.label}
                    </span>
                  </div>
                  <span className="text-[14px] text-[#101010]">{row.lastRun}</span>
                  <span className="text-[14px] leading-[20px] text-[#444746]">{row.nextSummary}</span>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="flex size-8 items-center justify-center rounded-[4px] text-[#7e7e7e] transition-colors hover:bg-[#f5f9fe] hover:text-[#004299] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-2"
                      aria-label={`More actions for ${row.name}`}
                    >
                      <MoreVertical className="size-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
