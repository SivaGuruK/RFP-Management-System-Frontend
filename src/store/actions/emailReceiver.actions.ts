import { EMAIL_RECEIVER_ACTION_TYPES } from '../types/emailReceiver.actionTypes';
import { type EmailReceiverStatus } from '../types/emailReceiver.types';

export const emailReceiverActions = {
  // Start Polling
  startPolling: (intervalSeconds?: number) => ({
    type: EMAIL_RECEIVER_ACTION_TYPES.START_POLLING_REQUEST,
    payload: { intervalSeconds },
  }),
  startPollingSuccess: (data: any) => ({
    type: EMAIL_RECEIVER_ACTION_TYPES.START_POLLING_SUCCESS,
    payload: data,
  }),
  startPollingFailure: (error: string) => ({
    type: EMAIL_RECEIVER_ACTION_TYPES.START_POLLING_FAILURE,
    payload: error,
  }),

  // Stop Polling
  stopPolling: () => ({
    type: EMAIL_RECEIVER_ACTION_TYPES.STOP_POLLING_REQUEST,
  }),
  stopPollingSuccess: (data: any) => ({
    type: EMAIL_RECEIVER_ACTION_TYPES.STOP_POLLING_SUCCESS,
    payload: data,
  }),
  stopPollingFailure: (error: string) => ({
    type: EMAIL_RECEIVER_ACTION_TYPES.STOP_POLLING_FAILURE,
    payload: error,
  }),

  // Check Now
  checkNow: () => ({
    type: EMAIL_RECEIVER_ACTION_TYPES.CHECK_NOW_REQUEST,
  }),
  checkNowSuccess: (data: any) => ({
    type: EMAIL_RECEIVER_ACTION_TYPES.CHECK_NOW_SUCCESS,
    payload: data,
  }),
  checkNowFailure: (error: string) => ({
    type: EMAIL_RECEIVER_ACTION_TYPES.CHECK_NOW_FAILURE,
    payload: error,
  }),

  // Get Status
  getStatus: () => ({
    type: EMAIL_RECEIVER_ACTION_TYPES.GET_STATUS_REQUEST,
  }),
  getStatusSuccess: (data: EmailReceiverStatus) => ({
    type: EMAIL_RECEIVER_ACTION_TYPES.GET_STATUS_SUCCESS,
    payload: data,
  }),
  getStatusFailure: (error: string) => ({
    type: EMAIL_RECEIVER_ACTION_TYPES.GET_STATUS_FAILURE,
    payload: error,
  }),

  // Clear Errors
  clearErrors: () => ({
    type: EMAIL_RECEIVER_ACTION_TYPES.CLEAR_EMAIL_RECEIVER_ERRORS,
  }),
};
