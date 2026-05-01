import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { PrimaryTabs } from "../Tabs";
import { AGENT_STUDIO_TABS, parseAgentStudioTab, type AgentStudioTab } from "./agentStudioTabs";
import { AgentStudioOverviewPanel } from "./AgentStudioOverviewPanel";
import { AgentStudioMarketplacePanel } from "./AgentStudioMarketplacePanel";
import { AgentStudioMyAgentsPanel } from "./AgentStudioMyAgentsPanel";

const TAB_QUERY = "tab";

export function AgentStudioPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get(TAB_QUERY);
  const activeTab = parseAgentStudioTab(raw);

  useEffect(() => {
    if (raw !== null && !AGENT_STUDIO_TABS.includes(raw as AgentStudioTab)) {
      setSearchParams({}, { replace: true });
    }
  }, [raw, setSearchParams]);

  const setTab = (value: string) => {
    const next = parseAgentStudioTab(value);
    if (next === "overview") {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ [TAB_QUERY]: next }, { replace: true });
    }
  };

  const tabs = [
    { label: "Overview", value: "overview" },
    { label: "Marketplace", value: "marketplace" },
    { label: "My agents", value: "my_agents" },
  ];

  return (
    <div className="flex min-h-full flex-col gap-4 bg-[#ffffff] px-[32px] pb-[32px] pt-[20px] md:gap-8">
      <h1 className="text-[32px] font-semibold leading-[36px] text-[#101010]">AI Agent Studio</h1>
      <PrimaryTabs tabs={tabs} activeTab={activeTab} onTabChange={setTab} />
      <div className="flex min-h-0 flex-1 flex-col">
        {activeTab === "overview" ? <AgentStudioOverviewPanel onSelectTab={setTab} /> : null}
        {activeTab === "marketplace" ? <AgentStudioMarketplacePanel onSelectTab={setTab} /> : null}
        {activeTab === "my_agents" ? <AgentStudioMyAgentsPanel onSelectTab={setTab} /> : null}
      </div>
    </div>
  );
}
