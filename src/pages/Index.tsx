import { useCustomers } from "@/hooks/useCustomers";
import { StatsCards } from "@/components/StatsCards";
import { CampaignPanel } from "@/components/CampaignPanel";
import { CustomerTable } from "@/components/CustomerTable";
import { MessageSquare, Loader2 } from "lucide-react";

const Index = () => {
  const { data: customers, isLoading, isError } = useCustomers();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-6">
        <div className="mx-auto max-w-7xl flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Marketing Campaign Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Send WhatsApp campaigns to customer segments
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading customers...</span>
          </div>
        ) : isError ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center text-destructive">
            Failed to load customers. Please check your API connection.
          </div>
        ) : (
          <>
            <StatsCards customers={customers!} />
            <CampaignPanel customers={customers!} />
            <CustomerTable customers={customers!} />
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
