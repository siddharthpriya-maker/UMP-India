import { Construction } from "lucide-react";

interface DesignInProgressProps {
  pageName: string;
}

export function DesignInProgress({ pageName }: DesignInProgressProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--background,#ffffff)] p-8">
      <div className="flex flex-col items-center gap-6 max-w-md text-center">
        {/* Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />
          <div className="relative bg-[var(--surface-level-3,#fafafa)] rounded-full p-8 border border-border">
            <Construction className="size-16 text-primary" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <h1 className="text-foreground font-semibold text-2xl">
            {pageName}
          </h1>
          <p className="text-muted-foreground text-base">
            Design in Progress
          </p>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          We're working on bringing you this feature. Check back soon to see the {pageName.toLowerCase()} dashboard in action.
        </p>

        {/* Decorative elements */}
        <div className="flex items-center gap-2 mt-4">
          <div className="size-2 bg-primary rounded-full animate-pulse" />
          <div className="size-2 bg-primary/60 rounded-full animate-pulse delay-150" style={{ animationDelay: "150ms" }} />
          <div className="size-2 bg-primary/30 rounded-full animate-pulse delay-300" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
