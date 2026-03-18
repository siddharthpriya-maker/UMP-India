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
  placeholder?: string;
  width?: string;
}

export function SearchWithDropdown({
  options,
  defaultOption,
  onSearch,
  placeholder,
  width = "w-[560px]",
}: SearchWithDropdownProps) {
  const [selectedOption, setSelectedOption] = useState(
    defaultOption || options[0]?.value || ""
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((o) => o.value === selectedOption)?.label || selectedOption;

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
      className={`flex items-center bg-white border border-[#e0e0e0] rounded-lg h-[40px] ${width} overflow-hidden`}
    >
      {/* Dropdown Selector */}
      <div className="relative flex items-center" ref={dropdownRef}>
        <button
          className={`flex items-center gap-2 text-[14px] text-[#101010] px-3 py-2 hover:bg-[#f5f9fe] h-[40px] transition-colors whitespace-nowrap ${
            isDropdownOpen ? "bg-[#f5f9fe]" : ""
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
          <div className="absolute top-full left-0 mt-1 bg-white border border-[#e0e0e0] rounded-lg shadow-lg w-[180px] z-10">
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  className={`w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#f5f9fe] transition-colors ${
                    selectedOption === option.value ? "bg-[#f5f9fe] font-semibold" : ""
                  }`}
                  onClick={() => handleOptionSelect(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-full w-[1px] bg-[#e0e0e0]" />

      {/* Search Input */}
      <div className="flex-1 flex items-center px-3">
        <Search className="size-5 text-[#7e7e7e] mr-2 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || `Search ${selectedLabel}`}
          className="flex-1 bg-transparent text-[14px] text-[#101010] placeholder:text-[#7e7e7e] outline-none font-semibold"
        />
      </div>
    </div>
  );
}
