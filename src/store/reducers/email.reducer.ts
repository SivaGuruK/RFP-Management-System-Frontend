import { EMAIL_ACTION_TYPES } from '../types/email.actionTypes';
import {type EmailState } from '../types/email.types';

const initialState: EmailState = {
  emails: [],
  currentEmail: null,
  sendResult: null,
  loading: false,
  error: null,
  success: false,
};

type EmailAction = {
  type: string;
  payload?: any;
};

const emailReducer = (state = initialState, action: EmailAction): EmailState => {
  switch (action.type) {
    // Send RFP to Vendors
    case EMAIL_ACTION_TYPES.SEND_RFP_TO_VENDORS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
        sendResult: null,
      };

    case EMAIL_ACTION_TYPES.SEND_RFP_TO_VENDORS_SUCCESS:
      return {
        ...state,
        loading: false,
        sendResult: action.payload,
        success: true,
      };

    case EMAIL_ACTION_TYPES.SEND_RFP_TO_VENDORS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        sendResult: null,
      };

    // Get All Emails
    case EMAIL_ACTION_TYPES.GET_ALL_EMAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case EMAIL_ACTION_TYPES.GET_ALL_EMAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        emails: action.payload,
      };

    case EMAIL_ACTION_TYPES.GET_ALL_EMAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Get Emails by RFP
    case EMAIL_ACTION_TYPES.GET_EMAILS_BY_RFP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case EMAIL_ACTION_TYPES.GET_EMAILS_BY_RFP_SUCCESS:
      return {
        ...state,
        loading: false,
        emails: action.payload,
      };

    case EMAIL_ACTION_TYPES.GET_EMAILS_BY_RFP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Get Email by ID
    case EMAIL_ACTION_TYPES.GET_EMAIL_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        currentEmail: null,
      };

    case EMAIL_ACTION_TYPES.GET_EMAIL_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        currentEmail: action.payload,
      };

    case EMAIL_ACTION_TYPES.GET_EMAIL_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Clear Errors
    case EMAIL_ACTION_TYPES.CLEAR_EMAIL_ERRORS:
      return {
        ...state,
        error: null,
        success: false,
      };

    default:
      return state;
  }
};

export default emailReducer;
