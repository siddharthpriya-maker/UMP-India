import { Store, Bot, ArrowRight } from "lucide-react";
import { INSTALLED_AGENTS, RECENT_ACTIVITY } from "./agentStudioMock";
import type { AgentStudioTab } from "./agentStudioTabs";

function SummaryCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-[12px] border border-[#e0e0e0] bg-white p-5 shadow-sm">
      <p className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#7e7e7e]">{label}</p>
      <p className="mt-2 text-[32px] font-semibold leading-none text-[#101010] tabular-nums">{value}</p>
      {hint ? <p className="mt-1 text-[12px] leading-[16px] text-[#7e7e7e]">{hint}</p> : null}
    </div>
  );
}

function EntryTile({
  title,
  description,
  icon,
  onClick,
  primary,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full flex-col items-start gap-4 rounded-[12px] border border-[#e0e0e0] bg-[#fafafa] p-6 text-left transition-colors hover:border-[#004299] hover:bg-[#f5f9fe] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-2"
    >
      <div className="flex size-12 items-center justify-center rounded-[10px] bg-[#e0f5fd] text-[#004299]">{icon}</div>
      <div className="min-w-0 flex-1">
        <h3 className="text-[18px] font-semibold text-[#101010]">{title}</h3>
        <p className="mt-1 text-[14px] leading-[20px] text-[#7e7e7e]">{description}</p>
      </div>
      <span
        className={`inline-flex items-center gap-2 text-[14px] font-semibold ${
          primary ? "text-[#004299]" : "text-[#101010]"
        }`}
      >
        Open
        <ArrowRight className="size-4" aria-hidden />
      </span>
    </button>
  );
}

const outcomeStyles: Record<string, string> = {
  success: "text-[#21c179]",
  warning: "text-[#ff9d00]",
  error: "text-[#fd5154]",
};

export function AgentStudioOverviewPanel({ onSelectTab }: { onSelectTab: (tab: AgentStudioTab) => void }) {
  const installed = INSTALLED_AGENTS.length;
  const inObserve = INSTALLED_AGENTS.filter((a) => a.lifecycle === "observe").length;

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <p className="max-w-[720px] text-[14px] leading-[20px] text-[#7e7e7e]">
        Install agents for payments, settlements, and disputes. Every agent starts in{" "}
        <span className="font-semibold text-[#101010]">observe mode</span> before it can act on live traffic—review
        behaviour, then promote when you are ready.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard label="Installed agents" value={installed} hint="Across this merchant account" />
        <SummaryCard label="In observe mode" value={inObserve} hint="No autonomous live actions yet" />
        <SummaryCard label="Runs today" value={24} hint="Including sandbox & observe" />
      </div>

      <h2 className="text-[20px] font-medium text-[#101010]">Get started</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <EntryTile
          title="Browse marketplace"
          description="Purpose-built agents from Paytm PG—each listing shows data access, triggers, and observe defaults."
          icon={<Store className="size-6" aria-hidden />}
          primary
          onClick={() => onSelectTab("marketplace")}
        />
        <EntryTile
          title="My agents"
          description="Configure schedules, limits, and channels. Pause or promote from observe to live."
          icon={<Bot className="size-6" aria-hidden />}
          onClick={() => onSelectTab("my_agents")}
        />
      </div>

      <div className="flex items-center justify-between gap-4 pt-2">
        <h2 className="text-[20px] font-medium text-[#101010]">Recent activity</h2>
        <button
          type="button"
          onClick={() => onSelectTab("my_agents")}
          className="text-[14px] font-semibold text-[#004299] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-2"
        >
          View all
        </button>
      </div>
      <div className="overflow-hidden rounded-[12px] border border-[#e0e0e0]">
        <ul className="divide-y divide-[#e0e0e0]">
          {RECENT_ACTIVITY.map((row, idx) => (
            <li
              key={row.id}
              className={`flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between ${
                idx % 2 === 0 ? "bg-white" : "bg-[#fafafa]"
              }`}
            >
              <div className="min-w-0">
                <p className="text-[12px] font-medium text-[#7e7e7e]">{row.time}</p>
                <p className="text-[14px] font-semibold text-[#101010]">{row.agentName}</p>
                <p className="text-[14px] leading-[20px] text-[#444746]">{row.summary}</p>
              </div>
              <span className={`shrink-0 text-[12px] font-semibold uppercase tracking-wide ${outcomeStyles[row.outcome]}`}>
                {row.outcome}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
