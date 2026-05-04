import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, Send, ShieldCheck, Sparkles, Eye, FlaskConical } from "lucide-react";
import aiAgentStudioIconUrl from "../../../assets/icons/ai_agent_studio.svg";
import { PrimaryButton, SecondaryButton, TertiaryButton } from "../Button";
import { MARKETPLACE_AGENTS, type MarketplaceAgent } from "./agentStudioMock";

/**
 * AI Agent Studio — empty state for merchants with **zero** installed agents.
 *
 * Design intent (highest activation rate):
 * 1) Lead with **Paytm AI Assist** conversational hero — recommend agents from intent
 *    instead of forcing the merchant to browse a marketplace cold.
 * 2) Recommended cards mirror the wireframe (`Popular in your team` style — compact 2-col list cards).
 * 3) Trust strip surfaces **Observe mode**, **PII protected**, **Sandbox-first** (PRD safety pillars)
 *    — these are the conversion blockers for first-install.
 *
 * Single page, no tabs. Route: `/ai-agent-studio-new`.
 */

type ChatRole = "assistant" | "user";

interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  /** Agent ids the assistant recommends with this message (drives "Recommended" pill on cards). */
  recommends?: string[];
}

const SUGGESTED_PROMPTS: { label: string; prompt: string }[] = [
  {
    label: "Recover failed payments",
    prompt: "When a payment fails on my store, send the customer a WhatsApp with a fresh payment link.",
  },
  {
    label: "Reconcile every Monday",
    prompt: "Every Monday morning, match my bank statement with Paytm settlements and email mismatches to my finance team.",
  },
  {
    label: "Reduce subscription churn",
    prompt: "Win back customers whose monthly subscription renewals failed.",
  },
  {
    label: "Auto-respond to disputes",
    prompt: "Draft chargeback responses with evidence; I'll approve before submission.",
  },
];

const FIRST_ASSISTANT_MESSAGE: ChatMessage = {
  id: "m_welcome",
  role: "assistant",
  text:
    "Hi! I'm Paytm AI Assist. Tell me what you'd like to automate — payment failures, settlement gaps, disputes, recon — and I'll recommend the right agents. Every agent starts in safe observe mode for 24–48 hours before it can act on live traffic.",
};

/** Match the user's free-text intent to MarketplaceAgent ids. Falls back to the top 3 agents. */
function recommendAgentsFromIntent(rawText: string): string[] {
  const text = rawText.toLowerCase();
  const scored = MARKETPLACE_AGENTS.map((agent) => {
    const intents = agent.intents ?? [];
    const score = intents.reduce((acc, kw) => (text.includes(kw) ? acc + 1 : acc), 0);
    return { id: agent.id, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.id);

  if (scored.length > 0) return scored.slice(0, 3);
  return MARKETPLACE_AGENTS.slice(0, 3).map((a) => a.id);
}

function assistantReplyForIntent(rawText: string, ids: string[]): string {
  const names = ids
    .map((id) => MARKETPLACE_AGENTS.find((a) => a.id === id)?.name)
    .filter(Boolean) as string[];
  if (names.length === 0) {
    return "I couldn't pinpoint a fit yet. Try mentioning what you'd like to automate — failed payments, settlements, disputes, churn, or reconciliation.";
  }
  if (rawText.trim().length === 0) {
    return `Here are agents most teams start with: ${names.join(", ")}.`;
  }
  if (names.length === 1) {
    return `Got it. ${names[0]} fits this best — it's highlighted below. Open it to review what data it reads, schedule, and the observe-mode defaults before you install.`;
  }
  return `Got it. I'd chain ${names.slice(0, -1).join(", ")} → ${names[names.length - 1]} for this — they're highlighted below. Open any to review data access and observe-mode defaults before installing.`;
}

function PaytmAiAssistAvatar({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? "size-8" : "size-10";
  return (
    <div className={`flex ${dim} shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#e0f5fd] to-[#e7f1f8] ring-1 ring-[#cfe7fb]`}>
      <img src={aiAgentStudioIconUrl} alt="" width={size === "sm" ? 18 : 22} height={size === "sm" ? 18 : 22} aria-hidden />
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  if (message.role === "assistant") {
    return (
      <div className="flex items-start gap-3">
        <PaytmAiAssistAvatar size="sm" />
        <div className="flex max-w-[640px] flex-col gap-1">
          <span className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#7e7e7e]">Paytm AI Assist</span>
          <div className="rounded-[12px] rounded-tl-[4px] bg-[#f5f9fe] px-4 py-3 text-[14px] leading-[20px] text-[#101010]">
            {message.text}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start justify-end gap-3">
      <div className="flex max-w-[640px] flex-col gap-1 items-end">
        <span className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#7e7e7e]">You</span>
        <div className="rounded-[12px] rounded-tr-[4px] bg-[#101010] px-4 py-3 text-[14px] leading-[20px] text-white">
          {message.text}
        </div>
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex items-start gap-3">
      <PaytmAiAssistAvatar size="sm" />
      <div className="flex items-center gap-1.5 rounded-[12px] rounded-tl-[4px] bg-[#f5f9fe] px-4 py-3" aria-live="polite" aria-label="Paytm AI Assist is typing">
        <span className="size-1.5 animate-pulse rounded-full bg-[#7e7e7e]" />
        <span className="size-1.5 animate-pulse rounded-full bg-[#7e7e7e] [animation-delay:120ms]" />
        <span className="size-1.5 animate-pulse rounded-full bg-[#7e7e7e] [animation-delay:240ms]" />
      </div>
    </div>
  );
}

function AgentRecommendationCard({
  agent,
  recommended,
  onAdd,
  onView,
}: {
  agent: MarketplaceAgent;
  recommended: boolean;
  onAdd: () => void;
  onView: () => void;
}) {
  return (
    <article
      className={`group relative flex w-full items-stretch gap-4 rounded-[12px] border bg-[#fafafa] p-4 transition-colors hover:border-[#cfe7fb] hover:bg-[#f5f9fe] ${
        recommended ? "border-[#004299] ring-1 ring-[#004299]" : "border-[#e0e0e0]"
      }`}
      data-agent-id={agent.id}
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-[10px] bg-[#e0f5fd] text-[#004299]" aria-hidden>
        <Sparkles className="size-6" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[16px] font-semibold leading-[20px] text-[#101010]">{agent.name}</h3>
          {recommended ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#004299] px-2 py-0.5 text-[11px] font-semibold text-white">
              <Sparkles className="size-3" aria-hidden />
              Recommended
            </span>
          ) : null}
          {agent.observeByDefault ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#fff4d6] px-2 py-0.5 text-[11px] font-semibold text-[#8a5a00]">
              <Eye className="size-3" aria-hidden />
              Observe-first
            </span>
          ) : null}
        </div>

        <p className="mt-1 text-[12px] text-[#7e7e7e]">
          <span className="tabular-nums">{agent.installs.toLocaleString("en-IN")}</span> installs
          <span aria-hidden> · </span>
          <span className="tabular-nums">{agent.rating.toFixed(1)}★</span>
          <span aria-hidden> · </span>
          <span>{agent.category}</span>
        </p>

        {agent.valueProp ? (
          <p className="mt-2 text-[13px] font-semibold leading-[18px] text-[#004299]">
            {agent.valueProp}
          </p>
        ) : null}

        <p className="mt-1 line-clamp-2 text-[13px] leading-[18px] text-[#444746]">{agent.tagline}</p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <PrimaryButton size="small" onClick={onAdd}>
            Add to my agents
          </PrimaryButton>
          <SecondaryButton size="small" onClick={onView}>
            View details
          </SecondaryButton>
        </div>
      </div>

      <ChevronRight
        className="self-center text-[#7e7e7e] opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden
      />
    </article>
  );
}

function TrustStrip() {
  const items = [
    {
      icon: <Eye className="size-4" aria-hidden />,
      label: "24–48hr observe mode",
      hint: "Watches before it acts",
    },
    {
      icon: <ShieldCheck className="size-4" aria-hidden />,
      label: "PII protected by default",
      hint: "Customer data never leaves Paytm",
    },
    {
      icon: <FlaskConical className="size-4" aria-hidden />,
      label: "Sandbox-first",
      hint: "Test on historical data before go-live",
    },
  ];
  return (
    <div className="flex flex-col gap-3 rounded-[12px] border border-[#e0e0e0] bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      {items.map((it) => (
        <div key={it.label} className="flex items-start gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e7f1f8] text-[#004299]">
            {it.icon}
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-semibold leading-[18px] text-[#101010]">{it.label}</p>
            <p className="text-[12px] leading-[16px] text-[#7e7e7e]">{it.hint}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AgentStudioEmptyPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([FIRST_ASSISTANT_MESSAGE]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [recommendedIds, setRecommendedIds] = useState<string[]>([]);
  const conversationRef = useRef<HTMLDivElement>(null);
  const recommendedSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const sortedAgents = useMemo<MarketplaceAgent[]>(() => {
    if (recommendedIds.length === 0) return MARKETPLACE_AGENTS;
    const recommended = recommendedIds
      .map((id) => MARKETPLACE_AGENTS.find((a) => a.id === id))
      .filter((a): a is MarketplaceAgent => Boolean(a));
    const others = MARKETPLACE_AGENTS.filter((a) => !recommendedIds.includes(a.id));
    return [...recommended, ...others];
  }, [recommendedIds]);

  const submitPrompt = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `m_user_${Date.now()}`,
      role: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    window.setTimeout(() => {
      const ids = recommendAgentsFromIntent(trimmed);
      const reply: ChatMessage = {
        id: `m_assist_${Date.now()}`,
        role: "assistant",
        text: assistantReplyForIntent(trimmed, ids),
        recommends: ids,
      };
      setMessages((prev) => [...prev, reply]);
      setRecommendedIds(ids);
      setIsThinking(false);
      window.setTimeout(() => {
        recommendedSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 220);
    }, 720);
  };

  const handleAddAgent = (agentId: string) => {
    const agent = MARKETPLACE_AGENTS.find((a) => a.id === agentId);
    if (!agent) return;
    const ack: ChatMessage = {
      id: `m_ack_${Date.now()}`,
      role: "assistant",
      text: `Starting ${agent.name} in observe mode for the next 24–48 hours. I'll surface its first run summary in your dashboard once it watches a full cycle — nothing acts on live traffic yet.`,
    };
    setMessages((prev) => [...prev, ack]);
  };

  const handleViewAgent = (agentId: string) => {
    const agent = MARKETPLACE_AGENTS.find((a) => a.id === agentId);
    if (!agent) return;
    const note: ChatMessage = {
      id: `m_view_${Date.now()}`,
      role: "assistant",
      text: `${agent.name}: ${agent.tagline} ${agent.valueProp ? `Why merchants install it — ${agent.valueProp}.` : ""} It reads PG, settlement, and dispute data scoped to your MID; PII is masked end-to-end.`.trim(),
    };
    setMessages((prev) => [...prev, note]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitPrompt(input);
    }
  };

  return (
    <div className="flex min-h-full flex-col gap-6 bg-white px-[32px] pb-[32px] pt-[20px] md:gap-8">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <PaytmAiAssistAvatar />
          <span className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#004299]">AI Agent Studio</span>
        </div>
        <h1 className="text-[32px] font-semibold leading-[36px] text-[#101010]">
          Set up your AI workforce in minutes
        </h1>
        <p className="max-w-[720px] text-[14px] leading-[20px] text-[#7e7e7e]">
          Tell <span className="font-semibold text-[#101010]">Paytm AI Assist</span> what you'd like to automate.
          We'll recommend the right agents — recover failed payments, reconcile settlements, respond to disputes, and
          more — and every agent starts in safe <span className="font-semibold text-[#101010]">observe mode</span>{" "}
          before it can act on live traffic.
        </p>
      </header>

      <section
        aria-label="Paytm AI Assist conversation"
        className="flex flex-col gap-4 rounded-[16px] border border-[#cfe7fb] bg-gradient-to-br from-[#f5f9fe] via-white to-white p-5 shadow-[0_1px_2px_rgba(16,16,16,0.04)]"
      >
        <div
          ref={conversationRef}
          className="flex max-h-[280px] min-h-[160px] flex-col gap-4 overflow-y-auto pr-1"
          role="log"
          aria-live="polite"
        >
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
          {isThinking ? <TypingBubble /> : null}
        </div>

        {messages.length <= 1 ? (
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_PROMPTS.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => submitPrompt(s.prompt)}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#cfe7fb] bg-white px-3 py-1.5 text-[13px] font-medium text-[#004299] transition-colors hover:bg-[#e7f1f8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-2"
              >
                <Sparkles className="size-3.5" aria-hidden />
                {s.label}
              </button>
            ))}
          </div>
        ) : null}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitPrompt(input);
          }}
          className="flex items-end gap-2 rounded-[12px] border border-[#e0e0e0] bg-white p-2 transition-colors focus-within:border-[#004299]"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Describe what you want to automate — e.g. 'Retry failed UPI payments and notify on WhatsApp'"
            aria-label="Message Paytm AI Assist"
            className="min-h-[36px] max-h-[120px] flex-1 resize-none bg-transparent px-2 py-2 text-[14px] leading-[20px] text-[#101010] outline-none placeholder:text-[#7e7e7e]"
          />
          <PrimaryButton
            size="small"
            type="submit"
            icon={<Send className="size-4" aria-hidden />}
            disabled={input.trim().length === 0}
          >
            Send
          </PrimaryButton>
        </form>
      </section>

      <section ref={recommendedSectionRef} aria-label="Recommended agents" className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-[20px] font-medium leading-[24px] text-[#101010]">
              {recommendedIds.length > 0 ? "Recommended for you" : "Popular starting points"}
            </h2>
            <p className="mt-1 text-[13px] leading-[18px] text-[#7e7e7e]">
              {recommendedIds.length > 0
                ? "Picked based on what you described above."
                : "Most teams start with these — pick one and watch it observe before it acts."}
            </p>
          </div>
          <TertiaryButton size="small" onClick={() => submitPrompt("Show me everything")}>
            Browse all agents
          </TertiaryButton>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {sortedAgents.map((agent) => (
            <AgentRecommendationCard
              key={agent.id}
              agent={agent}
              recommended={recommendedIds.includes(agent.id)}
              onAdd={() => handleAddAgent(agent.id)}
              onView={() => handleViewAgent(agent.id)}
            />
          ))}
        </div>
      </section>

      <TrustStrip />
    </div>
  );
}
