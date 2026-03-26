// store/useTelecallerStore.ts
import { create } from "zustand";
import { dashboardApi } from "@/features/dashboard/components/api/agent.api";

type Stats = {
  new_leads: number;
  working_leads: number;
  submitted_leads: number;
  docs_required_leads: number;
  sent_back_to_telecaller_leads: number;
};

type Store = {
  stats: Stats;
  loading: boolean;
  refreshLeadsTrigger: number;
  fetchStats: () => Promise<void>;
  triggerRefreshLeads: () => void;
};

export const useTelecallerStore = create<Store>((set) => ({
  stats: {
    new_leads: 0,
    working_leads: 0,
    submitted_leads: 0,
    docs_required_leads: 0,
    sent_back_to_telecaller_leads: 0,
  },
  loading: true,
  refreshLeadsTrigger: 0,

  triggerRefreshLeads: () => set((state) => ({ refreshLeadsTrigger: state.refreshLeadsTrigger + 1 })),

  fetchStats: async () => {
    set({ loading: true });
    try {
      const res = await dashboardApi();
      set({ stats: res });
    } catch (e) {
      console.error("Stats error", e);
    } finally {
      set({ loading: false });
    }
  },
}));