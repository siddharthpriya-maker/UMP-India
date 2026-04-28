import { SquareMousePointer } from "lucide-react";
import { Button } from "../Button";
import { cn } from "../ui/utils";

export type StorybookInspectFabProps = {
  className?: string;
  /** When true, inspect mode is active (visual + `aria-pressed`). */
  pressed?: boolean;
  onPress?: () => void;
};

/**
 * Storybook header control — uses catalog `Button` tertiary + `icon-medium` (40×40px, 20×20px glyph per `Button.tsx`).
 */
export function StorybookInspectFab({ className, onPress, pressed }: StorybookInspectFabProps) {
  return (
    <Button
      variant="tertiary"
      size="icon-medium"
      icon={<SquareMousePointer aria-hidden />}
      onClick={onPress}
      aria-pressed={pressed ? true : undefined}
      aria-label={pressed ? "Exit inspect mode" : "Enter inspect mode"}
      title={pressed ? "Exit inspect (Esc)" : "Inspect elements in preview"}
      className={cn(
        "shrink-0",
        pressed && "ring-2 ring-[#004299] ring-offset-2 ring-offset-[#f5f9fe]",
        className,
      )}
    />
  );
}
