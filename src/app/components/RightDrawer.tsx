import { useEffect, useCallback, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Clock, X, XCircle } from "lucide-react";
import SuccessSmall from "../../imports/SuccessSmall";

function getAppProductFrame(): HTMLElement | null {
  if (typeof document === "undefined") return null;
  return document.querySelector(".app-product-frame");
}

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
  width = 520,
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

  const frame = getAppProductFrame();
  const outerPositionClass = "inset-0 z-50 flex justify-end";

  const shell = (
    <div className={frame ? `absolute ${outerPositionClass}` : `fixed ${outerPositionClass}`}>
      {/* Overlay — dims full UMP panel (16:9 frame), not the letterbox */}
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

  if (frame) {
    return createPortal(shell, frame);
  }

  return shell;
}

/* ── Header ────────────────────────────────────────────────── */

interface DrawerHeaderProps {
  onClose: () => void;
  actions?: ReactNode;
}

export function DrawerHeader({ onClose, actions }: DrawerHeaderProps) {
  return (
    <div className="flex min-h-8 items-center justify-between gap-4 px-8 pt-5 pb-3 shrink-0">
      <button
        type="button"
        onClick={onClose}
        className="flex h-8 w-8 shrink-0 items-center justify-start text-[#101010] hover:opacity-70 transition-opacity"
        aria-label="Close"
      >
        <X className="size-5 shrink-0" strokeWidth={1.75} aria-hidden />
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

interface DrawerHeroProps {
  title: string;
  amount: string;
  subtitle?: string;
  status?: StatusVariant;
}

/** All drawer hero status glyphs: 40×40px, no tile background (`icons.mdc` / UMP right drawer). */
function DrawerHeroStatusIcon({ status }: { status: StatusVariant }) {
  switch (status) {
    case "success":
      return (
        <div className="size-10 shrink-0" aria-hidden>
          <SuccessSmall />
        </div>
      );
    case "pending":
      return (
        <Clock className="size-10 shrink-0 text-[#ff9d00]" aria-hidden strokeWidth={1.75} />
      );
    case "failed":
      return (
        <XCircle className="size-10 shrink-0 text-[#fd5154]" aria-hidden strokeWidth={1.75} />
      );
    case "submitted":
      return (
        <ArrowUpRight
          className="size-10 shrink-0 text-[#004299]"
          aria-hidden
          strokeWidth={1.75}
        />
      );
  }
}

export function DrawerHero({ title, amount, subtitle, status }: DrawerHeroProps) {
  return (
    <div className="flex flex-col gap-0.5 px-8 pb-5">
      <span className="whitespace-pre-line text-[14px] font-semibold text-[#101010]">
        {title}
      </span>
      <div className="flex items-center justify-between gap-4">
        <span className="min-w-0 text-[32px] font-bold leading-[40px] text-[#101010]">
          {amount}
        </span>
        {status ? <DrawerHeroStatusIcon status={status} /> : null}
      </div>
      {subtitle && (
        <span className="text-[12px] text-[#7e7e7e]">{subtitle}</span>
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
    <div className={`mx-8 mb-4 px-4 py-3 rounded-[8px] border-l-[3px] ${bgMap[variant]}`}>
      {children}
    </div>
  );
}

/* ── Section header (e.g. "CUSTOMER DETAILS") ──────────────── */

export function DrawerSectionHeader({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#f5f9fe] px-8 py-2.5">
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
    <div className="flex items-start justify-between px-8 py-2.5 gap-4">
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
      className="flex items-center justify-between w-full px-8 py-3.5 border-t border-b border-[#e0e0e0] hover:bg-[#f5f9fe] transition-colors"
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
    <div className="mx-8 my-4 border border-[#e0e0e0] rounded-[8px] overflow-hidden">
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
