import { Customer } from "@/lib/whatsapp";
import { Crown, Zap, Moon, Users } from "lucide-react";

interface Props {
  customers: Customer[];
}

export function StatsCards({ customers }: Props) {
  const vip = customers.filter((c) => c.segment === "VIP").length;
  const active = customers.filter((c) => c.segment === "ACTIVE").length;
  const sleeping = customers.filter((c) => c.segment === "SLEEPING").length;

  const cards = [
    { label: "Total Customers", count: customers.length, icon: Users, color: "text-foreground", bg: "bg-secondary" },
    { label: "VIP Customers", count: vip, icon: Crown, color: "text-vip", bg: "bg-vip/10" },
    { label: "Active Customers", count: active, icon: Zap, color: "text-active", bg: "bg-active/10" },
    { label: "Sleeping Customers", count: sleeping, icon: Moon, color: "text-sleeping", bg: "bg-sleeping/10" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <div className={`rounded-lg p-2 ${card.bg}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </div>
          <p className="mt-2 text-3xl font-bold tracking-tight">{card.count}</p>
        </div>
      ))}
    </div>
  );
}
