import type { ReactNode } from "react";

interface SecondaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export function SecondaryButton({ 
  children, 
  onClick, 
  icon, 
  disabled = false,
  className = "" 
}: SecondaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        group flex items-center justify-center gap-2 
        px-4 py-2 
        min-w-[80px]
        rounded-[8px] 
        border border-[#004299]
        transition-colors
        hover:bg-[#f7f9fd] hover:border-[#012A72]
        disabled:bg-[#ebebeb] disabled:text-[#acacac] disabled:opacity-64 disabled:cursor-not-allowed disabled:border-none
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