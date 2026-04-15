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

  // Base styles
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-[8px] font-semibold transition-colors disabled:bg-[#ebebeb] disabled:text-[#acacac] disabled:opacity-64 disabled:cursor-not-allowed disabled:border-none";

  // Variant styles (Button_v2 guidelines)
  const variantStyles = {
    primary: "bg-[#004299] text-white hover:bg-[#012A72]",
    secondary: "border border-[#004299] text-[#004299] hover:bg-[#f7f9fd] hover:border-[#012A72] hover:text-[#012A72]",
    tertiary: "bg-[#e7f1f8] text-[#004299] hover:bg-[#e7eaf4] hover:text-[#012A72]",
  };

  // Size styles (Button_v2 guidelines)
  const sizeStyles = {
    small: "px-4 py-2 min-w-[80px] text-[12px] leading-[16px]",
    medium: "px-4 py-2.5 min-w-[120px] text-[14px] leading-[20px]",
    large: "p-4 min-w-[120px] text-[16px] leading-[20px]",
    "icon-small": "size-[32px] p-0",
    "icon-medium": "size-[40px] p-0",
    "icon-large": "size-[56px] p-0",
  };

  // Icon sizes based on button size
  const iconSizes = {
    small: "size-4",
    medium: "size-5",
    large: "size-6",
    "icon-small": "size-4",
    "icon-medium": "size-5",
    "icon-large": "size-6",
  };

  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const iconElement = icon && (
    <span className={`shrink-0 ${iconSizes[size]} flex items-center justify-center [&_svg]:size-full`}>
      {icon}
    </span>
  );

  const loadingSpinner = (
    <span className={`${iconSizes[size]} animate-spin rounded-full border-2 border-current border-t-transparent`} />
  );

  return (
    <button
      className={combinedClassName}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          {loadingSpinner}
          {!isIconOnly && children}
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && iconElement}
          {!isIconOnly && children}
          {icon && iconPosition === "right" && iconElement}
        </>
      )}
    </button>
  );
}

// Convenience components for specific variants
export function PrimaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button {...props} variant="primary" />;
}

export function SecondaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button {...props} variant="secondary" />;
}

export function TertiaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button {...props} variant="tertiary" />;
}