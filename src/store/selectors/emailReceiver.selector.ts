import { type RootState } from '../types/store.types';
import { type EmailReceiverStatus } from '../types/emailReceiver.types';

export const emailReceiverSelectors = {
  selectEmailReceiverStatus: (state: RootState): EmailReceiverStatus | null =>
    state.emailReceiver.status,
  selectEmailReceiverLoading: (state: RootState): boolean => state.emailReceiver.loading,
  selectEmailReceiverError: (state: RootState): string | null => state.emailReceiver.error,
  selectEmailReceiverSuccess: (state: RootState): boolean => state.emailReceiver.success,
};