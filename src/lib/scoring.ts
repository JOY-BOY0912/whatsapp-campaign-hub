import { Customer } from "./whatsapp";

export interface ScoredCustomer extends Customer {
  priorityScore: number;
  priorityLevel: "HIGH" | "MEDIUM" | "LOW";
}

const SEGMENT_BONUS: Record<string, number> = {
  VIP: 100,
  ACTIVE: 50,
  SLEEPING: 10,
};

export function calculateScore(customer: Customer): number {
  const bonus = SEGMENT_BONUS[customer.segment] ?? 0;
  const spent = customer.total_spent ?? 0;
  const orders = customer.total_orders ?? 0;
  return spent * 0.6 + orders * 0.3 + bonus;
}

export function getPriorityLevel(score: number): "HIGH" | "MEDIUM" | "LOW" {
  if (score > 3000) return "HIGH";
  if (score > 1000) return "MEDIUM";
  return "LOW";
}

export function scoreAndSort(customers: Customer[]): ScoredCustomer[] {
  return customers
    .map((c) => {
      const priorityScore = calculateScore(c);
      return { ...c, priorityScore, priorityLevel: getPriorityLevel(priorityScore) };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore);
}
