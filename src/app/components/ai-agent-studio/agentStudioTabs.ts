export const AGENT_STUDIO_TABS = ["overview", "marketplace", "my_agents"] as const;
export type AgentStudioTab = (typeof AGENT_STUDIO_TABS)[number];

export function parseAgentStudioTab(tabParam: string | null): AgentStudioTab {
  if (tabParam === "marketplace" || tabParam === "my_agents" || tabParam === "overview") {
    return tabParam;
  }
  return "overview";
}
