export interface RFP {
  _id: string;
  title: string;
  description: string;
  status: 'draft' | 'sent' | 'responses' | 'evaluated';
  requirements?: string[];
  deadline?: string;
  budget?: number;
  createdAt: string;
  updatedAt: string;
}

export interface GeneratedRFP {
  title: string;
  description: string;
  requirements: string[];
  deadline?: string;
  budget?: number;
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
