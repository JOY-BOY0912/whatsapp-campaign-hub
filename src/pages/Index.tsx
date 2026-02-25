import { useCustomers } from "@/hooks/useCustomers";
import { useCampaignEngine } from "@/hooks/useCampaignEngine";
import { StatsCards } from "@/components/StatsCards";
import { CampaignPanel } from "@/components/CampaignPanel";
import { OperatorAssistPanel } from "@/components/OperatorAssistPanel";
import { CampaignHistory } from "@/components/CampaignHistory";
import { CustomerTable } from "@/components/CustomerTable";
import { MessageSquare, Loader2 } from "lucide-react";

const Index = () => {
  const { data: customers, isLoading, isError } = useCustomers();
  const engine = useCampaignEngine();

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
              Manage and send WhatsApp campaigns like a marketing agency
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

            <CampaignPanel
              customers={customers!}
              onStartCampaign={(name, segment) => engine.startCampaign(name, segment, customers!)}
              isRunning={!!engine.currentCampaign}
            />

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

            <CustomerTable customers={customers!} />
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
