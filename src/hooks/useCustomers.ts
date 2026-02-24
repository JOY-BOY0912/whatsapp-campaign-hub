import { useQuery } from "@tanstack/react-query";
import { Customer, API_URL } from "@/lib/whatsapp";

export function useCustomers() {
  return useQuery<Customer[]>({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch customers");
      return res.json();
    },
  });
}
