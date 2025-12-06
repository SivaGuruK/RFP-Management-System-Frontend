import { type RootState } from '../types/store.types';
import { type ComparisonResult } from '../types/comparison.types';

export const comparisonSelectors = {
  selectComparisonResult: (state: RootState): ComparisonResult | null =>
    state.comparison.comparisonResult,
  selectComparisonLoading: (state: RootState): boolean => state.comparison.loading,
  selectComparisonError: (state: RootState): string | null => state.comparison.error,
  selectComparisonSuccess: (state: RootState): boolean => state.comparison.success,
  
  selectTopRecommendation: (state: RootState) =>
    state.comparison.comparisonResult?.topRecommendation || null,
  
  selectAllProposals: (state: RootState) =>
    state.comparison.comparisonResult?.proposals || [],
    
  selectRFPInfo: (state: RootState) =>
    state.comparison.comparisonResult?.rfp || null,
};