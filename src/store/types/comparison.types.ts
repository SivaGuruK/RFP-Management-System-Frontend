export interface Vendor {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface RFPInfo {
  id: string;
  title: string;
  budget: number;
  status: string;
}

export interface Proposal {
  id: string;
  vendor: Vendor;
  price: number;
  deliveryTime: string;
  warranty: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  status: string;
  receivedDate: string;
}

export interface TopRecommendation {
  vendor: Vendor;
  score: number;
  price: number;
  deliveryTime: string;
  warranty: string;
  recommendation: string;
}

export interface ComparisonResult {
  rfp: RFPInfo;
  topRecommendation: TopRecommendation;
  proposals: Proposal[];
}

export interface ComparisonState {
  comparisonResult: ComparisonResult | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}