import {type RootState } from '../types/store.types';
import {type Proposal } from '../types/proposal.types';

export const proposalSelectors = {
  selectAllProposals: (state: RootState): Proposal[] => state.proposal.proposals,
  selectCurrentProposal: (state: RootState): Proposal | null => state.proposal.currentProposal,
  selectProposalLoading: (state: RootState): boolean => state.proposal.loading,
  selectProposalError: (state: RootState): string | null => state.proposal.error,
  selectProposalSuccess: (state: RootState): boolean => state.proposal.success,
  selectProposalCount: (state: RootState): number => state.proposal.proposals.length,
  
  selectProposalsByStatus: (status: string) => (state: RootState): Proposal[] =>
    state.proposal.proposals.filter((p) => p.status === status),
  
  selectTopProposals: (limit: number = 3) => (state: RootState): Proposal[] =>
    [...state.proposal.proposals]
      .sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0))
      .slice(0, limit),
};