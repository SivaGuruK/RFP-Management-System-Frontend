// ============================================
// PART 9: EMAIL ACTIONS
// ============================================
// src/store/actions/email.actions.ts - CREATE THIS FILE

import { EMAIL_ACTION_TYPES } from '../types/email.actionTypes';
import type{ Email, SendRFPToVendorsResponse } from '../types/email.types';

export const emailActions = {
  // Send RFP to Vendors
  sendRFPToVendors: (rfpId: string, vendorIds: string[]) => ({
    type: EMAIL_ACTION_TYPES.SEND_RFP_TO_VENDORS_REQUEST,
    payload: { rfpId, vendorIds },
  }),

  sendRFPToVendorsSuccess: (data: SendRFPToVendorsResponse) => ({
    type: EMAIL_ACTION_TYPES.SEND_RFP_TO_VENDORS_SUCCESS,
    payload: data,
  }),

  sendRFPToVendorsFailure: (error: string) => ({
    type: EMAIL_ACTION_TYPES.SEND_RFP_TO_VENDORS_FAILURE,
    payload: error,
  }),

  // Get All Emails
  getAllEmails: (direction?: string, status?: string) => ({
    type: EMAIL_ACTION_TYPES.GET_ALL_EMAILS_REQUEST,
    payload: { direction, status },
  }),

  getAllEmailsSuccess: (data: Email[]) => ({
    type: EMAIL_ACTION_TYPES.GET_ALL_EMAILS_SUCCESS,
    payload: data,
  }),

  getAllEmailsFailure: (error: string) => ({
    type: EMAIL_ACTION_TYPES.GET_ALL_EMAILS_FAILURE,
    payload: error,
  }),

  // Get Emails by RFP
  getEmailsByRFP: (rfpId: string) => ({
    type: EMAIL_ACTION_TYPES.GET_EMAILS_BY_RFP_REQUEST,
    payload: { rfpId },
  }),

  getEmailsByRFPSuccess: (data: Email[]) => ({
    type: EMAIL_ACTION_TYPES.GET_EMAILS_BY_RFP_SUCCESS,
    payload: data,
  }),

  getEmailsByRFPFailure: (error: string) => ({
    type: EMAIL_ACTION_TYPES.GET_EMAILS_BY_RFP_FAILURE,
    payload: error,
  }),

  // Get Email by ID
  getEmailById: (id: string) => ({
    type: EMAIL_ACTION_TYPES.GET_EMAIL_BY_ID_REQUEST,
    payload: { id },
  }),

  getEmailByIdSuccess: (data: Email) => ({
    type: EMAIL_ACTION_TYPES.GET_EMAIL_BY_ID_SUCCESS,
    payload: data,
  }),

  getEmailByIdFailure: (error: string) => ({
    type: EMAIL_ACTION_TYPES.GET_EMAIL_BY_ID_FAILURE,
    payload: error,
  }),

  // Clear Errors
  clearErrors: () => ({
    type: EMAIL_ACTION_TYPES.CLEAR_EMAIL_ERRORS,
  }),
};
