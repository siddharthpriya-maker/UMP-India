import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonSize = "small" | "medium" | "large" | "icon-small" | "icon-medium" | "icon-large";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  fullWidth?: boolean;
}

/** Five-dot row — Figma PODS: three `#012A72`, two `#00B8F5`. */
function ButtonLoadingDots({ size }: { size: ButtonSize }) {
  const dot =
    size === "small"
      ? "size-[4px] rounded-full"
      : size === "medium"
        ? "size-[5px] rounded-full"
        : "size-[6px] rounded-full";
  return (
    <span className="flex items-center justify-center gap-[4.41px]" aria-hidden>
      <span className={`${dot} bg-[#012A72]`} />
      <span className={`${dot} bg-[#012A72]`} />
      <span className={`${dot} bg-[#012A72]`} />
      <span className={`${dot} bg-[#00b8f5]`} />
      <span className={`${dot} bg-[#00b8f5]`} />
    </span>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "medium",
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const isIconOnly = size.startsWith("icon-");
  const isSmall = size === "small" || size === "icon-small";
  const contentGap = isSmall ? "gap-1" : "gap-2";

  const baseStyles =
    "inline-flex items-center justify-center rounded-[8px] font-semibold transition-colors relative isolate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-2";

  const disabledIdle =
    "disabled:bg-[#ebebeb] disabled:text-[#acacac] disabled:opacity-64 disabled:cursor-not-allowed disabled:border-none";

  const disabledLoading =
    "disabled:!bg-[#e7f1f8] disabled:!opacity-100 disabled:!border-transparent disabled:!cursor-wait";

  const loadingSurface = loading ? "!bg-[#e7f1f8] !border-transparent" : "";

  const variantStyles = {
    primary: "bg-[#004299] text-white enabled:hover:bg-[#012A72]",
    secondary:
      "border border-[#004299] text-[#004299] enabled:hover:bg-[#e7f1f8] enabled:hover:border-[#012A72] enabled:hover:text-[#012A72]",
    tertiary: "bg-[#e7f1f8] text-[#004299] enabled:hover:bg-[#f5f9fe] enabled:hover:text-[#012A72]",
  };

  const sizeStyles = {
    small: "px-4 py-2 min-w-[80px] text-[12px] leading-[16px]",
    medium: "px-4 py-2.5 min-w-[120px] text-[14px] leading-[20px]",
    large: "p-4 min-w-[120px] text-[16px] leading-[20px]",
    "icon-small": "box-border size-[32px] p-2",
    "icon-medium": "box-border size-[40px] p-2.5",
    "icon-large": "box-border size-[56px] p-4",
  };

  const iconSizes = {
    small: "size-4",
    medium: "size-5",
    large: "size-6",
    "icon-small": "size-4",
    "icon-medium": "size-5",
    "icon-large": "size-6",
  };

  const combinedClassName = [
    baseStyles,
    loading ? disabledLoading : disabledIdle,
    loadingSurface,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  const iconElement = icon && (
    <span
      className={`shrink-0 ${iconSizes[size]} flex items-center justify-center text-current [&_svg]:size-full`}
    >
      {icon}
    </span>
  );

  const contentRow = (
    <span
      className={`inline-flex items-center justify-center ${contentGap} ${loading ? "opacity-0" : ""}`}
      aria-hidden={loading || undefined}
    >
      {icon && iconPosition === "left" && iconElement}
      {!isIconOnly && children}
      {icon && iconPosition === "right" && iconElement}
    </span>
  );

  return (
    <button
      type="button"
      className={combinedClassName}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <ButtonLoadingDots size={size} />
        </span>
      )}
      {contentRow}
    </button>
  );
}

export function PrimaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button {...props} variant="primary" />;
}

export function SecondaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button {...props} variant="secondary" />;
}

export function TertiaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button {...props} variant="tertiary" />;
}
