export interface EmailReceiverStatus {
  message: string;
  instructions?: string;
  isPolling?: boolean;
  intervalSeconds?: number;
}

export interface EmailReceiverState {
  status: EmailReceiverStatus | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}
