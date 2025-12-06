export interface Proposal {
  _id: string;
  rfpId: string | {
    _id: string;
    title: string;
  };
  vendorId: string | {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  price: number;
  deliveryTime: string;
  warranty: string;
  paymentTerms?: string;
  technicalSpecs?: string;
  additionalNotes?: string;
  aiScore?: number;
  aiAnalysis?: {
    strengths: string[];
    weaknesses: string[];
    recommendation: string;
  };
  status: 'pending' | 'evaluated' | 'accepted' | 'rejected';
  receivedDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProposalState {
  proposals: Proposal[];
  currentProposal: Proposal | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}
