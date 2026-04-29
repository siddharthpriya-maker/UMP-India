export type MerchantShellSectionId = "qr" | "corporate";

export type HeaderMerchantOption = {
  id: string;
  section: MerchantShellSectionId;
  name: string;
  mid: string;
};

/** Demo catalogue — replace with API/context when wiring merchant switching. */
export const HEADER_ACCOUNT_MERCHANTS: HeaderMerchantOption[] = [
  {
    id: "qr-siddharth-priya",
    section: "qr",
    name: "Siddharth Priya",
    mid: "TGUUoF56178296757890",
  },
  {
    id: "corp-paytm-test",
    section: "corporate",
    name: "Paytm Test",
    mid: "PaytmT15396612289012",
  },
];

export const MERCHANT_SECTION_TITLES: Record<MerchantShellSectionId, string> = {
  qr: "QR Transactions Dashboard",
  corporate: "Corporate Solution Transactions Dashboard",
};
