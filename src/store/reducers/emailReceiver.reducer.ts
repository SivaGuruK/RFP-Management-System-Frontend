import { EMAIL_RECEIVER_ACTION_TYPES } from '../types/emailReceiver.actionTypes';
import { type EmailReceiverState } from '../types/emailReceiver.types';

const initialState: EmailReceiverState = {
  status: null,
  loading: false,
  error: null,
  success: false,
};

type EmailReceiverAction = {
  type: string;
  payload?: any;
};

const emailReceiverReducer = (
  state = initialState,
  action: EmailReceiverAction
): EmailReceiverState => {
  switch (action.type) {
    case EMAIL_RECEIVER_ACTION_TYPES.START_POLLING_REQUEST:
    case EMAIL_RECEIVER_ACTION_TYPES.STOP_POLLING_REQUEST:
    case EMAIL_RECEIVER_ACTION_TYPES.CHECK_NOW_REQUEST:
    case EMAIL_RECEIVER_ACTION_TYPES.GET_STATUS_REQUEST:
      return { ...state, loading: true, error: null, success: false };

    case EMAIL_RECEIVER_ACTION_TYPES.START_POLLING_SUCCESS:
    case EMAIL_RECEIVER_ACTION_TYPES.STOP_POLLING_SUCCESS:
    case EMAIL_RECEIVER_ACTION_TYPES.CHECK_NOW_SUCCESS:
      return { ...state, loading: false, success: true };

    case EMAIL_RECEIVER_ACTION_TYPES.GET_STATUS_SUCCESS:
      return { ...state, loading: false, status: action.payload };

    case EMAIL_RECEIVER_ACTION_TYPES.START_POLLING_FAILURE:
    case EMAIL_RECEIVER_ACTION_TYPES.STOP_POLLING_FAILURE:
    case EMAIL_RECEIVER_ACTION_TYPES.CHECK_NOW_FAILURE:
    case EMAIL_RECEIVER_ACTION_TYPES.GET_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case EMAIL_RECEIVER_ACTION_TYPES.CLEAR_EMAIL_RECEIVER_ERRORS:
      return { ...state, error: null, success: false };

    default:
      return state;
  }
};

export default emailReceiverReducer;
