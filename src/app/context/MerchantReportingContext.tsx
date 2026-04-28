import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  computePaymentsPageSummary,
  type OverviewSelection,
  type PaymentsPageSummaryComputed,
} from "../data/businessOverviewDataset";

export type MerchantReportingContextValue = {
  /**
   * Home **Business Overview** tiles only (Dashboard1). Changing this does not affect
   * Home Payment Summary chart, Payment Sources, or `/payments`.
   */
  businessOverviewDateSelection: OverviewSelection;
  setBusinessOverviewDateSelection: (next: OverviewSelection) => void;
  /** Derived from `businessOverviewDateSelection` — KPIs for the three overview cards on Home. */
  businessOverviewSummary: PaymentsPageSummaryComputed;

  /**
   * `/payments` DATE filter, summary strip, and listing period only. Independent from Home
   * Business Overview and from the Home Payment Summary chart.
   */
  paymentsModuleDateSelection: OverviewSelection;
  setPaymentsModuleDateSelection: (next: OverviewSelection) => void;
  paymentsPageSummary: PaymentsPageSummaryComputed;
};

const MerchantReportingContext = createContext<MerchantReportingContextValue | null>(null);

const defaultSelection: OverviewSelection = { kind: "quick", preset: "today" };

export function MerchantReportingProvider({ children }: { children: ReactNode }) {
  const [businessOverviewDateSelection, setBusinessOverviewDateSelectionState] =
    useState<OverviewSelection>(defaultSelection);
  const [paymentsModuleDateSelection, setPaymentsModuleDateSelectionState] =
    useState<OverviewSelection>(defaultSelection);

  const setBusinessOverviewDateSelection = useCallback((next: OverviewSelection) => {
    setBusinessOverviewDateSelectionState(next);
  }, []);

  const setPaymentsModuleDateSelection = useCallback((next: OverviewSelection) => {
    setPaymentsModuleDateSelectionState(next);
  }, []);

  const businessOverviewSummary = useMemo(
    () => computePaymentsPageSummary(businessOverviewDateSelection),
    [businessOverviewDateSelection],
  );

  const paymentsPageSummary = useMemo(
    () => computePaymentsPageSummary(paymentsModuleDateSelection),
    [paymentsModuleDateSelection],
  );

  const value = useMemo(
    (): MerchantReportingContextValue => ({
      businessOverviewDateSelection,
      setBusinessOverviewDateSelection,
      businessOverviewSummary,
      paymentsModuleDateSelection,
      setPaymentsModuleDateSelection,
      paymentsPageSummary,
    }),
    [
      businessOverviewDateSelection,
      setBusinessOverviewDateSelection,
      businessOverviewSummary,
      paymentsModuleDateSelection,
      setPaymentsModuleDateSelection,
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
