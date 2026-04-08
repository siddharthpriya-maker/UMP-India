import { useState } from "react";
import {
  Search, Image, Type, AlignLeft, Video, Package, CreditCard,
  Heart, Target, Phone, Mail, MapPin, ChevronDown, MousePointer,
  Receipt, User, Plus,
} from "lucide-react";
import type { SectionId, SectionComponentDef } from "./builder-types";
import { SECTION_COMPONENTS, SECTION_META, SECTION_ORDER } from "./builder-types";

const iconMap: Record<string, typeof Type> = {
  image: Image,
  type: Type,
  "align-left": AlignLeft,
  video: Video,
  package: Package,
  "credit-card": CreditCard,
  heart: Heart,
  target: Target,
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
  "chevron-down": ChevronDown,
  "mouse-pointer": MousePointer,
  receipt: Receipt,
};

interface SectionComponentLibraryProps {
  selectedSection: SectionId | null;
  onSelectSection: (id: SectionId) => void;
  onAddComponent: (componentDef: SectionComponentDef) => void;
}

export function SectionComponentLibrary({
  selectedSection,
  onSelectSection,
  onAddComponent,
}: SectionComponentLibraryProps) {
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCollapse = (key: string) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  const filteredComponents = SECTION_COMPONENTS.filter((c) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return c.label.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
    }
    return selectedSection ? c.section === selectedSection : true;
  });

  const grouped = SECTION_ORDER.reduce<Record<SectionId, SectionComponentDef[]>>((acc, s) => {
    acc[s] = filteredComponents.filter((c) => c.section === s);
    return acc;
  }, {} as Record<SectionId, SectionComponentDef[]>);

  return (
    <div className="flex w-[260px] shrink-0 flex-col overflow-hidden border-r border-[#e0e0e0] bg-white">
      {/* Header */}
      <div className="shrink-0 border-b border-[#e0e0e0] px-4 pb-3 pt-4">
        <h3 className="text-[13px] font-semibold text-[#101010]">Components</h3>
        <p className="text-[11px] text-[#acacac]">
          {selectedSection
            ? `Showing for ${SECTION_META[selectedSection].label}`
            : "Search or select a section"}
        </p>
      </div>

      {/* Search */}
      <div className="shrink-0 border-b border-[#f0f0f0] px-3 py-2">
        <div className="flex h-[32px] items-center gap-2 rounded-[8px] bg-[#f5f5f5] px-2.5">
          <Search className="size-3.5 shrink-0 text-[#acacac]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search components…"
            className="h-full flex-1 bg-transparent text-[12px] text-[#101010] placeholder:text-[#ccc] outline-none"
          />
        </div>
      </div>

      {/* Section tabs */}
      {!search.trim() && (
        <div className="flex shrink-0 overflow-x-auto border-b border-[#f0f0f0]">
          <button
            type="button"
            onClick={() => onSelectSection(selectedSection!)}
            className={[
              "whitespace-nowrap px-3 py-2 text-[11px] font-semibold transition-colors",
              !selectedSection
                ? "border-b-2 border-[#004299] text-[#004299]"
                : "text-[#acacac] hover:text-[#7e7e7e]",
            ].join(" ")}
          >
            All
          </button>
          {SECTION_ORDER.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onSelectSection(s)}
              className={[
                "whitespace-nowrap px-3 py-2 text-[11px] font-semibold transition-colors",
                selectedSection === s
                  ? "border-b-2 border-[#004299] text-[#004299]"
                  : "text-[#acacac] hover:text-[#7e7e7e]",
              ].join(" ")}
            >
              {SECTION_META[s].label}
            </button>
          ))}
        </div>
      )}

      {/* Component list */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {SECTION_ORDER.map((sectionId) => {
          const items = grouped[sectionId];
          if (!items || items.length === 0) return null;
          const isCollapsed = collapsed[sectionId];

          return (
            <div key={sectionId} className="mb-2">
              <button
                onClick={() => toggleCollapse(sectionId)}
                className="flex w-full items-center justify-between px-1 py-1.5"
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#acacac]">
                  {SECTION_META[sectionId].label}
                </span>
                <ChevronDown
                  className={`size-3.5 text-[#ccc] transition-transform ${isCollapsed ? "-rotate-90" : ""}`}
                />
              </button>
              {!isCollapsed && (
                <div className="flex flex-col gap-0.5">
                  {items.map((comp) => {
                    const Icon = iconMap[comp.icon] || Type;
                    return (
                      <button
                        key={comp.id}
                        type="button"
                        onClick={() => onAddComponent(comp)}
                        className="flex items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-left transition-colors hover:bg-[#f5f9fe]"
                      >
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-[6px] bg-[#f5f5f5]">
                          <Icon className="size-3.5 text-[#7e7e7e]" />
                        </div>
                        <div className="flex min-w-0 flex-col">
                          <span className="truncate text-[12px] font-medium text-[#101010]">
                            {comp.label}
                          </span>
                          <span className="truncate text-[10px] text-[#acacac]">
                            {comp.description}
                          </span>
                        </div>
                        <Plus className="ml-auto size-3.5 shrink-0 text-[#ccc] transition-colors group-hover:text-[#004299]" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {filteredComponents.length === 0 && (
          <div className="flex flex-col items-center py-8 text-center">
            <Search className="mb-2 size-5 text-[#e0e0e0]" />
            <p className="text-[12px] text-[#acacac]">No components found</p>
          </div>
        )}
      </div>
    </div>
  );
}
