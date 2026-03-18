import { Routes, Route, Navigate } from "react-router";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { PaymentsPage } from "./components/PaymentsPage";
import { SettlementsPage } from "./components/SettlementsPage";
import { ConnectPlusPage } from "./components/ConnectPlusPage";
import { DesignInProgress } from "./components/DesignInProgress";
import { MyServicesPage } from "./components/MyServicesPage";
import { PaymentPagesPage } from "./components/payment-pages/PaymentPagesPage";
import { SettingsPage } from "./components/SettingsPage";
import { AuthorizationPopupDemo } from "./components/AuthorizationPopupDemo";
import { LoginPage } from "./components/LoginPage";

export const TAB_ROUTES: Record<string, string> = {
  "Home": "/home",
  "Payments": "/payments",
  "Settlements": "/settlements",
  "Refunds": "/refunds",
  "Reports": "/reports",
  "Accept Payments": "/accept-payments",
  "Payment Links": "/payment-links",
  "Payment Pages": "/payment-pages",
  "My Services": "/my-services",
  "Settings": "/settings",
  "Developer": "/developer",
  "Connect Plus": "/connect-plus",
};

export const ROUTE_TO_TAB: Record<string, string> = Object.fromEntries(
  Object.entries(TAB_ROUTES).map(([tab, route]) => [route, tab])
);

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/authorize" element={<AuthorizationPopupDemo />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<AppShell />} />
    </Routes>
  );
}

function AppShell() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto bg-[#f5f9fe]">
          <Routes>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/settlements" element={<SettlementsPage />} />
            <Route path="/connect-plus" element={<ConnectPlusPage />} />
            <Route path="/my-services" element={<MyServicesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/refunds" element={<DesignInProgress pageName="Refunds" />} />
            <Route path="/reports" element={<DesignInProgress pageName="Reports" />} />
            <Route path="/accept-payments" element={<DesignInProgress pageName="Accept Payments" />} />
            <Route path="/payment-links" element={<DesignInProgress pageName="Payment Links" />} />
            <Route path="/payment-pages" element={<PaymentPagesPage />} />
            <Route path="/developer" element={<DesignInProgress pageName="Developer" />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
