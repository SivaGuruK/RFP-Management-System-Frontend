export interface Vendor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  contactPerson: string;
  rfpsSent: number;
  responsesReceived: number;
  createdAt: string;
  updatedAt: string;
}

export interface VendorStats {
  rfpsSent?: number;
  responsesReceived?: number;
}

export interface VendorState {
  vendors: Vendor[];
  currentVendor: Vendor | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}