import { Routes, Route, Navigate, useLocation } from "react-router";
import { cn } from "./components/ui/utils";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { PaymentsPage } from "./components/PaymentsPage";
import { SettlementsPage } from "./components/SettlementsPage";
import { ConnectPlusPage } from "./components/ConnectPlusPage";
import { DesignInProgress } from "./components/DesignInProgress";
import { ReportsPage } from "./components/ReportsPage";
import { MyServicesPage } from "./components/MyServicesPage";
import { PaymentPagesPage } from "./components/payment-pages/PaymentPagesPage";
import { RefundsPage } from "./components/RefundsPage";
import { SettingsPage } from "./components/SettingsPage";
import { AuthorizationPopupDemo } from "./components/AuthorizationPopupDemo";
import { LoginPage } from "./components/LoginPage";
import { StorybookPage } from "./components/storybook/StorybookPage";
import { MerchantReportingProvider } from "./context/MerchantReportingContext";

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
  Storybook: "/storybook",
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
  const { pathname } = useLocation();
  const isStorybook = pathname === "/storybook";

  return (
    <MerchantReportingProvider>
      <div className="app-product-letterbox">
        <div className="app-product-frame">
          <div className="flex h-full w-full min-h-0 overflow-hidden bg-white">
            <Sidebar />
            <div
              className={cn(
                "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden",
                isStorybook && "bg-[#f5f9fe]"
              )}
            >
              <Header />
              <main
                className={cn(
                  "flex min-h-0 flex-1 flex-col overflow-hidden",
                  isStorybook ? "bg-transparent" : "bg-[#f5f9fe]"
                )}
              >
                <div className="shell-main-canvas flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
                  <div className="flex min-h-0 w-full flex-1 flex-col">
                    <Routes>
                      <Route path="/home" element={<Dashboard />} />
                      <Route path="/payments" element={<PaymentsPage />} />
                      <Route path="/settlements" element={<SettlementsPage />} />
                      <Route path="/connect-plus" element={<ConnectPlusPage />} />
                      <Route path="/my-services" element={<MyServicesPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="/refunds" element={<RefundsPage />} />
                      <Route path="/reports" element={<ReportsPage />} />
                      <Route path="/report" element={<Navigate to="/reports" replace />} />
                      <Route path="/accept-payments" element={<DesignInProgress pageName="Accept Payments" />} />
                      <Route path="/payment-links" element={<DesignInProgress pageName="Payment Links" />} />
                      <Route path="/payment-pages" element={<PaymentPagesPage />} />
                      <Route path="/developer" element={<DesignInProgress pageName="Developer" />} />
                      <Route path="/storybook" element={<StorybookPage />} />
                      <Route path="*" element={<Navigate to="/home" replace />} />
                    </Routes>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </MerchantReportingProvider>
  );
}
