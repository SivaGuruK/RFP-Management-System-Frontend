import { type RootState } from '../types/store.types';
import type { RFP, DashboardStats, GeneratedRFP } from '../types/rfp.types';

export const rfpSelectors = {

  selectAllRFPs: (state: RootState): RFP[] => state.rfp.rfps,
  selectCurrentRFP: (state: RootState): RFP | null => state.rfp.currentRFP,
  selectGeneratedRFP: (state: RootState): GeneratedRFP | null => state.rfp.generatedRFP,
  selectDashboardStats: (state: RootState): DashboardStats | null => state.rfp.dashboardStats,
  selectRFPLoading: (state: RootState): boolean => state.rfp.loading,
  selectRFPError: (state: RootState): string | null => state.rfp.error,
  selectRFPSuccess: (state: RootState): boolean => state.rfp.success,
  selectRFPsByStatus: (status: string) => (state: RootState): RFP[] =>
    state.rfp.rfps.filter((rfp) => rfp.status === status),
  selectRFPCount: (state: RootState): number => state.rfp.rfps.length,
  selectRFPById: (id: string) => (state: RootState): RFP | undefined =>
    state.rfp.rfps.find((rfp) => rfp._id === id),
};
