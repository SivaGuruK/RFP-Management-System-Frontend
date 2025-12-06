import { COMPARISON_ACTION_TYPES } from '../types/comparison.actionTypes';
import { type ComparisonState } from '../types/comparison.types';

const initialState: ComparisonState = {
  comparisonResult: null,
  loading: false,
  error: null,
  success: false,
};

type ComparisonAction = {
  type: string;
  payload?: any;
};

const comparisonReducer = (state = initialState, action: ComparisonAction): ComparisonState => {
  switch (action.type) {
    case COMPARISON_ACTION_TYPES.COMPARE_PROPOSALS_REQUEST:
    case COMPARISON_ACTION_TYPES.GET_COMPARISON_RESULTS_REQUEST:
    case COMPARISON_ACTION_TYPES.SELECT_VENDOR_REQUEST:
      return { ...state, loading: true, error: null, success: false };

    case COMPARISON_ACTION_TYPES.COMPARE_PROPOSALS_SUCCESS:
    case COMPARISON_ACTION_TYPES.GET_COMPARISON_RESULTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comparisonResult: action.payload,
        success: true,
      };

    case COMPARISON_ACTION_TYPES.SELECT_VENDOR_SUCCESS:
      return { ...state, loading: false, success: true };

    case COMPARISON_ACTION_TYPES.COMPARE_PROPOSALS_FAILURE:
    case COMPARISON_ACTION_TYPES.GET_COMPARISON_RESULTS_FAILURE:
    case COMPARISON_ACTION_TYPES.SELECT_VENDOR_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case COMPARISON_ACTION_TYPES.CLEAR_COMPARISON_ERRORS:
      return { ...state, error: null, success: false };

    default:
      return state;
  }
};

export default comparisonReducer;
