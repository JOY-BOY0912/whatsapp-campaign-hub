export interface Customer {
  customer_name: string;
  phone: string;
  segment: "VIP" | "ACTIVE" | "SLEEPING";
  total_orders: number;
  total_spent: number;
}

const messageTemplates: Record<string, (name: string) => string> = {
  VIP: (name) =>
    `Hi ${name} 👑\nThanks for being our VIP customer!\nHere's a special offer just for you 🎉`,
  ACTIVE: (name) =>
    `Hi ${name} 😊\nWe have new offers waiting for you!`,
  SLEEPING: (name) =>
    `Hi ${name} 😢\nWe miss you! Come back and enjoy special discounts.`,
};

export function getWhatsAppLink(customer: Customer): string {
  const cleanPhone = customer.phone.replace(/[+\s]/g, "");
  const message = messageTemplates[customer.segment](customer.customer_name);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(customer: Customer) {
  window.open(getWhatsAppLink(customer), "_blank");
}

export function startCampaign(customers: Customer[], onProgress?: (i: number) => void) {
  customers.forEach((customer, index) => {
    setTimeout(() => {
      openWhatsApp(customer);
      onProgress?.(index + 1);
    }, index * 2500);
  });
}

export const API_URL = "https://n8n.srv1302157.hstgr.cloud/webhook/customers-campagin";
