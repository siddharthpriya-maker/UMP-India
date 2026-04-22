import { useState } from "react";
import { AlertCircle, CreditCard, Shield, Smartphone } from "lucide-react";

type TabType = "actions" | "notifications";

interface ActionItem {
  id: string;
  priority: "P0" | "P1";
  icon: "dispute" | "settlement" | "compliance" | "device";
  title: string;
  impact: string;
  amount: string;
  ctaText: string;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const actionItems: ActionItem[] = [
  {
    id: "1",
    priority: "P0",
    icon: "dispute",
    title: "New Dispute Raised",
    impact: "submit proof to avoid debit",
    amount: "₹3,200",
    ctaText: "Submit Proof",
  },
  {
    id: "2",
    priority: "P1",
    icon: "settlement",
    title: "Settlement On Hold",
    impact: "update bank details",
    amount: "₹85,430",
    ctaText: "Update Details",
  },
  {
    id: "3",
    priority: "P0",
    icon: "compliance",
    title: "KYC Verification Pending",
    impact: "complete verification to enable settlements",
    amount: "₹1,25,000",
    ctaText: "Complete KYC",
  },
];

const notifications: NotificationItem[] = [
  {
    id: "1",
    title: "Payment Received",
    message: "₹45,000 received from customer #12345",
    time: "2 hours ago",
    isRead: false,
  },
  {
    id: "2",
    title: "Settlement Completed",
    message: "₹2,50,000 settled to your account",
    time: "5 hours ago",
    isRead: false,
  },
  {
    id: "3",
    title: "New Refund Request",
    message: "Refund of ₹5,000 initiated",
    time: "1 day ago",
    isRead: true,
  },
  {
    id: "4",
    title: "Payment Link Shared",
    message: "Payment link sent to 5 customers",
    time: "1 day ago",
    isRead: true,
  },
  {
    id: "5",
    title: "Device Added",
    message: "New Android device registered",
    time: "2 days ago",
    isRead: true,
  },
  {
    id: "6",
    title: "Settlement Schedule Updated",
    message: "Your settlement frequency changed to daily",
    time: "3 days ago",
    isRead: true,
  },
  {
    id: "7",
    title: "API Key Generated",
    message: "New production API key created",
    time: "4 days ago",
    isRead: true,
  },
  {
    id: "8",
    title: "Monthly Report Available",
    message: "January 2026 transaction report is ready",
    time: "5 days ago",
    isRead: true,
  },
  {
    id: "9",
    title: "Promotional Campaign",
    message: "New cashback offers for your customers",
    time: "1 week ago",
    isRead: true,
  },
  {
    id: "10",
    title: "Security Alert",
    message: "Login from new location detected",
    time: "1 week ago",
    isRead: true,
  },
  {
    id: "11",
    title: "Payment Failed",
    message: "₹12,000 transaction declined - insufficient balance",
    time: "2 weeks ago",
    isRead: true,
  },
  {
    id: "12",
    title: "Account Verified",
    message: "Your business account has been verified",
    time: "2 weeks ago",
    isRead: true,
  },
];

const getIcon = (iconType: string) => {
  switch (iconType) {
    case "dispute":
      return <AlertCircle className="size-5" />;
    case "settlement":
      return <CreditCard className="size-5" />;
    case "compliance":
      return <Shield className="size-5" />;
    case "device":
      return <Smartphone className="size-5" />;
    default:
      return <AlertCircle className="size-5" />;
  }
};

export function ActionsNotificationsWidget() {
  const [activeTab, setActiveTab] = useState<TabType>("actions");

  return (
    <div className="bg-white rounded-2xl flex flex-col">
      {/* Tabs - Fixed Header */}
      <div className="shrink-0 p-[24px]">
        <div className="flex items-center gap-4">
          {(
            [
              { label: `Actions (${actionItems.length})`, value: "actions" as const },
              { label: `Notifications (${notifications.length})`, value: "notifications" as const },
            ] as const
          ).map((tab) => {
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`flex h-[32px] min-w-0 items-center justify-center rounded-[8px] px-3 py-1 text-[14px] leading-[20px] transition-colors ${
                  isActive
                    ? "bg-[#004299] font-semibold text-white"
                    : tab.value === "actions"
                      ? "bg-[#f5f9fe] font-normal text-[#101010] hover:bg-[#e0f5fd]"
                      : "bg-[#f5f9fe] font-normal text-[#101010] hover:bg-[#f5f9fe]"
                }`}
              >
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="overflow-y-auto px-5 pb-5 max-h-[400px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-400">
        {/* Actions Tab Content */}
        {activeTab === "actions" && (
          <div className="flex flex-col gap-3">
            {actionItems.map((item) => (
              <div
                key={item.id}
                className="relative cursor-pointer rounded-[16px] bg-[#fafafa] p-[16px] transition-colors hover:bg-[#f5f9fe]"
              >
                <div className="flex items-start gap-3">
                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <h4 className="mb-1 text-[14px] font-semibold text-foreground">
                      {item.title}
                    </h4>
                    <p className="mb-2 text-[12px] text-muted-foreground">
                      <span className="font-bold text-foreground">{item.amount}</span> at risk — {item.impact}
                    </p>
                    <a href="#" className="text-[12px] font-semibold text-[#004299] hover:underline">
                      {item.ctaText}
                    </a>
                  </div>

                  {/* Icon — neutral, same family as notification list */}
                  <div className="shrink-0 text-[#7e7e7e]">{getIcon(item.icon)}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Notifications Tab Content */}
        {activeTab === "notifications" && (
          <div className="flex flex-col gap-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`cursor-pointer rounded-[16px] p-[16px] transition-colors ${
                  notification.isRead
                    ? "bg-[#fafafa] hover:bg-[#f5f9fe]"
                    : "bg-[#F5F9FE] hover:bg-[#e7f1f8]"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground text-[14px]">
                        {notification.title}
                      </p>
                      {!notification.isRead && (
                        <div className="size-2 bg-primary rounded-full shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}