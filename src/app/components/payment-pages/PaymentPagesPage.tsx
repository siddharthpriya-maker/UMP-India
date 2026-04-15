import { useState, useRef, useEffect } from "react";
import { Plus, ChevronDown, MoreVertical, Search } from "lucide-react";
import type { PaymentPage, PageStatus, BuilderStep, PageInfo } from "./types";
import { CreatePageEntry } from "./CreatePageEntry";
import { PageInfoForm } from "./PageInfoForm";
import { PageBuilder } from "./PageBuilder";
import { AdditionalSettings } from "./AdditionalSettings";

const mockPages: PaymentPage[] = [
  {
    id: "1",
    name: "Spring Semester Fees 2026",
    urlPath: "pay/spring-semester-2026",
    htmlTitle: "Spring Semester Fees",
    status: "active",
    createdAt: "12 Mar 2026",
    totalPayments: 1247,
    totalAmount: 62_35_000,
  },
  {
    id: "2",
    name: "Annual Charity Gala Donations",
    urlPath: "pay/charity-gala-2026",
    htmlTitle: "Charity Gala Donations",
    status: "active",
    createdAt: "08 Mar 2026",
    totalPayments: 389,
    totalAmount: 19_45_000,
  },
  {
    id: "3",
    name: "Tech Conference 2026 Tickets",
    urlPath: "pay/tech-conf-2026",
    htmlTitle: "Tech Conference Tickets",
    status: "expired",
    createdAt: "01 Feb 2026",
    totalPayments: 850,
    totalAmount: 42_50_000,
  },
  {
    id: "4",
    name: "Handmade Crafts Store",
    urlPath: "pay/handmade-crafts",
    htmlTitle: "Handmade Crafts",
    status: "active",
    createdAt: "20 Jan 2026",
    totalPayments: 2103,
    totalAmount: 8_41_200,
  },
  {
    id: "5",
    name: "Yoga Retreat Registration",
    urlPath: "pay/yoga-retreat-apr",
    htmlTitle: "Yoga Retreat April",
    status: "draft",
    createdAt: "15 Mar 2026",
    totalPayments: 0,
    totalAmount: 0,
  },
  {
    id: "6",
    name: "Music Festival Passes",
    urlPath: "pay/music-fest-2025",
    htmlTitle: "Music Festival 2025",
    status: "expired",
    createdAt: "10 Nov 2025",
    totalPayments: 3200,
    totalAmount: 96_00_000,
  },
  {
    id: "7",
    name: "Coaching Institute Monthly",
    urlPath: "pay/coaching-monthly",
    htmlTitle: "Monthly Coaching Fees",
    status: "active",
    createdAt: "05 Mar 2026",
    totalPayments: 156,
    totalAmount: 4_68_000,
  },
];

const statusConfig: Record<PageStatus, { label: string; textClass: string; bgClass: string }> = {
  active: { label: "Active", textClass: "text-[#21c179]", bgClass: "bg-[#e3f6ec]" },
  expired: { label: "Expired", textClass: "text-[#fd5154]", bgClass: "bg-[#ffebef]" },
  draft: { label: "Draft", textClass: "text-[#7e7e7e]", bgClass: "bg-[#fafafa]" },
};

export function PaymentPagesPage() {
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [builderStep, setBuilderStep] = useState<BuilderStep | null>(null);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    pageName: "",
    pageCategory: "",
    businessEmail: "",
    businessPhone: "",
    expiryDate: "",
    browserTabTitle: "",
  });
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All Time");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const statusRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(e.target as Node)) setIsStatusOpen(false);
      if (dateRef.current && !dateRef.current.contains(e.target as Node)) setIsDateOpen(false);
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenuId(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredPages = mockPages.filter((p) => {
    if (statusFilter !== "All" && p.status !== statusFilter.toLowerCase()) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleCreateSelect = () => {
    setShowCreatePopup(false);
    setBuilderStep("info");
  };

  const handleBuilderBack = () => {
    if (builderStep === "info") {
      setBuilderStep(null);
    } else if (builderStep === "builder") {
      setBuilderStep("info");
    } else if (builderStep === "settings") {
      setBuilderStep("builder");
    }
  };

  const handleBuilderNext = () => {
    if (builderStep === "info") {
      setBuilderStep("builder");
    } else if (builderStep === "builder") {
      setBuilderStep("settings");
    } else if (builderStep === "settings") {
      setBuilderStep(null);
    }
  };

  if (builderStep === "info") {
    return <PageInfoForm currentStep={builderStep} onBack={handleBuilderBack} onNext={handleBuilderNext} pageInfo={pageInfo} onPageInfoChange={setPageInfo} />;
  }
  if (builderStep === "builder") {
    return <PageBuilder currentStep={builderStep} onBack={handleBuilderBack} onNext={handleBuilderNext} pageName={pageInfo.pageName} pageCategory={pageInfo.pageCategory} businessEmail={pageInfo.businessEmail} businessPhone={pageInfo.businessPhone} />;
  }
  if (builderStep === "settings") {
    return <AdditionalSettings currentStep={builderStep} onBack={handleBuilderBack} onNext={handleBuilderNext} />;
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6 bg-[#ffffff] min-h-full px-[32px] pt-[12px] pb-[32px]">
      {/* Title + CTA */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] font-semibold text-[#101010]">Payment Pages</h1>
          <button
            onClick={() => setShowCreatePopup(true)}
            className="flex items-center gap-2 bg-[#004299] hover:bg-[#012A72] text-white text-[14px] leading-[20px] font-semibold px-4 py-2.5 rounded-[8px] transition-colors"
          >
            <Plus className="size-4" />
            Create Page
          </button>
        </div>
        <div className="w-[calc(100%+64px)] h-[1px] bg-[#e0e0e0] mx-[-32px]" />

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-[15px] md:gap-5 items-start md:items-center">
          {/* Status filter */}
          <div className="flex flex-col gap-[1px]">
            <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold">STATUS</span>
            <div className="relative" ref={statusRef}>
              <button
                className={`flex items-center gap-2 text-[14px] text-[#101010] font-semibold hover:bg-[#f5f9fe] transition-colors ${isStatusOpen ? "bg-[#f5f9fe]" : ""}`}
                onClick={() => setIsStatusOpen(!isStatusOpen)}
              >
                <span>{statusFilter}</span>
                <ChevronDown className={`size-4 transition-transform ${isStatusOpen ? "rotate-180" : ""}`} />
              </button>
              {isStatusOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-[#e0e0e0] rounded-lg shadow-lg w-[140px] z-10">
                  <div className="py-1">
                    {["All", "Active", "Expired", "Draft"].map((opt) => (
                      <button
                        key={opt}
                        className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#f5f9fe] transition-colors"
                        onClick={() => { setStatusFilter(opt); setIsStatusOpen(false); }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Date filter */}
          <div className="flex flex-col gap-[1px]">
            <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold">DATE</span>
            <div className="relative" ref={dateRef}>
              <button
                className={`flex items-center gap-2 text-[14px] text-[#101010] font-semibold hover:bg-[#f5f9fe] transition-colors ${isDateOpen ? "bg-[#f5f9fe]" : ""}`}
                onClick={() => setIsDateOpen(!isDateOpen)}
              >
                <span>{dateFilter}</span>
                <ChevronDown className={`size-4 transition-transform ${isDateOpen ? "rotate-180" : ""}`} />
              </button>
              {isDateOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-[#e0e0e0] rounded-lg shadow-lg w-[160px] z-10">
                  <div className="py-1">
                    {["All Time", "Today", "Last 7 Days", "Last 30 Days"].map((opt) => (
                      <button
                        key={opt}
                        className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#f5f9fe] transition-colors"
                        onClick={() => { setDateFilter(opt); setIsDateOpen(false); }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="ml-auto flex items-center bg-white border border-[#e0e0e0] rounded-lg h-[40px] w-[320px] overflow-hidden">
            <div className="flex items-center px-3">
              <Search className="size-5 text-[#7e7e7e]" />
            </div>
            <input
              type="text"
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-full text-[14px] text-[#101010] placeholder:text-[#7e7e7e] outline-none bg-transparent pr-3"
            />
          </div>
        </div>

        <div className="w-[calc(100%+64px)] h-[1px] bg-[#e0e0e0] mx-[-32px]" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-[#e0e0e0] rounded-[12px]">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="grid grid-cols-[1.5fr_1.5fr_1fr_0.8fr_0.8fr_0.4fr] px-6 py-3 border-b border-[#e0e0e0]">
            <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold leading-[16px]">Page Name</span>
            <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold leading-[16px]">URL</span>
            <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold leading-[16px]">Created</span>
            <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold leading-[16px]">Status</span>
            <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold leading-[16px] text-right">Payments</span>
            <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold leading-[16px] text-right">Actions</span>
          </div>

          {/* Rows */}
          {filteredPages.map((page, idx) => (
            <div
              key={page.id}
              className={`grid grid-cols-[1.5fr_1.5fr_1fr_0.8fr_0.8fr_0.4fr] px-6 py-4 hover:bg-[#f5f9fe] transition-colors items-center ${
                idx < filteredPages.length - 1 ? "border-b border-[#e0e0e0]" : ""
              }`}
            >
              <div className="flex flex-col">
                <span className="text-[14px] text-[#101010] leading-[24px] font-semibold">{page.name}</span>
              </div>
              <span className="text-[14px] text-[#004299] leading-[24px] truncate hover:underline cursor-pointer">
                {page.urlPath}
              </span>
              <span className="text-[14px] text-[#101010] leading-[24px]">{page.createdAt}</span>
              <div>
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[12px] font-semibold ${statusConfig[page.status].textClass} ${statusConfig[page.status].bgClass}`}>
                  {statusConfig[page.status].label}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[14px] text-[#101010] leading-[24px]">{page.totalPayments.toLocaleString("en-IN")}</span>
                <p className="text-[12px] text-[#7e7e7e]">₹{page.totalAmount.toLocaleString("en-IN")}</p>
              </div>
              <div className="flex justify-end relative" ref={openMenuId === page.id ? menuRef : undefined}>
                <button
                  onClick={() => setOpenMenuId(openMenuId === page.id ? null : page.id)}
                  className="size-8 flex items-center justify-center rounded-[4px] hover:bg-[#f5f9fe] transition-colors"
                >
                  <MoreVertical className="size-5 text-[#7e7e7e]" />
                </button>
                {openMenuId === page.id && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-[#e0e0e0] rounded-lg shadow-lg w-[180px] z-10">
                    <div className="py-1">
                      {["Share Link", "Download QR", "Edit", page.status === "expired" ? "Reactivate" : "Expire", "Delete"].map((action) => (
                        <button
                          key={action}
                          className={`w-full text-left px-4 py-2 text-[14px] hover:bg-[#f5f9fe] transition-colors ${
                            action === "Delete" ? "text-[#fd5154]" : "text-[#101010]"
                          }`}
                          onClick={() => setOpenMenuId(null)}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredPages.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <p className="text-[14px] text-[#7e7e7e]">No payment pages found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <span className="text-[14px] text-[#7e7e7e]">PAGE 1 OF 1</span>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-[14px] text-[#101010] bg-white border border-[#e0e0e0] rounded-lg hover:bg-[#f5f9fe] transition-colors font-semibold">
            Prev
          </button>
          <button className="px-4 py-2 text-[14px] text-[#101010] bg-white border border-[#e0e0e0] rounded-lg hover:bg-[#f5f9fe] transition-colors font-semibold">
            Next
          </button>
        </div>
      </div>

      {/* Create Page popup */}
      <CreatePageEntry
        visible={showCreatePopup}
        onClose={() => setShowCreatePopup(false)}
        onSelect={handleCreateSelect}
      />
    </div>
  );
}
