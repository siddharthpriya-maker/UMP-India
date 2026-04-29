import { useState } from "react";
import { useLocation } from "react-router";
import svgPaths from "../../imports/svg-9d73oqi9lc";
import { RotatingSearchSuffix } from "./RotatingSearchSuffix";
import { HeaderAccountMenu } from "./HeaderAccountMenu";
import { cn } from "./ui/utils";

/** Paytm for Business support (new tab). */
const PAYTM_BUSINESS_SUPPORT_URL =
  "https://business.paytm.com/support?_gl=1*nqgujb*_gcl_au*NjA1OTk4ODkuMTc3MjA4ODg4NQ..*_ga*MTg2MDIwNDkzNC4xNzcyMDg4ODg2*_ga_LSKTYTR270*czE3NzY3NjI5ODckbzE3JGcxJHQxNzc2NzYyOTk1JGo1MiRsMCRoMA..";

/** Same path as `src/assets/icons/close_circle.svg` — keep in sync when the asset changes. */
const CLOSE_CIRCLE_ICON_PATH =
  "M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM15.0003 8.9997C15.2932 9.29259 15.2932 9.76747 15.0003 10.0604L13.0607 12L15.0003 13.9397C15.2932 14.2326 15.2932 14.7075 15.0003 15.0004C14.7074 15.2933 14.2326 15.2933 13.9397 15.0004L12 13.0607L10.0603 15.0004C9.76744 15.2933 9.29256 15.2933 8.99967 15.0004C8.70678 14.7075 8.70678 14.2326 8.99967 13.9397L10.9393 12L8.99967 10.0604C8.70678 9.76747 8.70678 9.29259 8.99967 8.9997C9.29256 8.70681 9.76744 8.70681 10.0603 8.9997L12 10.9394L13.9397 8.9997C14.2326 8.70681 14.7074 8.70681 15.0003 8.9997Z";

function SearchClearIcon() {
  return (
    <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d={CLOSE_CIRCLE_ICON_PATH} />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="size-6 shrink-0" fill="none" viewBox="0 0 24 24">
      <path clipRule="evenodd" d={svgPaths.p38c95280} fill="#101010" fillRule="evenodd" />
      <path clipRule="evenodd" d={svgPaths.peea3f00} fill="#101010" fillRule="evenodd" />
    </svg>
  );
}

export type HeaderProps = {
  /**
   * Storybook **component preview** only: show the same search affordances as merchant shells
   * (rotating “Search for a …” hint) while the real URL is still `/storybook`. Do not nest another
   * router for this — nested routers can blank the app under `BrowserRouter`.
   */
  embeddedMerchantSearch?: boolean;
  /** Profile menu — signed-in email (replace when auth is wired). */
  accountUserEmail?: string;
  accountAvatarInitials?: string;
  onAccountLogout?: () => void;
};

export function Header({
  embeddedMerchantSearch = false,
  accountUserEmail,
  accountAvatarInitials,
  onAccountLogout,
}: HeaderProps) {
  const [query, setQuery] = useState("");
  const { pathname } = useLocation();
  const storybookRoute = pathname === "/storybook";
  /** Catalog search copy + pill border — global Storybook shell only, not embedded previews. */
  const useStorybookCatalogSearchUi = storybookRoute && !embeddedMerchantSearch;

  return (
    <div
      className={cn(
        "flex w-full shrink-0 flex-col items-start gap-4 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8",
        storybookRoute && "bg-transparent",
      )}
    >
      <div
        className={cn(
          "flex max-h-[56px] w-full items-center gap-3 overflow-clip rounded-[100px] bg-[#f5f9fe] p-3 md:gap-4 md:p-4 md:w-auto md:max-w-[560px] md:min-w-[300px] lg:w-[560px]",
          useStorybookCatalogSearchUi && "border border-[#e0e0e0]",
        )}
      >
        <SearchIcon />
        <div className="flex min-h-px min-w-0 flex-1 items-center gap-1">
          <div className="relative min-w-0 flex-1">
            <input
              type="text"
              role="searchbox"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={
                useStorybookCatalogSearchUi
                  ? "Search Storybook components and learnings"
                  : "Search for a transaction ID, refund ID, order ID, or topic"
              }
              className={cn(
                "relative z-10 w-full border-none bg-transparent text-sm font-medium leading-5 outline-none md:text-base",
                query === "" ? "text-transparent caret-[#101010]" : "text-[#101010]"
              )}
            />
            {query === "" ? (
              <div
                className="pointer-events-none absolute inset-0 z-0 flex min-w-0 items-center gap-0 pr-1 text-sm font-medium leading-5 text-[#7e7e7e] md:text-base"
                aria-hidden
              >
                {useStorybookCatalogSearchUi ? (
                  <span className="min-w-0 truncate">Search components and learnings</span>
                ) : (
                  <>
                    <span className="shrink-0">Search for a&nbsp;</span>
                    <RotatingSearchSuffix />
                  </>
                )}
              </div>
            ) : null}
          </div>
          {query.length > 0 ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="shrink-0 rounded-full p-0.5 text-[#101010] hover:bg-black/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-2"
              aria-label="Clear search"
            >
              <SearchClearIcon />
            </button>
          ) : null}
        </div>
      </div>
      <div className="flex w-full flex-1 items-center justify-end gap-4 py-2 md:gap-6 lg:gap-8 md:w-auto">
        <div className="hidden items-center gap-4 py-2 md:flex lg:gap-8">
          <button type="button" className="flex items-center justify-center py-0.5">
            <p className="text-center text-sm leading-5 text-[#444746] lg:text-base">Whats New</p>
          </button>
          <a
            href={PAYTM_BUSINESS_SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-2 rounded-sm"
          >
            <span className="text-center text-sm leading-5 text-[#444746] lg:text-base">Need Help?</span>
          </a>
        </div>
        <HeaderAccountMenu
          userEmail={accountUserEmail ?? "siddharth.priya@paytm.com"}
          avatarInitials={accountAvatarInitials}
          onLogout={onAccountLogout}
        />
      </div>
    </div>
  );
}
