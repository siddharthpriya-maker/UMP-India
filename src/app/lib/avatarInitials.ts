/**
 * Two-letter avatar glyphs when no photo is available (shared header + merchant lists).
 */

/** First letter of first word + first letter of last word; single word → first two letters; one char → duplicated. */
export function twoLetterInitialsFromName(name: string): string {
  const cleaned = name.trim().replace(/\s+/g, " ");
  if (!cleaned) return "—";
  const words = cleaned.split(" ").filter(Boolean);
  if (words.length >= 2) {
    const first = words[0]?.[0] ?? "";
    const last = words[words.length - 1]?.[0] ?? "";
    return `${first}${last}`.toUpperCase();
  }
  const w = words[0] ?? "";
  if (w.length >= 2) return w.slice(0, 2).toUpperCase();
  if (w.length === 1) return `${w[0]!}${w[0]!}`.toUpperCase();
  return "—";
}

/** Local-part before @: split on . _ - → two initials; single segment → first two letters or duplicate single char. */
export function twoLetterInitialsFromEmail(email: string): string {
  const local = email.split("@")[0]?.trim() ?? "";
  if (!local) return "—";
  const parts = local.split(/[._-]+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase().slice(0, 2);
  }
  const one = parts[0] ?? local;
  if (one.length >= 2) return one.slice(0, 2).toUpperCase();
  if (one.length === 1) return `${one[0]!}${one[0]!}`.toUpperCase();
  return "—";
}

/** Forces exactly two visible glyphs for manual overrides (e.g. prop). */
export function ensureTwoLetterAvatar(label: string): string {
  const alnum = label.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  if (alnum.length >= 2) return alnum.slice(0, 2);
  if (alnum.length === 1) return `${alnum}${alnum}`;
  return "—";
}
