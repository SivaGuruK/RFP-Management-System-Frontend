export interface RFPItem {
  _id?: string;
  name: string;
  quantity: number;
  specifications: string;
}

export interface RFP {
  _id: string;
  title: string;
  description: string;
  budget?: number;
  items: RFPItem[];
  deliveryTimeline?: string;
  paymentTerms?: string;
  warrantyRequired?: string;
  status: 'draft' | 'sent' | 'responses' | 'evaluated';
  vendorsSent: string[];
  createdAt: string;
  updatedAt: string;
}

// FIXED: FullRFP now has the same budget type as RFP
export interface FullRFP extends RFP {
  // If you need any additional fields specific to FullRFP, add them here
  // Otherwise, FullRFP is just an alias for RFP with full details
}

// OR if FullRFP and RFP are really the same, just use RFP everywhere
// and remove FullRFP completely

export interface GeneratedRFP {
  title: string;
  description: string;
  budget?: number;
  items: RFPItem[];
  deliveryTimeline?: string;
  paymentTerms?: string;
  warrantyRequired?: string;
}

export interface DashboardStats {
  total: number;
  draft: number;
  sent: number;
  responses: number;
  evaluated: number;
}

export interface RFPState {
  rfps: RFP[];
  currentRFP: RFP | null;
  generatedRFP: GeneratedRFP | null;
  dashboardStats: DashboardStats | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}