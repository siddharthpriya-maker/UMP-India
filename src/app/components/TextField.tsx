import { useState, useRef, useId, useEffect, useCallback } from "react";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "url" | "number" | "password" | "date";
  disabled?: boolean;
  error?: string;
  assistiveText?: string;
  required?: boolean;
  prefix?: string;
  trailingIcon?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
  size?: "default" | "compact";
}

export function TextField({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
  error,
  assistiveText,
  required,
  prefix,
  trailingIcon,
  multiline = false,
  rows = 3,
  size = "default",
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const [autofilled, setAutofilled] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const id = useId();

  const handleAnimationStart = useCallback(
    (e: React.AnimationEvent) => {
      if (e.animationName === "onAutoFillStart") setAutofilled(true);
      if (e.animationName === "onAutoFillCancel") setAutofilled(false);
    },
    []
  );

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    try {
      if (el.matches(":-webkit-autofill")) setAutofilled(true);
    } catch {}
  }, []);

  const hasValue = value.length > 0;
  const floated = focused || hasValue || autofilled || type === "date";

  const isCompact = size === "compact";
  const containerHeight = multiline ? undefined : isCompact ? 44 : 56;
  const inputTextSize = isCompact ? "text-[13px]" : "text-[14px]";

  const borderColor = error
    ? "border-[#fd5154]"
    : focused
      ? "border-[#004299]"
      : "border-[#e0e0e0] hover:border-[#004299]";

  const bgColor = disabled ? "bg-[#ebebeb]" : "bg-white";

  const handleContainerClick = () => {
    if (!disabled) inputRef.current?.focus();
  };

  const sharedInputClasses = [
    "w-full bg-transparent outline-none",
    inputTextSize,
    "text-[#101010] placeholder:text-transparent",
    disabled ? "text-[#acacac] cursor-not-allowed" : "",
  ].join(" ");

  return (
    <div className="flex flex-col gap-1">
      <div
        onClick={handleContainerClick}
        className={[
          "relative flex items-center border rounded-[4px] transition-colors",
          borderColor,
          bgColor,
          disabled ? "cursor-not-allowed" : "cursor-text",
          prefix ? "overflow-hidden" : "",
        ].join(" ")}
        style={containerHeight ? { height: containerHeight } : undefined}
      >
        {prefix && (
          <span className="px-[16px] text-[14px] text-[#7e7e7e] bg-[#fafafa] h-full flex items-center border-r border-[#e0e0e0] shrink-0 select-none">
            {prefix}
          </span>
        )}

        <div
          className={[
            "relative flex-1 h-full",
            multiline ? "py-[8px] px-[16px]" : "px-[16px]",
          ].join(" ")}
        >
          {/* Floating label */}
          <label
            htmlFor={id}
            className={[
              "absolute left-[16px] right-[16px] transition-all duration-150 pointer-events-none select-none truncate",
              floated
                ? [
                    "text-[12px] font-normal leading-[16px] text-[#7e7e7e]",
                    isCompact ? "top-[4px]" : "top-[8px]",
                  ].join(" ")
                : [
                    isCompact ? "text-[13px]" : "text-[14px]",
                    "font-semibold text-[#7e7e7e] top-1/2 -translate-y-1/2",
                  ].join(" "),
              disabled ? "text-[#acacac]" : "",
            ].join(" ")}
            style={floated ? { height: 16 } : undefined}
          >
            {label}
            {required && <span className="text-[#fd5154] ml-0.5">*</span>}
          </label>

          {multiline ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              id={id}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              disabled={disabled}
              rows={rows}
              className={[
                sharedInputClasses,
                "resize-none leading-[24px]",
                floated ? "mt-[16px]" : "mt-0",
              ].join(" ")}
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              id={id}
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onAnimationStart={handleAnimationStart}
              disabled={disabled}
              className={sharedInputClasses}
              style={
                floated
                  ? {
                      paddingTop: isCompact ? 20 : 24,
                      paddingBottom: isCompact ? 4 : 8,
                      lineHeight: "24px",
                      height: "100%",
                    }
                  : {
                      height: "100%",
                      lineHeight: "24px",
                    }
              }
            />
          )}
        </div>

        {trailingIcon && (
          <div className="pr-[16px] flex items-center shrink-0 text-[#7e7e7e]">
            {trailingIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="text-[12px] leading-[16px] text-[#fd5154]">{error}</p>
      )}
      {!error && assistiveText && (
        <p className="text-[12px] leading-[16px] text-[#101010]">{assistiveText}</p>
      )}
    </div>
  );
}
