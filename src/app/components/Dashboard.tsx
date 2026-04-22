import { useState } from "react";
import { Dashboard1 } from "./Dashboard1";
import { Dashboard2 } from "./Dashboard2";
import { ActivationSuccessPopup } from "./ActivationSuccessPopup";
import { PaymentLimitDrawer } from "./PaymentLimitDrawer";
import type { OverviewSelection } from "../data/businessOverviewDataset";
import { useMerchantReporting } from "../context/MerchantReportingContext";

const defaultHomeChartSelection: OverviewSelection = { kind: "quick", preset: "today" };

export function Dashboard() {
  const { businessOverviewDateSelection, setBusinessOverviewDateSelection } = useMerchantReporting();
  const [paymentSourcesSelection, setPaymentSourcesSelection] =
    useState<OverviewSelection>(defaultHomeChartSelection);
  const [showActivation, setShowActivation] = useState(() => {
    const seen = sessionStorage.getItem("activation_popup_seen");
    return !seen;
  });
  const [showLimitDrawer, setShowLimitDrawer] = useState(false);

  const handleCloseActivation = () => {
    sessionStorage.setItem("activation_popup_seen", "1");
    setShowActivation(false);
  };

  const handleUpgradeLimit = () => {
    handleCloseActivation();
    setShowLimitDrawer(true);
  };

  return (
    <div className="flex w-full min-h-full flex-col bg-[var(--background,#ffffff)]">
      <Dashboard1 />
      <Dashboard2
        paymentSummarySelection={businessOverviewDateSelection}
        onPaymentSummarySelectionChange={setBusinessOverviewDateSelection}
        paymentSourcesSelection={paymentSourcesSelection}
        onPaymentSourcesSelectionChange={setPaymentSourcesSelection}
      />
      <ActivationSuccessPopup
        visible={showActivation}
        onClose={handleCloseActivation}
        onUpgradeLimit={handleUpgradeLimit}
      />
      <PaymentLimitDrawer
        open={showLimitDrawer}
        onClose={() => setShowLimitDrawer(false)}
      />
    </div>
  );
}
