import { ScoredCustomer } from "@/lib/scoring";
import { Crown, Zap, Moon, Users, Flame, BoltIcon, BedDouble } from "lucide-react";

interface Props {
  customers: ScoredCustomer[];
}

export function StatsCards({ customers }: Props) {
  const vip = customers.filter((c) => c.segment === "VIP").length;
  const active = customers.filter((c) => c.segment === "ACTIVE").length;
  const sleeping = customers.filter((c) => c.segment === "SLEEPING").length;
  const high = customers.filter((c) => c.priorityLevel === "HIGH").length;
  const medium = customers.filter((c) => c.priorityLevel === "MEDIUM").length;
  const low = customers.filter((c) => c.priorityLevel === "LOW").length;

  const cards = [
    { label: "Total Customers", count: customers.length, icon: Users, color: "text-foreground", bg: "bg-secondary" },
    { label: "🔥 High Priority", count: high, icon: Flame, color: "text-destructive", bg: "bg-destructive/10" },
    { label: "⚡ Medium Priority", count: medium, icon: BoltIcon, color: "text-vip", bg: "bg-vip/10" },
    { label: "💤 Low Priority", count: low, icon: BedDouble, color: "text-sleeping", bg: "bg-sleeping/10" },
    { label: "VIP", count: vip, icon: Crown, color: "text-vip", bg: "bg-vip/10" },
    { label: "Active", count: active, icon: Zap, color: "text-active", bg: "bg-active/10" },
    { label: "Sleeping", count: sleeping, icon: Moon, color: "text-sleeping", bg: "bg-sleeping/10" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{card.label}</p>
            <div className={`rounded-lg p-1.5 ${card.bg}`}>
              <card.icon className={`h-3.5 w-3.5 ${card.color}`} />
            </div>
          </div>
          <p className="mt-1.5 text-2xl font-bold tracking-tight">{card.count}</p>
        </div>
      ))}
    </div>
  );
}
