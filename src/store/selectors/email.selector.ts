import {type RootState } from '../types/store.types';
import type { Email, SendRFPToVendorsResponse } from '../types/email.types';

export const emailSelectors = {
  // Get all emails
  selectAllEmails: (state: RootState): Email[] => state.email.emails,

  // Get current email
  selectCurrentEmail: (state: RootState): Email | null => state.email.currentEmail,

  // Get send result
  selectSendResult: (state: RootState): SendRFPToVendorsResponse | null => state.email.sendResult,

  // Get loading state
  selectEmailLoading: (state: RootState): boolean => state.email.loading,

  // Get error
  selectEmailError: (state: RootState): string | null => state.email.error,

  // Get success state
  selectEmailSuccess: (state: RootState): boolean => state.email.success,

  // Get emails count
  selectEmailCount: (state: RootState): number => state.email.emails.length,

  // Get emails by direction
  selectEmailsByDirection: (direction: 'inbound' | 'outbound') => (state: RootState): Email[] =>
    state.email.emails.filter((email) => email.direction === direction),

  // Get emails by status
  selectEmailsByStatus: (status: string) => (state: RootState): Email[] =>
    state.email.emails.filter((email) => email.status === status),

  // Get outbound emails (sent RFPs)
  selectOutboundEmails: (state: RootState): Email[] =>
    state.email.emails.filter((email) => email.direction === 'outbound'),

  // Get inbound emails (vendor responses)
  selectInboundEmails: (state: RootState): Email[] =>
    state.email.emails.filter((email) => email.direction === 'inbound'),

  // Get failed emails
  selectFailedEmails: (state: RootState): Email[] =>
    state.email.emails.filter((email) => email.status === 'failed'),
};