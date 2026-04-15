export type ReportCategory = {
  id: string;
  label: string;
};

export const REPORT_CATEGORIES: ReportCategory[] = [
  { id: "payment", label: "Payment" },
  { id: "settlement", label: "Settlement" },
  { id: "refund", label: "Refund" },
  { id: "dispute", label: "Dispute" },
  { id: "balance_statement", label: "Balance Statement" },
  { id: "ncmc_recharge", label: "NCMC Recharge Report" },
  { id: "links", label: "Links" },
];
