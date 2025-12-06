import type { Proposal } from "./proposal.types";

export interface ComparisonScore {
  proposalId: string;
  vendorName: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  priceScore: number;
  deliveryScore: number;
  warrantyScore: number;
  valueScore: number;
}

export interface ComparisonResult {
  scores: ComparisonScore[];
  reasoning: string;
  topRecommendation: {
    vendor: string;
    score: number;
    price: number;
    deliveryTime: string;
    warranty: string;
    recommendation: string;
  };
  proposals: Proposal[];
}

export interface ComparisonState {
  comparisonResult: ComparisonResult | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}
