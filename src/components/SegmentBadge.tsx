import { cn } from "@/lib/utils";

const segmentStyles: Record<string, string> = {
  VIP: "bg-vip/15 text-vip border-vip/30",
  ACTIVE: "bg-active/15 text-active border-active/30",
  SLEEPING: "bg-sleeping/15 text-sleeping border-sleeping/30",
};

export function SegmentBadge({ segment }: { segment: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        segmentStyles[segment] ?? "bg-muted text-muted-foreground"
      )}
    >
      {segment}
    </span>
  );
}
