import { useEffect, useCallback } from "react";

type OverlayStrength = "weak" | "strong";

interface OverlayProps {
  visible: boolean;
  strength?: OverlayStrength;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const strengthStyles: Record<OverlayStrength, string> = {
  weak: "bg-[#101010]/13",
  strong: "bg-[#101010]/70",
};

export function Overlay({
  visible,
  strength = "weak",
  onClose,
  className = "",
  children,
}: OverlayProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!visible) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [visible, handleKeyDown]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 ${strengthStyles[strength]} transition-opacity duration-200 ${className}`}
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
