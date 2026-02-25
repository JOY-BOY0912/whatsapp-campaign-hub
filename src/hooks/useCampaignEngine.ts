import { useState, useCallback } from "react";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { ScoredCustomer } from "@/lib/scoring";

export interface CampaignLog {
  campaignId: string;
  customerName: string;
  phone: string;
  status: "sent" | "skipped";
  timestamp: Date;
}

export interface Campaign {
  id: string;
  name: string;
  segment: string;
  startedAt: Date;
  completedAt?: Date;
  status: "running" | "completed";
  totalCustomers: number;
  sentCount: number;
  skippedCount: number;
}

interface CampaignState {
  currentCampaign: Campaign | null;
  campaignQueue: ScoredCustomer[];
  currentIndex: number;
  logs: CampaignLog[];
  history: Campaign[];
}

export function useCampaignEngine() {
  const [state, setState] = useState<CampaignState>({
    currentCampaign: null,
    campaignQueue: [],
    currentIndex: 0,
    logs: [],
    history: [],
  });

  const currentCustomer = state.currentCampaign
    ? state.campaignQueue[state.currentIndex] ?? null
    : null;

  const sentCount = state.logs.filter(
    (l) => l.campaignId === state.currentCampaign?.id && l.status === "sent"
  ).length;

  const skippedCount = state.logs.filter(
    (l) => l.campaignId === state.currentCampaign?.id && l.status === "skipped"
  ).length;

  const progress = state.currentCampaign
    ? Math.round(((sentCount + skippedCount) / state.campaignQueue.length) * 100)
    : 0;

  const startSmartQueue = useCallback((sortedCustomers: ScoredCustomer[]) => {
    if (sortedCustomers.length === 0) return;

    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const campaign: Campaign = {
      id: crypto.randomUUID(),
      name: `Smart Hybrid Campaign - ${today}`,
      segment: "ALL",
      startedAt: new Date(),
      status: "running",
      totalCustomers: sortedCustomers.length,
      sentCount: 0,
      skippedCount: 0,
    };

    setState((s) => ({
      ...s,
      currentCampaign: campaign,
      campaignQueue: sortedCustomers,
      currentIndex: 0,
    }));
  }, []);

  const advanceOrEnd = useCallback(() => {
    setState((s) => {
      const nextIndex = s.currentIndex + 1;
      if (nextIndex >= s.campaignQueue.length) {
        const allLogs = s.logs;
        const completed: Campaign = {
          ...s.currentCampaign!,
          status: "completed",
          completedAt: new Date(),
          sentCount: allLogs.filter(
            (l) => l.campaignId === s.currentCampaign!.id && l.status === "sent"
          ).length,
          skippedCount: allLogs.filter(
            (l) => l.campaignId === s.currentCampaign!.id && l.status === "skipped"
          ).length,
        };
        return {
          ...s,
          currentCampaign: null,
          campaignQueue: [],
          currentIndex: 0,
          history: [completed, ...s.history],
        };
      }
      return { ...s, currentIndex: nextIndex };
    });
  }, []);

  const openWhatsApp = useCallback(() => {
    if (!currentCustomer) return;
    const link = document.createElement("a");
    link.href = getWhatsAppLink(currentCustomer);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [currentCustomer]);

  const markSent = useCallback(() => {
    if (!currentCustomer || !state.currentCampaign) return;
    setState((s) => ({
      ...s,
      logs: [
        ...s.logs,
        {
          campaignId: s.currentCampaign!.id,
          customerName: currentCustomer.customer_name,
          phone: currentCustomer.phone,
          status: "sent",
          timestamp: new Date(),
        },
      ],
    }));
    advanceOrEnd();
  }, [currentCustomer, state.currentCampaign, advanceOrEnd]);

  const skip = useCallback(() => {
    if (!currentCustomer || !state.currentCampaign) return;
    setState((s) => ({
      ...s,
      logs: [
        ...s.logs,
        {
          campaignId: s.currentCampaign!.id,
          customerName: currentCustomer.customer_name,
          phone: currentCustomer.phone,
          status: "skipped",
          timestamp: new Date(),
        },
      ],
    }));
    advanceOrEnd();
  }, [currentCustomer, state.currentCampaign, advanceOrEnd]);

  const endCampaign = useCallback(() => {
    setState((s) => {
      if (!s.currentCampaign) return s;
      const completed: Campaign = {
        ...s.currentCampaign,
        status: "completed",
        completedAt: new Date(),
        sentCount: s.logs.filter(
          (l) => l.campaignId === s.currentCampaign!.id && l.status === "sent"
        ).length,
        skippedCount: s.logs.filter(
          (l) => l.campaignId === s.currentCampaign!.id && l.status === "skipped"
        ).length,
      };
      return {
        ...s,
        currentCampaign: null,
        campaignQueue: [],
        currentIndex: 0,
        history: [completed, ...s.history],
      };
    });
  }, []);

  return {
    ...state,
    currentCustomer,
    sentCount,
    skippedCount,
    progress,
    startSmartQueue,
    openWhatsApp,
    markSent,
    skip,
    endCampaign,
  };
}
