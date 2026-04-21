import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  computeBusinessOverviewMetrics,
  computePaymentsPageSummary,
  type BusinessOverviewMetrics,
  type OverviewSelection,
  type PaymentsPageSummaryComputed,
} from "../data/businessOverviewDataset";

export type MerchantReportingContextValue = {
  /**
   * Same period as **Business Overview** on Home and **DATE** on `/payments`.
   * Payment Summary / Payment Sources on Home use separate state (see `Dashboard.tsx`).
   */
  businessOverviewDateSelection: OverviewSelection;
  setBusinessOverviewDateSelection: (next: OverviewSelection) => void;
  overviewMetrics: BusinessOverviewMetrics;
  paymentsPageSummary: PaymentsPageSummaryComputed;
};

const MerchantReportingContext = createContext<MerchantReportingContextValue | null>(null);

const defaultSelection: OverviewSelection = { kind: "quick", preset: "today" };

export function MerchantReportingProvider({ children }: { children: ReactNode }) {
  const [businessOverviewDateSelection, setBusinessOverviewDateSelectionState] =
    useState<OverviewSelection>(defaultSelection);

  const setBusinessOverviewDateSelection = useCallback((next: OverviewSelection) => {
    setBusinessOverviewDateSelectionState(next);
  }, []);

  const overviewMetrics = useMemo(
    () => computeBusinessOverviewMetrics(businessOverviewDateSelection),
    [businessOverviewDateSelection],
  );

  const paymentsPageSummary = useMemo(
    () => computePaymentsPageSummary(businessOverviewDateSelection),
    [businessOverviewDateSelection],
  );

  const value = useMemo(
    (): MerchantReportingContextValue => ({
      businessOverviewDateSelection,
      setBusinessOverviewDateSelection,
      overviewMetrics,
      paymentsPageSummary,
    }),
    [
      businessOverviewDateSelection,
      setBusinessOverviewDateSelection,
      overviewMetrics,
      paymentsPageSummary,
    ],
  );

  return (
    <MerchantReportingContext.Provider value={value}>{children}</MerchantReportingContext.Provider>
  );
}

export function useMerchantReporting(): MerchantReportingContextValue {
  const ctx = useContext(MerchantReportingContext);
  if (!ctx) {
    throw new Error("useMerchantReporting must be used within MerchantReportingProvider");
  }
  return ctx;
}
