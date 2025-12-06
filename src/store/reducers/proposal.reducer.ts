import { PROPOSAL_ACTION_TYPES } from '../types/proposal.actionTypes';
import {type ProposalState } from '../types/proposal.types';

const initialState: ProposalState = {
  proposals: [],
  currentProposal: null,
  loading: false,
  error: null,
  success: false,
};

type ProposalAction = {
  type: string;
  payload?: any;
};

const proposalReducer = (state = initialState, action: ProposalAction): ProposalState => {
  switch (action.type) {
    case PROPOSAL_ACTION_TYPES.GET_PROPOSALS_BY_RFP_REQUEST:
    case PROPOSAL_ACTION_TYPES.GET_PROPOSAL_BY_ID_REQUEST:
    case PROPOSAL_ACTION_TYPES.CREATE_PROPOSAL_REQUEST:
    case PROPOSAL_ACTION_TYPES.UPDATE_PROPOSAL_REQUEST:
    case PROPOSAL_ACTION_TYPES.DELETE_PROPOSAL_REQUEST:
    case PROPOSAL_ACTION_TYPES.PARSE_EMAIL_TO_PROPOSAL_REQUEST:
    case PROPOSAL_ACTION_TYPES.SIMULATE_VENDOR_RESPONSE_REQUEST:
      return { ...state, loading: true, error: null, success: false };

    case PROPOSAL_ACTION_TYPES.GET_PROPOSALS_BY_RFP_SUCCESS:
      return { ...state, loading: false, proposals: action.payload };

    case PROPOSAL_ACTION_TYPES.GET_PROPOSAL_BY_ID_SUCCESS:
      return { ...state, loading: false, currentProposal: action.payload };

    case PROPOSAL_ACTION_TYPES.CREATE_PROPOSAL_SUCCESS:
    case PROPOSAL_ACTION_TYPES.PARSE_EMAIL_TO_PROPOSAL_SUCCESS:
    case PROPOSAL_ACTION_TYPES.SIMULATE_VENDOR_RESPONSE_SUCCESS:
      return {
        ...state,
        loading: false,
        proposals: [action.payload, ...state.proposals],
        success: true,
      };

    case PROPOSAL_ACTION_TYPES.UPDATE_PROPOSAL_SUCCESS:
      return {
        ...state,
        loading: false,
        proposals: state.proposals.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
        currentProposal: action.payload,
        success: true,
      };

    case PROPOSAL_ACTION_TYPES.DELETE_PROPOSAL_SUCCESS:
      return {
        ...state,
        loading: false,
        proposals: state.proposals.filter((p) => p._id !== action.payload.id),
        success: true,
      };

    case PROPOSAL_ACTION_TYPES.GET_PROPOSALS_BY_RFP_FAILURE:
    case PROPOSAL_ACTION_TYPES.GET_PROPOSAL_BY_ID_FAILURE:
    case PROPOSAL_ACTION_TYPES.CREATE_PROPOSAL_FAILURE:
    case PROPOSAL_ACTION_TYPES.UPDATE_PROPOSAL_FAILURE:
    case PROPOSAL_ACTION_TYPES.DELETE_PROPOSAL_FAILURE:
    case PROPOSAL_ACTION_TYPES.PARSE_EMAIL_TO_PROPOSAL_FAILURE:
    case PROPOSAL_ACTION_TYPES.SIMULATE_VENDOR_RESPONSE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case PROPOSAL_ACTION_TYPES.CLEAR_PROPOSAL_ERRORS:
      return { ...state, error: null, success: false };

    default:
      return state;
  }
};

export default proposalReducer;