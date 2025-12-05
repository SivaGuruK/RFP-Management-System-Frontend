import { RFP_ACTION_TYPES } from '../types/rfp.actionTypes';
import { type RFPState } from '../types/rfp.types';

const initialState: RFPState = {
  rfps: [],
  currentRFP: null,
  generatedRFP: null,
  dashboardStats: null,
  loading: false,
  error: null,
  success: false,
};

type RFPAction = {
  type: string;
  payload?: any;
};

const rfpReducer = (state = initialState, action: RFPAction): RFPState => {
  switch (action.type) {
    // Generate RFP
    case RFP_ACTION_TYPES.GENERATE_RFP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        generatedRFP: null,
      };

    case RFP_ACTION_TYPES.GENERATE_RFP_SUCCESS:
      return {
        ...state,
        loading: false,
        generatedRFP: action.payload,
        success: true,
      };

    case RFP_ACTION_TYPES.GENERATE_RFP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        generatedRFP: null,
      };

    // Create RFP
    case RFP_ACTION_TYPES.CREATE_RFP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case RFP_ACTION_TYPES.CREATE_RFP_SUCCESS:
      return {
        ...state,
        loading: false,
        rfps: [action.payload, ...state.rfps],
        success: true,
      };

    case RFP_ACTION_TYPES.CREATE_RFP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Get All RFPs
    case RFP_ACTION_TYPES.GET_ALL_RFPS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case RFP_ACTION_TYPES.GET_ALL_RFPS_SUCCESS:
      return {
        ...state,
        loading: false,
        rfps: action.payload,
      };

    case RFP_ACTION_TYPES.GET_ALL_RFPS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Get RFP by ID
    case RFP_ACTION_TYPES.GET_RFP_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        currentRFP: null,
      };

    case RFP_ACTION_TYPES.GET_RFP_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        currentRFP: action.payload,
      };

    case RFP_ACTION_TYPES.GET_RFP_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Update RFP
    case RFP_ACTION_TYPES.UPDATE_RFP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case RFP_ACTION_TYPES.UPDATE_RFP_SUCCESS:
      return {
        ...state,
        loading: false,
        rfps: state.rfps.map((rfp) =>
          rfp._id === action.payload._id ? action.payload : rfp
        ),
        currentRFP: action.payload,
        success: true,
      };

    case RFP_ACTION_TYPES.UPDATE_RFP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Delete RFP
    case RFP_ACTION_TYPES.DELETE_RFP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case RFP_ACTION_TYPES.DELETE_RFP_SUCCESS:
      return {
        ...state,
        loading: false,
        rfps: state.rfps.filter((rfp) => rfp._id !== action.payload.id),
        success: true,
      };

    case RFP_ACTION_TYPES.DELETE_RFP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Dashboard Stats
    case RFP_ACTION_TYPES.GET_DASHBOARD_STATS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case RFP_ACTION_TYPES.GET_DASHBOARD_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        dashboardStats: action.payload,
      };

    case RFP_ACTION_TYPES.GET_DASHBOARD_STATS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Clear Errors
    case RFP_ACTION_TYPES.CLEAR_RFP_ERRORS:
      return {
        ...state,
        error: null,
        success: false,
      };

    default:
      return state;
  }
};

export default rfpReducer;