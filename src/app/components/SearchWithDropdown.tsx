import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

interface SearchOption {
  label: string;
  value: string;
}

interface SearchWithDropdownProps {
  options: SearchOption[];
  defaultOption?: string;
  onSearch?: (field: string, query: string) => void;
  /** When omitted and the selected filter is the “select” sentinel (`value: "select"`), input shows **Enter search value**. Otherwise defaults to `Search {label}`. */
  placeholder?: string;
  /** Tailwind width classes; default matches all FilterBar tails: full width of slot, max 560px. */
  width?: string;
}

/** Sentinel: left trigger shows **Select Filter**; empty input placeholder **Enter search value**. */
const SELECT_FILTER_VALUE = "select";

export function SearchWithDropdown({
  options,
  defaultOption,
  onSearch,
  placeholder,
  width = "w-full max-w-[560px]",
}: SearchWithDropdownProps) {
  const [selectedOption, setSelectedOption] = useState(
    defaultOption || options[0]?.value || ""
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isSelectFilter = selectedOption === SELECT_FILTER_VALUE;

  const selectedLabel = isSelectFilter
    ? "Select Filter"
    : options.find((o) => o.value === selectedOption)?.label || selectedOption;

  const inputPlaceholder =
    placeholder !== undefined
      ? placeholder
      : isSelectFilter
        ? "Enter search value"
        : `Search ${selectedLabel}`;

  const inputAriaLabel = isSelectFilter
    ? "Choose a filter type, then enter a search value"
    : `Search by ${selectedLabel}`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(selectedOption, searchQuery);
    }
  };

  return (
    <div
      className={`relative flex items-center bg-white border border-[#e0e0e0] rounded-lg h-[40px] ${width} overflow-visible ${
        isDropdownOpen ? "z-30" : "z-0"
      }`}
    >
      {/* Dropdown Selector */}
      <div className="relative flex items-center" ref={dropdownRef}>
        <button
          className={`flex items-center gap-2 text-[14px] text-[#101010] px-3 py-2 hover:bg-[#EBEBEB] h-[40px] transition-colors whitespace-nowrap ${
            isDropdownOpen ? "bg-[#EBEBEB]" : ""
          }`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="font-semibold">{selectedLabel}</span>
          <ChevronDown
            className={`size-4 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isDropdownOpen && (
          <div className="absolute top-full left-0 z-50 mt-1 w-[200px] rounded-lg border border-[#e0e0e0] bg-white shadow-lg">
            <div className="max-h-[min(280px,50vh)] overflow-y-auto py-0">
              <div className="flex flex-col">
                {options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`w-full px-4 py-2.5 text-left text-[14px] text-[#101010] transition-colors hover:bg-[#EBEBEB] ${
                      selectedOption === option.value ? "bg-[#EBEBEB] font-semibold" : ""
                    }`}
                    onClick={() => handleOptionSelect(option.value)}
                  >
                    {option.value === SELECT_FILTER_VALUE ? "Select Filter" : option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-full w-[1px] bg-[#e0e0e0]" />

      {/* Search input — rotating “Search for a …” hint exists only on the global Header search. */}
      <div className="relative flex min-w-0 flex-1 items-center px-3">
        <Search className="mr-2 size-5 shrink-0 text-[#7e7e7e]" />
        <div className="relative min-h-px min-w-0 flex-1">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={inputPlaceholder}
            aria-label={inputAriaLabel}
            className="w-full bg-transparent text-[14px] font-semibold text-[#101010] outline-none placeholder:text-[#7e7e7e]"
          />
        </div>
      </div>
    </div>
  );
}
