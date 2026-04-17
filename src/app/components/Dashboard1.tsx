import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { ChevronDown } from "lucide-react";
import imgTataCLiQ from "../../imports/tata-cliq-logo";
import Payments from "../../imports/Payments-41-36";
import Settlement from "../../imports/Settlement";
import Refunds from "../../imports/Refunds";

export function Dashboard1() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState("Today, 24 Jan");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleDateOptionClick = (option: string) => {
    if (option === "today") {
      setDateRange("Today, 24 Jan");
    } else if (option === "yesterday") {
      setDateRange("Yesterday, 23 Jan");
    } else if (option === "custom") {
      // For now, just set a placeholder. You can add a date picker later
      setDateRange("Custom Date");
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white p-4 md:p-6 lg:p-8 flex flex-col gap-4 md:gap-6">
      {/* Business Header */}
      <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-4">
        <div className="flex flex-col gap-3">
          <h1 className="font-medium leading-tight lg:leading-[48px] text-foreground text-[42px]">Tata cliq</h1>
          <div className="bg-[#f5f9fe] flex flex-col h-[40px] items-center justify-center px-3 py-1 rounded-lg">
            <p className="text-xs font-medium leading-4 text-foreground">MID: Tatadelhi2345678987</p>
          </div>
        </div>
        <div className="relative rounded-[20px] shrink-0 size-20 sm:size-24 lg:size-[100px] bg-[#212121] overflow-hidden">
          <img alt="Tata CLIQ" className="object-contain size-full" src={imgTataCLiQ} />
        </div>
      </div>

      {/* Business Overview */}
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-row items-center gap-2 h-[40px]">
          <h2 className="text-[20px] font-medium leading-[24px] text-foreground">Business Overview</h2>
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 text-sm text-[#101010] bg-[#f5f9fe] rounded-lg px-3 py-1.5 hover:bg-gray-50 h-[40px]"
            >
              <span>{dateRange}</span>
              <ChevronDown className={`size-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-[200px] bg-white rounded-lg shadow-lg border border-border overflow-hidden z-10">
                <button
                  onClick={() => handleDateOptionClick("today")}
                  className="w-full text-left px-4 py-3 text-sm text-foreground hover:bg-[#f5f9fe] transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={() => handleDateOptionClick("yesterday")}
                  className="w-full text-left px-4 py-3 text-sm text-foreground hover:bg-[#f5f9fe] transition-colors"
                >
                  Yesterday
                </button>
                <button
                  onClick={() => handleDateOptionClick("custom")}
                  className="w-full text-left px-4 py-3 text-sm text-foreground hover:bg-[#f5f9fe] transition-colors"
                >Select date</button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Shared overview card motion: subtle lift + scale, soft shadow; hover fill slightly richer */}
          {/* Payments Card — opens Payments */}
          <button
            type="button"
            onClick={() => navigate("/payments")}
            className="bg-[#F5FBFE] hover:bg-[#E8F3FC] rounded-[20px] p-5 flex flex-col gap-3 w-full min-w-0 text-left cursor-pointer shadow-[0_1px_3px_rgba(16,16,16,0.05)] transition-[background-color,transform,box-shadow] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:scale-[1.006] hover:shadow-[0_8px_22px_-8px_rgba(16,16,16,0.1)] motion-reduce:transition-colors motion-reduce:duration-300 motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:hover:shadow-[0_1px_3px_rgba(16,16,16,0.05)] active:translate-y-0 active:scale-[1] active:duration-300 active:ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-2"
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">Payments</p>
                <div className="flex items-center gap-2">
                  <p className="text-foreground text-[32px]">₹90,00,000</p>
                </div>
              </div>
              <div className="bg-[var(--background,#ffffff)] rounded-[var(--radius-200,16px)] p-0 flex items-center justify-center">
                <Payments />
              </div>
            </div>
            <div className="flex items-start justify-between pt-3 border-t border-border">
              <div>
                <p className="text-sm text-foreground">1152</p>
                <p className="text-xs text-muted-foreground">Payments</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#00c853]">98%</p>
                <p className="text-xs text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </button>

          {/* Settlement Card — opens Settlements */}
          <button
            type="button"
            onClick={() => navigate("/settlements")}
            className="bg-[#F0FDF4] hover:bg-[#E3F6E9] rounded-[20px] p-5 flex flex-col gap-3 w-full min-w-0 text-left cursor-pointer shadow-[0_1px_3px_rgba(16,16,16,0.05)] transition-[background-color,transform,box-shadow] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:scale-[1.006] hover:shadow-[0_8px_22px_-8px_rgba(16,16,16,0.1)] motion-reduce:transition-colors motion-reduce:duration-300 motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:hover:shadow-[0_1px_3px_rgba(16,16,16,0.05)] active:translate-y-0 active:scale-[1] active:duration-300 active:ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-2"
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">Settlement</p>
                <div className="flex items-center gap-2">
                  <p className="text-foreground text-[32px]">₹79,00,000</p>
                </div>
              </div>
              <div className="bg-[var(--background,#ffffff)] rounded-[var(--radius-200,16px)] p-0 flex items-center justify-center">
                <Settlement />
              </div>
            </div>
            <div className="flex items-start justify-between pt-3 border-t border-border">
              <div>
                <p className="text-sm text-foreground">7:30 AM, 23 Sep</p>
                <p className="text-xs text-muted-foreground">Last Settled</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-foreground">8:00 AM Everyday</p>
                <p className="text-xs text-muted-foreground">Scheduled</p>
              </div>
            </div>
          </button>

          {/* Refunds Card — opens Refunds */}
          <button
            type="button"
            onClick={() => navigate("/refunds")}
            className="bg-[#FEF2F2] hover:bg-[#FCE4E4] rounded-[20px] p-5 flex flex-col gap-3 w-full min-w-0 text-left cursor-pointer shadow-[0_1px_3px_rgba(16,16,16,0.05)] transition-[background-color,transform,box-shadow] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:scale-[1.006] hover:shadow-[0_8px_22px_-8px_rgba(16,16,16,0.1)] motion-reduce:transition-colors motion-reduce:duration-300 motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:hover:shadow-[0_1px_3px_rgba(16,16,16,0.05)] active:translate-y-0 active:scale-[1] active:duration-300 active:ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-2"
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">Refunds</p>
                <div className="flex items-center gap-2">
                  <p className="text-foreground text-[32px]">₹10,000</p>
                </div>
              </div>
              <div className="bg-[var(--background,#ffffff)] rounded-[var(--radius-200,16px)] p-0 flex items-center justify-center">
                <Refunds />
              </div>
            </div>
            <div className="pt-3 border-t border-border">
              <div>
                <p className="text-sm text-foreground">110</p>
                <p className="text-xs text-muted-foreground">Payments</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}