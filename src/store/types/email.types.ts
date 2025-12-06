export interface Email {
  _id: string;
  rfpId: {
    _id: string;
    title: string;
  } | string;
  vendorId: {
    _id: string;
    name: string;
    email: string;
  } | string;
  from: string;
  to: string;
  subject: string;
  body: string;
  attachments?: string[];
  direction: 'inbound' | 'outbound';
  status: 'sent' | 'received' | 'parsed' | 'failed';
  parsedProposalId?: string;
  receivedAt?: string;
  sentAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SendRFPToVendorsPayload {
  rfpId: string;
  vendorIds: string[];
}

export interface SendRFPToVendorsResponse {
  sent: number;
  failed: number;
  successEmails: string[];
  failedEmails: string[];
}

export interface EmailState {
  emails: Email[];
  currentEmail: Email | null;
  sendResult: SendRFPToVendorsResponse | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

