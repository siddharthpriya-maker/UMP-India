import { FilePlus, LayoutTemplate, Copy, Sparkles } from "lucide-react";
import { Popup } from "../Popup";
import type { CreationMode } from "./types";

const creationOptions: { mode: CreationMode; icon: typeof FilePlus; title: string; description: string }[] = [
  {
    mode: "scratch",
    icon: FilePlus,
    title: "Build from Scratch",
    description: "Start with a blank canvas and build your payment page from the ground up.",
  },
  {
    mode: "template",
    icon: LayoutTemplate,
    title: "Select a Template",
    description: "Choose from pre-designed templates for common use cases.",
  },
  {
    mode: "copy",
    icon: Copy,
    title: "Copy from Existing Page",
    description: "Duplicate one of your existing pages and customise it.",
  },
  {
    mode: "ai",
    icon: Sparkles,
    title: "Build with AI",
    description: "Describe your page requirements and let AI create it for you.",
  },
];

interface CreatePageEntryProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (mode: CreationMode) => void;
}

export function CreatePageEntry({ visible, onClose, onSelect }: CreatePageEntryProps) {
  return (
    <Popup
      visible={visible}
      onClose={onClose}
      type="form"
      title="Create a Payment Page"
      subtext="Choose how you'd like to get started."
    >
      <div className="flex flex-col gap-3 w-full">
        {creationOptions.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.mode}
              onClick={() => onSelect(opt.mode)}
              className="flex items-center gap-4 w-full border border-[#e0e0e0] rounded-[12px] p-5 hover:bg-[#f5f9fe] cursor-pointer transition-colors text-left"
            >
              <div className="size-10 rounded-[8px] bg-[#e0f5fd] flex items-center justify-center shrink-0 text-[#101010]">
                <Icon className="size-5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] font-semibold text-[#101010]">{opt.title}</span>
                <span className="text-[12px] text-[#7e7e7e] leading-[18px]">{opt.description}</span>
              </div>
            </button>
          );
        })}
      </div>
    </Popup>
  );
}
