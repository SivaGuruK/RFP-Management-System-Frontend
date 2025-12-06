import {type RootState } from '../types/store.types';
import type { Email, SendRFPToVendorsResponse } from '../types/email.types';

export const emailSelectors = {
  selectAllEmails: (state: RootState): Email[] => state.email.emails,
  selectCurrentEmail: (state: RootState): Email | null => state.email.currentEmail,
  selectSendResult: (state: RootState): SendRFPToVendorsResponse | null => state.email.sendResult,
  selectEmailLoading: (state: RootState): boolean => state.email.loading,
  selectEmailError: (state: RootState): string | null => state.email.error,
  selectEmailSuccess: (state: RootState): boolean => state.email.success,
  selectEmailCount: (state: RootState): number => state.email.emails.length,
  selectEmailsByDirection: (direction: 'inbound' | 'outbound') => (state: RootState): Email[] =>
    state.email.emails.filter((email) => email.direction === direction),
  selectEmailsByStatus: (status: string) => (state: RootState): Email[] =>
    state.email.emails.filter((email) => email.status === status),
  selectOutboundEmails: (state: RootState): Email[] =>
    state.email.emails.filter((email) => email.direction === 'outbound'),
  selectInboundEmails: (state: RootState): Email[] =>
    state.email.emails.filter((email) => email.direction === 'inbound'),
  selectFailedEmails: (state: RootState): Email[] =>
    state.email.emails.filter((email) => email.status === 'failed'),
};