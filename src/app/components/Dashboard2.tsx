import { useState, useRef, useEffect } from "react";
import { Clock, Download, ChevronDown } from "lucide-react";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import { TrendingUp } from "lucide-react";
import ButtonV2 from "../../imports/ButtonV2";
import { ActionsNotificationsWidget } from "./ActionsNotificationsWidget";

const paymentData = [
  { id: "day-01", date: "01", amount: 650, count: 550 },
  { id: "day-02", date: "02", amount: 720, count: 600 },
  { id: "day-03", date: "03", amount: 850, count: 680 },
  { id: "day-04", date: "04", amount: 900, count: 700 },
  { id: "day-05", date: "05", amount: 750, count: 620 },
  { id: "day-06", date: "06", amount: 1050, count: 800 },
  { id: "day-07", date: "07", amount: 880, count: 720 },
  { id: "day-08", date: "08", amount: 950, count: 750 },
  { id: "day-09", date: "09", amount: 1200, count: 880 },
  { id: "day-10", date: "10", amount: 720, count: 600 },
  { id: "day-11", date: "11", amount: 650, count: 560 },
  { id: "day-12", date: "12", amount: 800, count: 650 },
  { id: "day-13", date: "13", amount: 950, count: 720 },
  { id: "day-14", date: "14", amount: 880, count: 700 },
  { id: "day-15", date: "15", amount: 1100, count: 820 },
  { id: "day-16", date: "16", amount: 950, count: 750 },
  { id: "day-17", date: "17", amount: 920, count: 730 },
  { id: "day-18", date: "18", amount: 1000, count: 780 },
  { id: "day-19", date: "19", amount: 1150, count: 850 },
  { id: "day-20", date: "20", amount: 1300, count: 920 },
  { id: "day-21", date: "21", amount: 1100, count: 840 },
  { id: "day-22", date: "22", amount: 1000, count: 800 },
  { id: "day-23", date: "23", amount: 1250, count: 900 },
  { id: "day-24", date: "24", amount: 950, count: 750 },
];

const paymentSourcesData = [
  { id: "upi", name: "UPI", value: 3510000, color: "#4A90E2", percentage: 39 },
  { id: "debit-card", name: "Debit Card", value: 2610000, color: "#FFD93D", percentage: 29 },
  { id: "credit-card", name: "Credit Card", value: 360000, color: "#FF85C0", percentage: 4 },
  { id: "net-banking", name: "Net Banking", value: 720000, color: "#98D8C8", percentage: 8 },
  { id: "emi", name: "EMI", value: 900000, color: "#6DD4F2", percentage: 10 },
  { id: "other", name: "Other", value: 900000, color: "#FFB347", percentage: 10 },
];

export function Dashboard2() {
  const [summaryDateRange, setSummaryDateRange] = useState("This month 01 Jan -24 Jan");
  const [sourceDateRange, setSourceDateRange] = useState("This month 01 Jan -24 Jan");
  const [isSummaryDropdownOpen, setIsSummaryDropdownOpen] = useState(false);
  const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState(false);
  const summaryDropdownRef = useRef<HTMLDivElement>(null);
  const sourceDropdownRef = useRef<HTMLDivElement>(null);

  // Click outside handler for summary dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (summaryDropdownRef.current && !summaryDropdownRef.current.contains(event.target as Node)) {
        setIsSummaryDropdownOpen(false);
      }
      if (sourceDropdownRef.current && !sourceDropdownRef.current.contains(event.target as Node)) {
        setIsSourceDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Custom Y-axis formatter for payment amounts
  const formatYAxis = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(0)}L`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(0)}K`;
    }
    return `₹${value}`;
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
      {/* Charts Container with Surface Level 3 Background */}
      <div className="bg-[var(--surface-level-3,#fafafa)] p-8 rounded-tl-[32px] rounded-tr-[32px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Payment Summary Chart - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 bg-white rounded-2xl h-auto p-[24px]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 md:mb-6 gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 relative">
                <h2 className="font-medium leading-[24px] text-foreground w-fit flex items-center h-[40px] text-[20px]">Payment Summary</h2>
                <div className="relative" ref={summaryDropdownRef}>
                  <button 
                    className={`flex items-center gap-2 text-[14px] text-[#101010] bg-[#f5f9fe] rounded-lg px-3 py-1.5 hover:bg-[#f5f9fe]/80 h-[40px] self-start transition-colors ${isSummaryDropdownOpen ? 'bg-[#f5f9fe]/80' : ''}`}
                    onClick={() => setIsSummaryDropdownOpen(!isSummaryDropdownOpen)}
                  >
                    <span>{summaryDateRange}</span>
                    <ChevronDown className={`size-4 transition-transform ${isSummaryDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isSummaryDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-border rounded-lg shadow-lg w-[220px] z-10">
                      <div className="py-1">
                        <button 
                          className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#f5f9fe] transition-colors"
                          onClick={() => { 
                            setSummaryDateRange("This Month"); 
                            setIsSummaryDropdownOpen(false); 
                          }}
                        >
                          This Month
                        </button>
                        <button 
                          className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#f5f9fe] transition-colors"
                          onClick={() => { 
                            setSummaryDateRange("Last Month"); 
                            setIsSummaryDropdownOpen(false); 
                          }}
                        >
                          Last Month
                        </button>
                        <button 
                          className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#f5f9fe] transition-colors"
                          onClick={() => { 
                            setSummaryDateRange("Custom Date Range"); 
                            setIsSummaryDropdownOpen(false); 
                          }}
                        >
                          Custom Date Range
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
                <div className="flex items-center gap-2 text-sm">
                  
                </div>
                <div className="w-fit h-[40px]">
                  <ButtonV2 />
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={paymentData} margin={{ top: 10, right: 30, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#21C179" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#21C179" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#7e7e7e" 
                  fontSize={12} 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  yAxisId="left-payments"
                  stroke="#7e7e7e" 
                  fontSize={12}
                  tickFormatter={formatYAxis}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  yAxisId="right-count"
                  orientation="right" 
                  stroke="#7e7e7e" 
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "white", 
                    border: "1px solid #e0e0e0", 
                    borderRadius: "8px",
                    fontSize: "12px"
                  }}
                  labelStyle={{ color: "#101010", fontWeight: "600" }}
                  formatter={(value: number, name: string) => {
                    if (name === "Payment Amount") {
                      return [`₹${(value / 100000).toFixed(2)}L`, name];
                    }
                    return [value, name];
                  }}
                />
                <Bar 
                  key="payment-bar"
                  yAxisId="left-payments" 
                  dataKey="amount" 
                  fill="#1576DB" 
                  name="Payment Amount" 
                  radius={[4, 4, 0, 0]}
                  barSize={12}
                />
                <Line 
                  key="payment-line"
                  yAxisId="right-count" 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#21C179" 
                  name="No of Payments" 
                  strokeWidth={2} 
                  dot={{ fill: "#21C179", r: 3 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-between ml-[0px] mr-[60px] mt-[0px] mb-[0px]">
              <div className="text-sm text-muted-foreground px-[60px] py-[0px]">January 2026</div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#1576DB] rounded-sm"></div>
                  <span className="text-xs text-foreground">Payment Amount</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#21C179] rounded-sm"></div>
                  <span className="text-xs text-foreground">No of Payments</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions/Notifications Widget - Takes 1 column */}
          <div className="lg:col-span-1 lg:row-span-2">
            <div className="h-full lg:h-[calc(100%)] flex flex-col">
              <ActionsNotificationsWidget />
            </div>
          </div>

          {/* Payment Sources - Takes 2 columns on large screens, full row */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 md:mb-6 relative">
              <h2 className="text-[20px] font-medium leading-[24px] text-[#101010]">Payment Sources</h2>
              <div className="relative" ref={sourceDropdownRef}>
                <button 
                  className={`flex items-center gap-2 text-[14px] text-[#101010] bg-[#f5f9fe] rounded-lg px-3 py-1.5 hover:bg-[#f5f9fe]/80 h-[40px] self-start transition-colors ${isSourceDropdownOpen ? 'bg-[#f5f9fe]/80' : ''}`}
                  onClick={() => setIsSourceDropdownOpen(!isSourceDropdownOpen)}
                >
                  <span>{sourceDateRange}</span>
                  <ChevronDown className={`size-4 transition-transform ${isSourceDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isSourceDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-border rounded-lg shadow-lg w-[220px] z-10">
                    <div className="py-1">
                      <button 
                        className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#f5f9fe] transition-colors"
                        onClick={() => { 
                          setSourceDateRange("This Month"); 
                          setIsSourceDropdownOpen(false); 
                        }}
                      >
                        This Month
                      </button>
                      <button 
                        className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#f5f9fe] transition-colors"
                        onClick={() => { 
                          setSourceDateRange("Last Month"); 
                          setIsSourceDropdownOpen(false); 
                        }}
                      >
                        Last Month
                      </button>
                      <button 
                        className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#f5f9fe] transition-colors"
                        onClick={() => { 
                          setSourceDateRange("Custom Date Range"); 
                          setIsSourceDropdownOpen(false); 
                        }}
                      >
                        Custom Date Range
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div className="flex items-center justify-center min-h-[300px] md:min-h-[350px]">
                <ResponsiveContainer width="100%" height={300} className="md:!h-[350px]">
                  <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie
                      data={paymentSourcesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={76}
                      outerRadius={127}
                      paddingAngle={2}
                      dataKey="value"
                      className="md:!innerRadius-[101] md:!outerRadius-[152] lg:!innerRadius-[101] lg:!outerRadius-[177]"
                    >
                      {paymentSourcesData.map((entry) => (
                        <Cell key={entry.id} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: "white", border: "1px solid #e0e0e0", borderRadius: "8px" }}
                      formatter={(value: number) => `₹${(value / 100000).toFixed(2)} L`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                {paymentSourcesData.map((source) => (
                  <div key={source.name} className="flex items-center justify-between px-4 py-3 bg-[var(--surface-level-3,#fafafa)] rounded-lg">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="size-3 rounded-full shrink-0" style={{ backgroundColor: source.color }} />
                      <span className="text-xs md:text-sm text-[#101010]">{source.name}</span>
                    </div>
                    <div className="flex items-center gap-3 md:gap-6">
                      <span className="text-xs md:text-sm font-semibold text-[#101010]">
                        {(source.value / 100000).toFixed(2)} L
                      </span>
                      <span className="text-xs md:text-sm font-semibold text-[#101010] w-8 md:w-12 text-right">
                        {source.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}