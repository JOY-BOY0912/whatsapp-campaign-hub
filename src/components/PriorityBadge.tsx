import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  HIGH: "bg-destructive/15 text-destructive border-destructive/30",
  MEDIUM: "bg-vip/15 text-vip border-vip/30",
  LOW: "bg-sleeping/15 text-sleeping border-sleeping/30",
};

const icons: Record<string, string> = {
  HIGH: "🔥",
  MEDIUM: "⚡",
  LOW: "💤",
};

export function PriorityBadge({ level }: { level: "HIGH" | "MEDIUM" | "LOW" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        styles[level]
      )}
    >
      {icons[level]} {level}
    </span>
  );
}
