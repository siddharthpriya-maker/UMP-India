import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { PrimaryButton } from "./Button";
import { cn } from "./ui/utils";
import {
  ensureTwoLetterAvatar,
  twoLetterInitialsFromEmail,
  twoLetterInitialsFromName,
} from "../lib/avatarInitials";
import {
  HEADER_ACCOUNT_MERCHANTS,
  MERCHANT_SECTION_TITLES,
  type HeaderMerchantOption,
  type MerchantShellSectionId,
} from "./headerAccountMenu.constants";

function merchantMatchesQuery(m: HeaderMerchantOption, q: string): boolean {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  const initials = twoLetterInitialsFromName(m.name).toLowerCase();
  return (
    m.name.toLowerCase().includes(s) ||
    m.mid.toLowerCase().includes(s) ||
    initials.includes(s)
  );
}

export type HeaderAccountMenuProps = {
  /** Signed-in user email shown at top of the panel */
  userEmail: string;
  /** Short label for the header avatar ring (defaults from `userEmail`) */
  avatarInitials?: string;
  /** Optional — notify parent when user confirms Logout */
  onLogout?: () => void;
};

export function HeaderAccountMenu({
  userEmail,
  avatarInitials: avatarInitialsProp,
  onLogout,
}: HeaderAccountMenuProps) {
  const [open, setOpen] = useState(false);
  const [merchantSearch, setMerchantSearch] = useState("");
  const [selectedMerchantId, setSelectedMerchantId] = useState<string>(
    () => HEADER_ACCOUNT_MERCHANTS[0]?.id ?? "",
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const avatarInitials = ensureTwoLetterAvatar(
    avatarInitialsProp ?? twoLetterInitialsFromEmail(userEmail),
  );

  const filteredBySection = useMemo(() => {
    const qr = HEADER_ACCOUNT_MERCHANTS.filter(
      (m) => m.section === "qr" && merchantMatchesQuery(m, merchantSearch),
    );
    const corporate = HEADER_ACCOUNT_MERCHANTS.filter(
      (m) => m.section === "corporate" && merchantMatchesQuery(m, merchantSearch),
    );
    return { qr, corporate };
  }, [merchantSearch]);

  const dismiss = useCallback(() => {
    setOpen(false);
    setMerchantSearch("");
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        dismiss();
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, dismiss]);

  const renderSection = (section: MerchantShellSectionId, items: HeaderMerchantOption[]) => {
    if (items.length === 0) return null;
    return (
      <div className="flex flex-col gap-1">
        <p className="px-3 pt-1 text-[14px] font-semibold leading-[20px] text-[#101010]">
          {MERCHANT_SECTION_TITLES[section]}
        </p>
        <div className="flex flex-col gap-1" role="radiogroup" aria-label={MERCHANT_SECTION_TITLES[section]}>
          {items.map((m) => {
            const selected = selectedMerchantId === m.id;
            return (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setSelectedMerchantId(m.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-[12px] px-3 py-3 text-left transition-colors",
                  selected ? "bg-[#e0f5fd]" : "bg-white hover:bg-[#fafafa]",
                )}
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#e0e0e0] bg-[#ebebeb]">
                  <span className="text-center text-[12px] font-bold leading-none tracking-tight text-[#101010]">
                    {twoLetterInitialsFromName(m.name)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold leading-[20px] text-[#101010]">{m.name}</p>
                  <p className="mt-0.5 truncate text-[12px] leading-4 text-[#7e7e7e]">MID: {m.mid}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="relative shrink-0" ref={rootRef}>
      <button
        type="button"
        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#e0e0e0] bg-[#f5f9fe] transition-colors hover:bg-[#f5f9fe]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-2"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? menuId : undefined}
        onClick={() => (open ? dismiss() : setOpen(true))}
      >
        <span className="block text-center text-[11px] font-bold leading-none tracking-tight text-[#101010] md:text-xs">
          {avatarInitials}
        </span>
      </button>

      {open ? (
        <div
          id={menuId}
          role="dialog"
          aria-label="Account and merchants"
          className="absolute right-0 top-[calc(100%+8px)] z-[200] w-[min(calc(100vw-2rem),380px)] overflow-hidden rounded-[12px] border border-[#e0e0e0] bg-white shadow-[0_8px_24px_rgba(16,16,16,0.12)]"
        >
          <div className="flex max-h-[min(560px,calc(100vh-120px))] flex-col overflow-y-auto px-4 pb-3 pt-4">
            <p className="break-all text-[14px] font-normal leading-5 text-[#004299]">{userEmail}</p>

            <div className="relative mt-4">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#7e7e7e]"
                aria-hidden
              />
              <input
                type="search"
                value={merchantSearch}
                onChange={(e) => setMerchantSearch(e.target.value)}
                placeholder="Search Merchant"
                autoComplete="off"
                aria-label="Search by business name or merchant ID"
                className="w-full rounded-lg border border-[#e0e0e0] bg-white py-2.5 pl-9 pr-3 text-[14px] leading-5 text-[#101010] outline-none placeholder:text-[#7e7e7e] focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-0"
              />
            </div>

            <div className="mt-5 flex flex-col gap-5">
              {renderSection("qr", filteredBySection.qr)}
              {filteredBySection.qr.length > 0 && filteredBySection.corporate.length > 0 ? (
                <div className="h-px w-full bg-[#e0e0e0]" role="separator" />
              ) : null}
              {renderSection("corporate", filteredBySection.corporate)}
            </div>

            {filteredBySection.qr.length === 0 && filteredBySection.corporate.length === 0 ? (
              <p className="mt-4 px-1 text-[14px] leading-5 text-[#7e7e7e]">No merchants match your search.</p>
            ) : null}
          </div>

          <div className="border-t border-[#e0e0e0]">
            <PrimaryButton
              type="button"
              size="medium"
              fullWidth
              className="min-h-0 w-full min-w-0 rounded-none border-0 py-3.5 text-[14px] font-semibold leading-5"
              onClick={() => {
                onLogout?.();
                dismiss();
              }}
            >
              Logout
            </PrimaryButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}
