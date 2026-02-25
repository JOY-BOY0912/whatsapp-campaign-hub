import { useMemo } from "react";
import { useCustomers } from "@/hooks/useCustomers";
import { useCampaignEngine } from "@/hooks/useCampaignEngine";
import { scoreAndSort } from "@/lib/scoring";
import { StatsCards } from "@/components/StatsCards";
import { OperatorAssistPanel } from "@/components/OperatorAssistPanel";
import { CampaignHistory } from "@/components/CampaignHistory";
import { CustomerTable } from "@/components/CustomerTable";
import { MessageSquare, Loader2, Rocket } from "lucide-react";

const Index = () => {
  const { data: customers, isLoading, isError } = useCustomers();
  const engine = useCampaignEngine();

  const scoredCustomers = useMemo(() => {
    if (!customers) return [];
    return scoreAndSort(customers);
  }, [customers]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-6">
        <div className="mx-auto max-w-7xl flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Agency Marketing Campaign Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Hybrid automation · Smart priority queue · WhatsApp campaigns
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
            <StatsCards customers={scoredCustomers} />

            {/* Start Smart Queue button */}
            {!engine.currentCampaign && (
              <div className="rounded-xl border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">🧠 Smart Priority Queue</h2>
                  <p className="text-sm text-muted-foreground">
                    {scoredCustomers.length} customers auto-scored and sorted by priority. Start the operator workflow.
                  </p>
                </div>
                <button
                  onClick={() => engine.startSmartQueue(scoredCustomers)}
                  disabled={scoredCustomers.length === 0}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  <Rocket className="h-4 w-4" />
                  Start Smart Queue ({scoredCustomers.length})
                </button>
              </div>
            )}

            {engine.currentCampaign && engine.currentCustomer && (
              <OperatorAssistPanel
                customer={engine.currentCustomer}
                queueLength={engine.campaignQueue.length}
                currentIndex={engine.currentIndex}
                sentCount={engine.sentCount}
                skippedCount={engine.skippedCount}
                progress={engine.progress}
                onOpenWhatsApp={engine.openWhatsApp}
                onMarkSent={engine.markSent}
                onSkip={engine.skip}
                onEndCampaign={engine.endCampaign}
              />
            )}

            <CampaignHistory history={engine.history} />

            <CustomerTable customers={scoredCustomers} />
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
