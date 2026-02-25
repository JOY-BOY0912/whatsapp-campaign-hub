import { ScoredCustomer } from "@/lib/scoring";
import { SegmentBadge } from "./SegmentBadge";
import { PriorityBadge } from "./PriorityBadge";
import { ExternalLink, CheckCircle2, SkipForward, XCircle, User, Phone, ShoppingCart, DollarSign, Target } from "lucide-react";

interface Props {
  customer: ScoredCustomer;
  queueLength: number;
  currentIndex: number;
  sentCount: number;
  skippedCount: number;
  progress: number;
  onOpenWhatsApp: () => void;
  onMarkSent: () => void;
  onSkip: () => void;
  onEndCampaign: () => void;
}

export function OperatorAssistPanel({
  customer,
  queueLength,
  currentIndex,
  sentCount,
  skippedCount,
  progress,
  onOpenWhatsApp,
  onMarkSent,
  onSkip,
  onEndCampaign,
}: Props) {
  const messageTemplates: Record<string, (name: string) => string> = {
    VIP: (name) => `Hi ${name} 👑\nThanks for being our VIP customer!\nHere's a special offer just for you 🎉`,
    ACTIVE: (name) => `Hi ${name} 😊\nWe have new offers waiting for you!`,
    SLEEPING: (name) => `Hi ${name} 😢\nWe miss you! Come back and enjoy special discounts.`,
  };
  const messagePreview = messageTemplates[customer.segment]?.(customer.customer_name) ?? "";

  return (
    <div className="rounded-xl border-2 border-primary/30 bg-card p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-primary">⚡ Operator Assist Mode</h2>
          <p className="text-sm text-muted-foreground">
            Customer {currentIndex + 1} of {queueLength} · Priority Queue
          </p>
        </div>
        <div className="text-right text-sm text-muted-foreground">
          <span className="text-primary font-semibold">{sentCount}</span> sent ·{" "}
          <span className="text-sleeping font-semibold">{skippedCount}</span> skipped
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Customer card */}
      <div className="rounded-lg border border-border bg-secondary/50 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            {customer.customer_name}
          </h3>
          <div className="flex items-center gap-2">
            <PriorityBadge level={customer.priorityLevel} />
            <SegmentBadge segment={customer.segment} />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-3.5 w-3.5" />
            <span>{customer.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>{customer.total_orders} orders</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="h-3.5 w-3.5" />
            <span>₹{customer.total_spent.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Target className="h-3.5 w-3.5" />
            <span>Score: {Math.round(customer.priorityScore)}</span>
          </div>
        </div>
      </div>

      {/* Message preview */}
      <div className="rounded-lg border border-border bg-muted/50 p-4">
        <p className="text-xs text-muted-foreground mb-1.5 font-medium uppercase tracking-wider">Message Preview</p>
        <p className="text-sm whitespace-pre-line text-foreground/80">{messagePreview}</p>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={onOpenWhatsApp}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <ExternalLink className="h-4 w-4" />
          Open WhatsApp
        </button>
        <button
          onClick={onMarkSent}
          className="flex items-center justify-center gap-2 rounded-lg bg-active/20 px-4 py-3 text-sm font-bold text-active hover:bg-active/30 transition-colors"
        >
          <CheckCircle2 className="h-4 w-4" />
          Mark Sent
        </button>
        <button
          onClick={onSkip}
          className="flex items-center justify-center gap-2 rounded-lg bg-sleeping/20 px-4 py-3 text-sm font-bold text-sleeping hover:bg-sleeping/30 transition-colors"
        >
          <SkipForward className="h-4 w-4" />
          Skip
        </button>
        <button
          onClick={onEndCampaign}
          className="flex items-center justify-center gap-2 rounded-lg bg-destructive/20 px-4 py-3 text-sm font-bold text-destructive hover:bg-destructive/30 transition-colors"
        >
          <XCircle className="h-4 w-4" />
          End Campaign
        </button>
      </div>
    </div>
  );
}
