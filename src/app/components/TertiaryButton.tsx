import type { ReactNode } from "react";

interface TertiaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export function TertiaryButton({ 
  children, 
  onClick, 
  icon, 
  disabled = false,
  className = "" 
}: TertiaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        group flex items-center justify-center gap-2 
        px-4 py-2 
        min-w-[80px]
        rounded-[8px] 
        bg-[#e7f1f8]
        transition-colors
        hover:bg-[#e7eaf4]
        disabled:bg-[#ebebeb] disabled:text-[#acacac] disabled:opacity-64 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {icon && <span className="shrink-0 size-4 text-[#004299] group-hover:text-[#012A72] transition-colors [&_svg]:size-full [&_svg]:block">{icon}</span>}
      <span className="text-[12px] leading-[16px] text-[#004299] group-hover:text-[#012A72] transition-colors font-semibold text-center whitespace-nowrap">
        {children}
      </span>
    </button>
  );
}