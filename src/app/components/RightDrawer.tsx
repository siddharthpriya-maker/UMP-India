import { useEffect, useCallback, type ReactNode } from "react";
import { X } from "lucide-react";

interface RightDrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: number;
}

export function RightDrawer({
  open,
  onClose,
  children,
  width = 420,
}: RightDrawerProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#101010]/50 transition-opacity"
        onClick={onClose}
      />
      {/* Drawer panel */}
      <div
        className="relative bg-white h-full flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.08)] animate-slide-in-right"
        style={{ width }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Header ────────────────────────────────────────────────── */

interface DrawerHeaderProps {
  onClose: () => void;
  actions?: ReactNode;
}

export function DrawerHeader({ onClose, actions }: DrawerHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 pt-5 pb-3 shrink-0">
      <button
        onClick={onClose}
        className="size-8 flex items-center justify-center rounded-[4px] hover:bg-[#f5f9fe] transition-colors"
      >
        <X className="size-5 text-[#101010]" />
      </button>
      {actions && (
        <div className="flex items-center gap-4">
          {actions}
        </div>
      )}
    </div>
  );
}

/* ── Scrollable body ───────────────────────────────────────── */

export function DrawerBody({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 overflow-y-auto">
      {children}
    </div>
  );
}

/* ── Hero: amount + status badge ───────────────────────────── */

type StatusVariant = "success" | "pending" | "failed" | "submitted";

const statusConfig: Record<StatusVariant, { bg: string; icon: string }> = {
  success: { bg: "text-[#21c179]", icon: "✓" },
  pending: { bg: "text-[#ff9d00]", icon: "⏳" },
  failed: { bg: "text-[#fd5154]", icon: "✕" },
  submitted: { bg: "text-[#004299]", icon: "↗" },
};

interface DrawerHeroProps {
  title: string;
  amount: string;
  subtitle?: string;
  status?: StatusVariant;
}

export function DrawerHero({ title, amount, subtitle, status }: DrawerHeroProps) {
  return (
    <div className="flex items-start justify-between px-6 pb-5">
      <div className="flex flex-col gap-0.5">
        <span className="text-[14px] font-semibold text-[#101010]">{title}</span>
        <span className="text-[32px] font-bold text-[#101010] leading-[40px]">{amount}</span>
        {subtitle && (
          <span className="text-[12px] text-[#7e7e7e]">{subtitle}</span>
        )}
      </div>
      {status && (
        <div
          className={`size-10 rounded-full flex items-center justify-center text-[20px] shrink-0 ${
            status === "success"
              ? "bg-[#e3f6ec]"
              : status === "pending"
                ? "bg-[#fff4e0]"
                : status === "failed"
                  ? "bg-[#ffebef]"
                  : "bg-[#e7f1f8]"
          }`}
        >
          <span className={statusConfig[status].bg}>{statusConfig[status].icon}</span>
        </div>
      )}
    </div>
  );
}

/* ── Info banner (e.g. reward points note) ─────────────────── */

interface DrawerBannerProps {
  children: ReactNode;
  variant?: "info" | "warning" | "success";
}

export function DrawerBanner({ children, variant = "info" }: DrawerBannerProps) {
  const bgMap = {
    info: "bg-[#e7f1f8] border-[#004299]",
    warning: "bg-[#fff4e0] border-[#ff9d00]",
    success: "bg-[#e3f6ec] border-[#21c179]",
  };

  return (
    <div className={`mx-6 mb-4 px-4 py-3 rounded-[8px] border-l-[3px] ${bgMap[variant]}`}>
      {children}
    </div>
  );
}

/* ── Section header (e.g. "CUSTOMER DETAILS") ──────────────── */

export function DrawerSectionHeader({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#f5f9fe] px-6 py-2.5">
      <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold">
        {children}
      </span>
    </div>
  );
}

/* ── Key-value row ─────────────────────────────────────────── */

interface DrawerRowProps {
  label: string;
  value: ReactNode;
  bold?: boolean;
  copyable?: boolean;
}

export function DrawerRow({ label, value, bold }: DrawerRowProps) {
  return (
    <div className="flex items-start justify-between px-6 py-2.5 gap-4">
      <span className="text-[14px] text-[#7e7e7e] shrink-0">{label}</span>
      <span
        className={`text-[14px] text-right ${
          bold ? "font-semibold text-[#101010]" : "text-[#101010]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/* ── Action row (e.g. "Initiate Refund") ───────────────────── */

interface DrawerActionRowProps {
  icon?: ReactNode;
  label: string;
  onClick?: () => void;
}

export function DrawerActionRow({ icon, label, onClick }: DrawerActionRowProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full px-6 py-3.5 border-t border-b border-[#e0e0e0] hover:bg-[#f5f9fe] transition-colors"
    >
      <div className="flex items-center gap-3">
        {icon && <span className="text-[#004299]">{icon}</span>}
        <span className="text-[14px] font-semibold text-[#101010]">{label}</span>
      </div>
      <span className="text-[#7e7e7e]">›</span>
    </button>
  );
}

/* ── Card block (e.g. "AMOUNT DETAILS", "SETTLEMENT INVOICE") ──── */

interface DrawerCardProps {
  title?: string;
  children: ReactNode;
}

export function DrawerCard({ title, children }: DrawerCardProps) {
  return (
    <div className="mx-6 my-4 border border-[#e0e0e0] rounded-[8px] overflow-hidden">
      {title && (
        <div className="bg-[#fafafa] px-4 py-2.5 border-b border-[#e0e0e0]">
          <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold">
            {title}
          </span>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

/* ── Card row (inside DrawerCard) ──────────────────────────── */

interface DrawerCardRowProps {
  label: string;
  value: ReactNode;
  bold?: boolean;
  indent?: boolean;
  separator?: boolean;
}

export function DrawerCardRow({
  label,
  value,
  bold,
  indent,
  separator,
}: DrawerCardRowProps) {
  return (
    <div
      className={`flex items-start justify-between px-4 py-2.5 gap-4 ${
        separator ? "border-t border-[#e0e0e0]" : ""
      }`}
    >
      <span
        className={`text-[14px] ${indent ? "pl-4" : ""} ${
          bold ? "font-semibold text-[#101010]" : "text-[#7e7e7e]"
        }`}
      >
        {label}
      </span>
      <span
        className={`text-[14px] text-right ${
          bold ? "font-semibold text-[#101010]" : "text-[#101010]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
