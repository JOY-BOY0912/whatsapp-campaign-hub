import { useState } from "react";
import { Customer } from "@/lib/whatsapp";
import { Rocket } from "lucide-react";

interface Props {
  customers: Customer[];
  onStartCampaign: (name: string, segment: string) => void;
  isRunning: boolean;
}

export function CampaignPanel({ customers, onStartCampaign, isRunning }: Props) {
  const [segment, setSegment] = useState<string>("VIP");
  const [campaignName, setCampaignName] = useState("");

  const filtered = customers.filter((c) => c.segment === segment);

  const handleStart = () => {
    if (filtered.length === 0 || !campaignName.trim()) return;
    onStartCampaign(campaignName.trim(), segment);
    setCampaignName("");
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold mb-1">Campaign Control</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Create and launch a WhatsApp campaign with Operator Assist Mode
      </p>
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
        <div className="flex-1 w-full sm:w-auto">
          <label className="text-sm text-muted-foreground mb-1.5 block">Campaign Name</label>
          <input
            type="text"
            placeholder="e.g. March VIP Promo"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            disabled={isRunning}
            className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          />
        </div>
        <div className="w-full sm:w-auto">
          <label className="text-sm text-muted-foreground mb-1.5 block">Segment</label>
          <select
            value={segment}
            onChange={(e) => setSegment(e.target.value)}
            disabled={isRunning}
            className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          >
            <option value="VIP">👑 VIP</option>
            <option value="ACTIVE">⚡ ACTIVE</option>
            <option value="SLEEPING">🌙 SLEEPING</option>
          </select>
        </div>
        <button
          onClick={handleStart}
          disabled={isRunning || filtered.length === 0 || !campaignName.trim()}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <Rocket className="h-4 w-4" />
          {isRunning ? "Campaign Running..." : `Start Campaign (${filtered.length})`}
        </button>
      </div>
    </div>
  );
}
