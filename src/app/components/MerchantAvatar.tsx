import { cn } from "./ui/utils";
import {
  ensureTwoLetterAvatar,
  twoLetterInitialsFromEmail,
  twoLetterInitialsFromName,
} from "../lib/avatarInitials";

export type MerchantAvatarProps = {
  /** Used for `aria-label` and to derive initials when `initialsOverride` is omitted */
  nameOrEmail: string;
  /** Optional explicit initials (e.g. header prop); normalized with `ensureTwoLetterAvatar` */
  initialsOverride?: string;
  className?: string;
};

function initialsFromProps(nameOrEmail: string, initialsOverride?: string): string {
  if (initialsOverride != null && initialsOverride.trim() !== "") {
    return ensureTwoLetterAvatar(initialsOverride.trim());
  }
  const trimmed = nameOrEmail.trim();
  if (!trimmed) return "—";
  return ensureTwoLetterAvatar(
    trimmed.includes("@") ? twoLetterInitialsFromEmail(trimmed) : twoLetterInitialsFromName(trimmed),
  );
}

/** Merchant identity chip — single surface: `border-[#e0e0e0] bg-[#ebebeb]`, two-letter initials (no photo). */
export function MerchantAvatar({ nameOrEmail, initialsOverride, className }: MerchantAvatarProps) {
  const initials = initialsFromProps(nameOrEmail, initialsOverride);
  const ariaLabel = nameOrEmail.trim() || initials;

  return (
    <div
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full border border-[#e0e0e0] bg-[#ebebeb]",
        className,
      )}
      role="img"
      aria-label={ariaLabel}
    >
      <span className="block text-center text-[12px] font-bold leading-none tracking-tight text-[#101010]">
        {initials}
      </span>
    </div>
  );
}
