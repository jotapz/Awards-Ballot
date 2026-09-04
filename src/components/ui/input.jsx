import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full rounded-lg border border-white/15 bg-white/5 px-3 text-sm text-white",
        "placeholder:text-white/40 outline-none transition-colors",
        "focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-[72px] w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white",
        "placeholder:text-white/40 outline-none transition-colors resize-y",
        "focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/30",
        className
      )}
      {...props}
    />
  );
}

export { Input, Textarea };
