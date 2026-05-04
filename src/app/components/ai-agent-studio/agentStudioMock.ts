/** Mock catalog + inventory for AI Agent Studio UI (replace with API). */

export type AgentLifecycle = "observe" | "active" | "paused" | "draft";

export type MarketplaceAgent = {
  id: string;
  name: string;
  tagline: string;
  category: "Payments" | "Settlements" | "Disputes" | "Subscriptions" | "Insights" | "Reconciliation";
  installs: number;
  rating: number;
  observeByDefault: boolean;
  /** Headline outcome the merchant should expect (PRD "Value saved" KPI — the why). */
  valueProp?: string;
  /** Lowercased keywords for AI Assist intent matching. */
  intents?: string[];
};

export type InstalledAgent = {
  id: string;
  definitionId: string;
  name: string;
  lifecycle: AgentLifecycle;
  lastRun: string;
  nextSummary: string;
};

export const MARKETPLACE_AGENTS: MarketplaceAgent[] = [
  {
    id: "def_payment_recovery",
    name: "Payment recovery",
    tagline: "Retries failed UPI and card attempts with smart backoff.",
    category: "Payments",
    installs: 12_400,
    rating: 4.7,
    observeByDefault: true,
    valueProp: "Recovers ~7% of failed payments — avg ₹1.8L / month",
    intents: ["failed", "fail", "retry", "recover", "upi", "card", "checkout", "drop", "abandon", "payment", "cart"],
  },
  {
    id: "def_subscription_recovery",
    name: "Subscription recovery",
    tagline: "Win-back flows for failed renewals with consent-aware messaging.",
    category: "Subscriptions",
    installs: 8_200,
    rating: 4.5,
    observeByDefault: true,
    valueProp: "Saves ~12% of churning subscribers from involuntary failures",
    intents: ["subscription", "renewal", "renew", "churn", "mandate", "recur", "winback", "retention"],
  },
  {
    id: "def_settlement_insights",
    name: "Settlement insights",
    tagline: "Daily reconciliation summaries and anomaly flags.",
    category: "Settlements",
    installs: 15_100,
    rating: 4.8,
    observeByDefault: true,
    valueProp: "Flags settlement gaps in minutes instead of next-day discovery",
    intents: ["settlement", "settle", "payout", "credited", "money", "bank", "delay", "missing", "anomaly"],
  },
  {
    id: "def_dispute_responder",
    name: "Dispute responder",
    tagline: "Drafts evidence-backed responses; human approval before submit.",
    category: "Disputes",
    installs: 6_300,
    rating: 4.6,
    observeByDefault: true,
    valueProp: "Cuts dispute response time from 2 days to 4 hours",
    intents: ["dispute", "chargeback", "evidence", "respond", "refund", "complaint"],
  },
  {
    id: "def_cashflow_forecast",
    name: "Cashflow forecaster",
    tagline: "Rolling 30 / 90-day liquidity outlook from settlement patterns.",
    category: "Insights",
    installs: 9_800,
    rating: 4.4,
    observeByDefault: true,
    valueProp: "Predicts cash position 30 / 90 days out — plan vendor payouts confidently",
    intents: ["cashflow", "cash flow", "forecast", "liquidity", "predict", "plan", "vendor", "burn", "runway"],
  },
  {
    id: "def_reconciliation",
    name: "SmartRecon",
    tagline: "Compares PG, settlement, and bank records; flags mismatches with corrective actions.",
    category: "Reconciliation",
    installs: 11_700,
    rating: 4.7,
    observeByDefault: true,
    valueProp: "Closes books in 1 hour instead of a full day — finance team unblocked",
    intents: ["recon", "reconcile", "reconciliation", "match", "bank", "statement", "ledger", "books", "finance", "utr", "rrn"],
  },
];

export const INSTALLED_AGENTS: InstalledAgent[] = [
  {
    id: "inst_1",
    definitionId: "def_settlement_insights",
    name: "Settlement insights",
    lifecycle: "observe",
    lastRun: "29 Apr 2026, 18:42",
    nextSummary: "Observe window ends in 32h",
  },
  {
    id: "inst_2",
    definitionId: "def_payment_recovery",
    name: "Payment recovery",
    lifecycle: "active",
    lastRun: "29 Apr 2026, 09:15",
    nextSummary: "Next cron: 30 Apr 2026, 07:00",
  },
];

export type ActivityRow = {
  id: string;
  time: string;
  agentName: string;
  summary: string;
  outcome: "success" | "warning" | "error";
};

export const RECENT_ACTIVITY: ActivityRow[] = [
  {
    id: "a1",
    time: "Today, 18:42",
    agentName: "Settlement insights",
    summary: "Observe run completed · 0 live actions",
    outcome: "success",
  },
  {
    id: "a2",
    time: "Today, 09:15",
    agentName: "Payment recovery",
    summary: "12 retries queued · 9 captured",
    outcome: "success",
  },
  {
    id: "a3",
    time: "Yesterday",
    agentName: "Payment recovery",
    summary: "Rate limit hit · backoff applied",
    outcome: "warning",
  },
];
