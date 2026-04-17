import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "./Button";
import { Pagination } from "./Pagination";
import {
  MailOutlinedIcon,
  DownloadOutlinedIcon,
  LinkIcon,
  SettingIcon,
  FailedFilledRedIcon,
} from "./Icons";
import { ReportMenu } from "./ReportMenu";

type ReportConfig = {
  title: string;
  note: string;
  filters: { label: string; options: string[]; default: string }[];
};

const REPORT_CONFIGS: Record<string, ReportConfig> = {
  payment: {
    title: "Payment Reports",
    note: "Data is available for the last 18 months (5 Feb 2021 – today). Each report can cover at most one month.",
    filters: [
      { label: "Duration of Collections", options: ["1 Jan 2022 -31 Jan 2022", "1 Feb 2022 -28 Feb 2022", "1 Mar 2022 -31 Mar 2022"], default: "1 Jan 2022 -31 Jan 2022" },
      { label: "Payment Status", options: ["All", "Success", "Failed", "Pending"], default: "Success" },
    ],
  },
  settlement: {
    title: "Settlement Reports",
    note: "Data is available for the last 18 months. Each report can cover at most one month.",
    filters: [
      { label: "Duration", options: ["1 Jan 2022 -31 Jan 2022", "1 Feb 2022 -28 Feb 2022"], default: "1 Jan 2022 -31 Jan 2022" },
      { label: "Settlement Status", options: ["All", "Settled", "Pending"], default: "All" },
    ],
  },
  refund: {
    title: "Refund Reports",
    note: "Data is available for the last 18 months. Each report can cover at most one month.",
    filters: [
      { label: "Duration", options: ["1 Jan 2022 -31 Jan 2022", "1 Feb 2022 -28 Feb 2022"], default: "1 Jan 2022 -31 Jan 2022" },
      { label: "Refund Status", options: ["All", "Success", "Failed"], default: "All" },
    ],
  },
  dispute: {
    title: "Dispute Reports",
    note: "Data is available for the last 12 months. Each report can cover at most one month.",
    filters: [
      { label: "Duration", options: ["1 Jan 2022 -31 Jan 2022", "1 Feb 2022 -28 Feb 2022"], default: "1 Jan 2022 -31 Jan 2022" },
    ],
  },
  balance_statement: {
    title: "Balance Statement Reports",
    note: "Data is available for the last 18 months. Each report can cover at most one month.",
    filters: [
      { label: "Duration", options: ["1 Jan 2022 -31 Jan 2022", "1 Feb 2022 -28 Feb 2022"], default: "1 Jan 2022 -31 Jan 2022" },
    ],
  },
  ncmc_recharge: {
    title: "NCMC Recharge Reports",
    note: "Data is available for the last 6 months. Each report can cover at most one month.",
    filters: [
      { label: "Duration", options: ["1 Jan 2022 -31 Jan 2022", "1 Feb 2022 -28 Feb 2022"], default: "1 Jan 2022 -31 Jan 2022" },
    ],
  },
  links: {
    title: "Links Reports",
    note: "Data is available for the last 18 months. Each report can cover at most one month.",
    filters: [
      { label: "Duration", options: ["1 Jan 2022 -31 Jan 2022", "1 Feb 2022 -28 Feb 2022"], default: "1 Jan 2022 -31 Jan 2022" },
      { label: "Link Status", options: ["All", "Active", "Expired"], default: "All" },
    ],
  },
};

type RecentReport = {
  id: number;
  generationDate: string;
  reportType: string;
  reportSubtype: string;
  duration: string;
  selectedSubMerchants: string;
  status: "success" | "failed";
};

const mockRecentReports: RecentReport[] = [
  { id: 1, generationDate: "12 Feb 2022", reportType: "Refund Detailed Excel", reportSubtype: "All Refund", duration: "1 Jan 2022 -31 Jan 2022", selectedSubMerchants: "20 selected", status: "success" },
  { id: 2, generationDate: "12 Feb 2022", reportType: "Settlements Report", reportSubtype: "", duration: "1 Jan 2022 -31 Jan 2022", selectedSubMerchants: "20 selected", status: "success" },
  { id: 3, generationDate: "12 Feb 2022", reportType: "Payment Summary PDF", reportSubtype: "All payments", duration: "1 Jan 2022 -31 Jan 2022", selectedSubMerchants: "20 selected", status: "success" },
  { id: 4, generationDate: "12 Feb 2022", reportType: "Refund Detailed Excel", reportSubtype: "All refunds", duration: "1 Jan 2022 -31 Jan 2022", selectedSubMerchants: "20 selected", status: "failed" },
  { id: 5, generationDate: "12 Feb 2022", reportType: "Refund Detailed Excel", reportSubtype: "Success refunds", duration: "1 Jan 2022 -31 Jan 2022", selectedSubMerchants: "20 selected", status: "success" },
  { id: 6, generationDate: "12 Feb 2022", reportType: "Payment Summary PDF", reportSubtype: "Failed payments", duration: "1 Jan 2022 -31 Jan 2022", selectedSubMerchants: "20 selected", status: "success" },
];

export function ReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState("payment");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [openFilterIndex, setOpenFilterIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  const filterDropdownRef = useRef<HTMLDivElement>(null);

  const config = REPORT_CONFIGS[selectedCategory];

  useEffect(() => {
    const defaults: Record<string, string> = {};
    config.filters.forEach((f) => { defaults[f.label] = f.default; });
    setFilterValues(defaults);
    setOpenFilterIndex(null);
  }, [selectedCategory]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target as Node)) {
        setOpenFilterIndex(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const reportCard = "rounded-[12px] border border-[#e0e0e0] bg-white";

  return (
    <div className="flex min-h-full flex-col bg-white pb-8 pt-3">
      <div className="px-[32px] pb-4">
        <h1 className="text-[32px] font-semibold text-[#101010]">Reports</h1>
      </div>

      <div className="flex flex-col gap-4 px-[32px]">
        {/* Top: report type menu + configuration (two cards, no separators) */}
        <div className="flex min-h-[320px] flex-col gap-4 lg:flex-row lg:items-stretch">
          <div className={`shrink-0 lg:w-[260px] ${reportCard} overflow-hidden p-3`}>
            <ReportMenu
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          <div className={`flex min-h-0 min-w-0 flex-1 flex-col gap-5 p-6 ${reportCard}`}>
          {/* Header row: title + manage settings */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-3">
              <h2 className="text-[20px] font-medium text-[#101010]">{config.title}</h2>
              <div
                className="rounded-[8px] bg-[#fff4e0] px-4 py-3 max-w-[720px]"
                role="note"
              >
                <p className="text-[14px] font-semibold text-[#101010] leading-[20px] mb-1">Please note</p>
                <p className="text-[14px] text-[#7e7e7e] leading-[24px]">{config.note}</p>
              </div>
            </div>

            <SecondaryButton
              size="medium"
              type="button"
              icon={<SettingIcon className="size-5" />}
              className="shrink-0 whitespace-nowrap"
            >
              Manage report settings
            </SecondaryButton>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-6 items-end" ref={filterDropdownRef}>
            {config.filters.map((filter, idx) => (
              <div key={filter.label} className="flex flex-col gap-[2px]">
                <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold">
                  {filter.label}
                </span>
                <div className="relative">
                  <button
                    className={`flex items-center gap-2 text-[14px] text-[#101010] font-semibold hover:bg-[#f5f9fe] rounded px-1 py-0.5 transition-colors ${
                      openFilterIndex === idx ? "bg-[#f5f9fe]" : ""
                    }`}
                    onClick={() => setOpenFilterIndex(openFilterIndex === idx ? null : idx)}
                  >
                    <span>{filterValues[filter.label] || filter.default}</span>
                    <ChevronDown className={`size-4 transition-transform ${openFilterIndex === idx ? "rotate-180" : ""}`} />
                  </button>
                  {openFilterIndex === idx && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-[#e0e0e0] rounded-lg shadow-lg min-w-[200px] z-10">
                      <div className="py-1">
                        {filter.options.map((opt) => (
                          <button
                            key={opt}
                            className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#f5f9fe] transition-colors"
                            onClick={() => {
                              setFilterValues({ ...filterValues, [filter.label]: opt });
                              setOpenFilterIndex(null);
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Multiple Filters */}
          <button className="text-[14px] text-[#004299] font-medium hover:text-[#009de5] transition-colors self-start">
            +Add Multiple Filters
          </button>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-auto pt-2">
            <PrimaryButton size="medium">
              Generate Report
            </PrimaryButton>
            <SecondaryButton size="medium" icon={<MailOutlinedIcon />}>
              Send to Email
            </SecondaryButton>
          </div>
        </div>
        </div>

        {/* Recently Generated Reports — card = listing only; pagination sits below outside the card */}
        <div className="flex min-w-0 flex-col gap-0">
        <div className={`flex min-w-0 flex-col overflow-hidden ${reportCard}`}>
        <h2 className="text-[20px] font-medium text-[#101010] px-6 pt-6 pb-4">Recently Generated Reports</h2>

          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
            {/* Listing header — #EBEBEB bar + primary dark text */}
            <div className="grid grid-cols-[180px_1fr_200px_180px_160px] gap-4 bg-[#EBEBEB] px-6 py-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.6px] leading-[16px] text-[#101010] whitespace-nowrap">
                Report Generation Date
              </span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.6px] leading-[16px] text-[#101010]">
                Report Type
              </span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.6px] leading-[16px] text-[#101010]">
                Duration
              </span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.6px] leading-[16px] text-[#101010] whitespace-nowrap">
                Selected Sub-Merchants
              </span>
              <span className="text-right text-[12px] font-semibold uppercase tracking-[0.6px] leading-[16px] text-[#101010]">
                Actions
              </span>
            </div>

            {/* Rows: zebra #fff / #fafafa, no row borders */}
            {mockRecentReports.map((report, index) => (
              <div
                key={report.id}
                className={`grid grid-cols-[180px_1fr_200px_180px_160px] gap-4 px-6 py-4 transition-colors items-center ${
                  index % 2 === 0 ? "bg-white" : "bg-[#fafafa]"
                } hover:bg-[#f5f9fe]`}
              >
                <span className="text-[14px] text-[#101010] leading-[24px]">
                  {report.generationDate}
                </span>

                <div className="flex flex-col">
                  <span className="text-[14px] text-[#101010] leading-[24px]">{report.reportType}</span>
                  {report.reportSubtype && (
                    <span className="text-[12px] text-[#7e7e7e] leading-[18px]">{report.reportSubtype}</span>
                  )}
                </div>

                <span className="text-[14px] text-[#101010] leading-[24px]">
                  {report.duration}
                </span>

                <span className="text-[14px] text-[#101010] leading-[24px]">
                  {report.selectedSubMerchants}
                </span>

                <div className="flex items-center justify-end gap-3">
                  {report.status === "success" ? (
                    <>
                      <button className="text-[#7e7e7e] hover:text-[#004299] transition-colors" title="Send to email">
                        <MailOutlinedIcon className="size-5" />
                      </button>
                      <button className="text-[#7e7e7e] hover:text-[#004299] transition-colors" title="Download">
                        <DownloadOutlinedIcon className="size-5" />
                      </button>
                      <button className="text-[#7e7e7e] hover:text-[#004299] transition-colors" title="Copy link">
                        <LinkIcon className="size-5" />
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <FailedFilledRedIcon className="size-4" />
                      <span className="text-[14px] text-[#101010]">Failed.</span>
                      <button className="text-[14px] text-[#004299] font-medium hover:text-[#009de5] transition-colors">
                        Try Again
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={() => setCurrentPage((p) => Math.max(1, p - 1))}
          onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        />
        </div>
      </div>
    </div>
  );
}
