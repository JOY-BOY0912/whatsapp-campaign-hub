import { Campaign } from "@/hooks/useCampaignEngine";
import { SegmentBadge } from "./SegmentBadge";
import { History } from "lucide-react";

interface Props {
  history: Campaign[];
}

export function CampaignHistory({ history }: Props) {
  if (history.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 p-4 border-b border-border">
        <History className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Campaign History</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="px-4 py-3 text-left font-medium">Campaign</th>
              <th className="px-4 py-3 text-left font-medium">Segment</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
              <th className="px-4 py-3 text-right font-medium">Sent</th>
              <th className="px-4 py-3 text-right font-medium">Skipped</th>
              <th className="px-4 py-3 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3">
                  <SegmentBadge segment={c.segment as "VIP" | "ACTIVE" | "SLEEPING"} />
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {c.startedAt.toLocaleDateString()} {c.startedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </td>
                <td className="px-4 py-3 text-right">{c.totalCustomers}</td>
                <td className="px-4 py-3 text-right text-active">{c.sentCount}</td>
                <td className="px-4 py-3 text-right text-sleeping">{c.skippedCount}</td>
                <td className="px-4 py-3 text-right">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    Completed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
