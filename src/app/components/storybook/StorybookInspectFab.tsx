import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { SquareMousePointer, X } from "lucide-react";
import { Button } from "../Button";
import { cn } from "../ui/utils";

export type StorybookInspectFabProps = {
  className?: string;
  /** When true, inspect mode is active (visual + `aria-pressed`). */
  pressed?: boolean;
  onPress?: () => void;
};

const FAB_STYLE: CSSProperties = {
  position: "fixed",
  bottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))",
  right: "max(1.5rem, env(safe-area-inset-right, 0px))",
  zIndex: 200,
};

/**
 * Floating inspect control — portaled to `document.body` so `position: fixed` is always relative to
 * the viewport (avoids transformed/clipped ancestors). Uses catalog `Button` tertiary + `icon-medium`.
 */
export function StorybookInspectFab({ className, onPress, pressed }: StorybookInspectFabProps) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  const button = (
    <Button
      variant="tertiary"
      size="icon-medium"
      icon={pressed ? <X aria-hidden strokeWidth={2.5} /> : <SquareMousePointer aria-hidden />}
      onClick={onPress}
      aria-pressed={pressed ? true : undefined}
      aria-label={pressed ? "Exit inspect mode" : "Enter inspect mode"}
      title={pressed ? "Exit inspect (Esc)" : "Inspect elements in preview"}
      style={FAB_STYLE}
      className={cn(
        "pointer-events-auto shadow-[0_2px_12px_rgba(16,16,16,0.12)]",
        "shrink-0",
        pressed && "ring-2 ring-[#004299] ring-offset-2 ring-offset-[#f5f9fe]",
        className,
      )}
    />
  );

  if (!portalRoot) return null;
  return createPortal(button, portalRoot);
}
