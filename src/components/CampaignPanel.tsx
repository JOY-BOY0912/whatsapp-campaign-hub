import { useState } from "react";
import { Customer, startCampaign } from "@/lib/whatsapp";
import { Rocket } from "lucide-react";

interface Props {
  customers: Customer[];
}

export function CampaignPanel({ customers }: Props) {
  const [segment, setSegment] = useState<string>("VIP");
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const filtered = customers.filter((c) => c.segment === segment);

  const handleStart = () => {
    if (filtered.length === 0) return;
    setRunning(true);
    setProgress(0);
    startCampaign(filtered, (i) => {
      setProgress(i);
      if (i >= filtered.length) {
        setTimeout(() => setRunning(false), 500);
      }
    });
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold mb-1">Campaign Control</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Select a segment and launch a WhatsApp campaign
      </p>
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
        <div className="flex-1 w-full sm:w-auto">
          <label className="text-sm text-muted-foreground mb-1.5 block">Segment</label>
          <select
            value={segment}
            onChange={(e) => setSegment(e.target.value)}
            className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="VIP">👑 VIP</option>
            <option value="ACTIVE">⚡ ACTIVE</option>
            <option value="SLEEPING">🌙 SLEEPING</option>
          </select>
        </div>
        <button
          onClick={handleStart}
          disabled={running || filtered.length === 0}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <Rocket className="h-4 w-4" />
          {running ? `Sending ${progress}/${filtered.length}...` : `Start Campaign (${filtered.length})`}
        </button>
      </div>
    </div>
  );
}
