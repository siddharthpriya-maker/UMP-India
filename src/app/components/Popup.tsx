import { ReactNode } from "react";
import { X } from "lucide-react";
import { Overlay } from "./Overlay";
import { TextField } from "./TextField";

type PopupType = "status" | "form" | "loader" | "share";

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  type?: PopupType;
  title?: string;
  subtext?: string;
  icon?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  showCloseButton?: boolean;
  overlayStrength?: "weak" | "strong";
}

function PopupFooterBar() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="h-[8px] w-full bg-[#00b8f5]" />
      <div className="h-[8px] w-full bg-[#012a72]" />
    </div>
  );
}

function LoaderDots() {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`rounded-full ${
            i <= 2 || i >= 4
              ? "size-3 bg-[#012a72]"
              : "size-4 bg-[#00b8f5]"
          }`}
          style={{
            opacity: i === 1 || i === 5 ? 0.4 : i === 2 || i === 4 ? 0.7 : 1,
          }}
        />
      ))}
    </div>
  );
}

export function Popup({
  visible,
  onClose,
  type = "status",
  title,
  subtext,
  icon,
  children,
  footer,
  showCloseButton = true,
  overlayStrength = "strong",
}: PopupProps) {
  if (!visible) return null;

  return (
    <Overlay visible={visible} strength={overlayStrength} onClose={onClose}>
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div
          className="bg-white flex flex-col w-[620px] max-h-[90vh] relative rounded-[4px] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {showCloseButton && (
            <div className="flex items-end justify-end px-2 pt-2 shrink-0">
              <button
                onClick={onClose}
                className="size-8 flex items-center justify-center rounded-[4px] hover:bg-[#f5f9fe] transition-colors"
              >
                <X className="size-6 text-[#101010]" />
              </button>
            </div>
          )}

          {type === "status" && (
            <div className="flex flex-col items-center gap-8 pt-4 px-8 pb-0">
              {icon && (
                <div className="flex flex-col items-center">
                  <div className="size-12 flex items-center justify-center text-[#101010]">
                    {icon}
                  </div>
                </div>
              )}
              <div className="flex flex-col items-center gap-2 text-center">
                {title && (
                  <h2 className="text-[32px] font-bold leading-[36px] text-[#101010]">
                    {title}
                  </h2>
                )}
                {subtext && (
                  <p className="text-[14px] leading-[20px] text-[#101010]">
                    {subtext}
                  </p>
                )}
              </div>
              {footer && (
                <div className="flex items-center justify-center gap-5 w-full">
                  {footer}
                </div>
              )}
            </div>
          )}

          {type === "form" && (
            <div className="flex flex-col items-start gap-8 px-8">
              {icon && <div className="flex items-center">{icon}</div>}
              <div className="flex flex-col items-start gap-2">
                {title && (
                  <h2 className="text-[32px] font-bold leading-[36px] text-[#101010]">
                    {title}
                  </h2>
                )}
                {subtext && (
                  <p className="text-[14px] leading-[20px] text-[#101010]">
                    {subtext}
                  </p>
                )}
              </div>
              {children}
              {footer && (
                <div className="flex items-center gap-5">{footer}</div>
              )}
            </div>
          )}

          {type === "loader" && (
            <div className="flex flex-col items-center justify-center flex-1 gap-5 min-h-[250px] px-8 pb-8">
              <LoaderDots />
              {title && (
                <h2 className="text-[20px] font-semibold leading-[28px] text-[#101010] text-center">
                  {title}
                </h2>
              )}
            </div>
          )}

          {type === "share" && (
            <div className="flex flex-col items-start gap-8 px-8">
              <div className="flex flex-col items-start gap-2">
                {title && (
                  <h2 className="text-[32px] font-bold leading-[36px] text-[#101010]">
                    {title}
                  </h2>
                )}
                {subtext && (
                  <p className="text-[14px] leading-[20px] text-[#101010]">
                    {subtext}
                  </p>
                )}
              </div>
              {children}
            </div>
          )}

          <div className="pt-8 shrink-0">
            <PopupFooterBar />
          </div>
        </div>
      </div>
    </Overlay>
  );
}

interface PopupButtonGroupProps {
  children: ReactNode;
}

export function PopupButtonGroup({ children }: PopupButtonGroupProps) {
  return <div className="flex items-center gap-5">{children}</div>;
}

interface PopupInputProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  trailingContent?: ReactNode;
}

export function PopupInput({
  label,
  value,
  onChange,
  trailingContent,
}: PopupInputProps) {
  return (
    <TextField
      label={label}
      value={value ?? ""}
      onChange={(v) => onChange?.(v)}
      trailingIcon={trailingContent}
    />
  );
}

interface ShareIconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
}

export function ShareIconButton({ icon, onClick }: ShareIconButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#e7f1f8] p-4 rounded-[8px] flex items-center justify-center hover:bg-[#b1e6fb] transition-colors"
    >
      <span className="size-6 flex items-center justify-center text-[#004299]">
        {icon}
      </span>
    </button>
  );
}
