import { useState } from "react";
import { ArrowRight, Clock, Download, ChevronDown } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import imgTataCLiQ from "../../imports/tata-cliq-logo";
import { Dashboard1 } from "./Dashboard1";
import { Dashboard2 } from "./Dashboard2";
import { ActivationSuccessPopup } from "./ActivationSuccessPopup";
import { PaymentLimitDrawer } from "./PaymentLimitDrawer";

const paymentData = [
  { date: "01", amount: 650, count: 550 },
  { date: "02", amount: 720, count: 600 },
  { date: "03", amount: 850, count: 680 },
  { date: "04", amount: 900, count: 700 },
  { date: "05", amount: 750, count: 620 },
  { date: "06", amount: 1050, count: 800 },
  { date: "07", amount: 880, count: 720 },
  { date: "08", amount: 950, count: 750 },
  { date: "09", amount: 1200, count: 880 },
  { date: "10", amount: 720, count: 600 },
  { date: "11", amount: 650, count: 560 },
  { date: "12", amount: 800, count: 650 },
  { date: "13", amount: 950, count: 720 },
  { date: "14", amount: 880, count: 700 },
  { date: "15", amount: 1100, count: 820 },
  { date: "16", amount: 950, count: 750 },
  { date: "17", amount: 920, count: 730 },
  { date: "18", amount: 1000, count: 780 },
  { date: "19", amount: 1150, count: 850 },
  { date: "20", amount: 1300, count: 920 },
  { date: "21", amount: 1100, count: 840 },
  { date: "22", amount: 1000, count: 800 },
  { date: "23", amount: 1250, count: 900 },
  { date: "24", amount: 950, count: 750 },
];

const paymentSourcesData = [
  { name: "UPI", value: 3510000, color: "#4A90E2", percentage: 39 },
  { name: "Debit Card", value: 2610000, color: "#FFD93D", percentage: 29 },
  { name: "Credit Card", value: 360000, color: "#FF85C0", percentage: 4 },
  { name: "Net Banking", value: 720000, color: "#98D8C8", percentage: 8 },
  { name: "EMI", value: 900000, color: "#6DD4F2", percentage: 10 },
  { name: "Other", value: 900000, color: "#FFB347", percentage: 10 },
];

export function Dashboard() {
  const [dateRange, setDateRange] = useState("Today, 24 Jan");
  const [summaryDateRange, setSummaryDateRange] = useState("This month 01 Jan -24 Jan");
  const [sourceDateRange, setSourceDateRange] = useState("This month 01 Jan -24 Jan");
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
    <div className="flex flex-col w-full min-h-full bg-[var(--background,#ffffff)]">
      <Dashboard1 />
      <Dashboard2 />
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