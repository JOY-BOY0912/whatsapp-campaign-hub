import { useState, useMemo } from "react";
import { Customer, openWhatsApp } from "@/lib/whatsapp";
import { SegmentBadge } from "./SegmentBadge";
import { Search, Send } from "lucide-react";

interface Props {
  customers: Customer[];
}

export function CustomerTable({ customers }: Props) {
  const [search, setSearch] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("ALL");

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchSearch =
        c.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search);
      const matchSegment = segmentFilter === "ALL" || c.segment === segmentFilter;
      return matchSearch && matchSegment;
    });
  }, [customers, search, segmentFilter]);

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Customers</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 rounded-lg border border-border bg-input pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select
            value={segmentFilter}
            onChange={(e) => setSegmentFilter(e.target.value)}
            className="rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="ALL">All Segments</option>
            <option value="VIP">VIP</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="SLEEPING">SLEEPING</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Phone</th>
              <th className="px-4 py-3 text-left font-medium">Segment</th>
              <th className="px-4 py-3 text-right font-medium">Orders</th>
              <th className="px-4 py-3 text-right font-medium">Spent</th>
              <th className="px-4 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  No customers found
                </td>
              </tr>
            ) : (
              filtered.map((c, i) => (
                <tr
                  key={`${c.phone}-${i}`}
                  className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{c.customer_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.phone}</td>
                  <td className="px-4 py-3">
                    <SegmentBadge segment={c.segment} />
                  </td>
                  <td className="px-4 py-3 text-right">{c.total_orders}</td>
                  <td className="px-4 py-3 text-right">₹{c.total_spent.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => openWhatsApp(c)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
                    >
                      <Send className="h-3 w-3" />
                      Send
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
