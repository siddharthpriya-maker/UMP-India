import type { OverviewQuickPreset, OverviewSelection } from "../data/businessOverviewDataset";

export function formatOverviewDate(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function startOfWeekMonday(ref: Date): Date {
  const d = new Date(ref);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  d.setDate(d.getDate() + (day === 0 ? -6 : 1 - day));
  return d;
}

export function labelForPreset(preset: OverviewQuickPreset): string {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekStart = startOfWeekMonday(now);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  switch (preset) {
    case "today":
      return `Today, ${formatOverviewDate(now)}`;
    case "yesterday":
      return `Yesterday, ${formatOverviewDate(yesterday)}`;
    case "thisWeek":
      return `This week, ${formatOverviewDate(weekStart)} – ${formatOverviewDate(now)}`;
    case "thisMonth":
      return `This month, ${formatOverviewDate(monthStart)} – ${formatOverviewDate(now)}`;
  }
}

export function labelForSelection(selection: OverviewSelection): string {
  if (selection.kind === "custom") {
    return `Custom, ${formatOverviewDate(selection.from)} – ${formatOverviewDate(selection.to)}`;
  }
  return labelForPreset(selection.preset);
}
