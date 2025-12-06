import { COMPARISON_ACTION_TYPES } from '../types/comparison.actionTypes';
import { type ComparisonResult } from '../types/comparison.types';

export const comparisonActions = {
  // Compare Proposals
  compareProposals: (rfpId: string) => ({
    type: COMPARISON_ACTION_TYPES.COMPARE_PROPOSALS_REQUEST,
    payload: { rfpId },
  }),
  compareProposalsSuccess: (data: ComparisonResult) => ({
    type: COMPARISON_ACTION_TYPES.COMPARE_PROPOSALS_SUCCESS,
    payload: data,
  }),
  compareProposalsFailure: (error: string) => ({
    type: COMPARISON_ACTION_TYPES.COMPARE_PROPOSALS_FAILURE,
    payload: error,
  }),

  // Get Comparison Results
  getComparisonResults: (rfpId: string) => ({
    type: COMPARISON_ACTION_TYPES.GET_COMPARISON_RESULTS_REQUEST,
    payload: { rfpId },
  }),
  getComparisonResultsSuccess: (data: ComparisonResult) => ({
    type: COMPARISON_ACTION_TYPES.GET_COMPARISON_RESULTS_SUCCESS,
    payload: data,
  }),
  getComparisonResultsFailure: (error: string) => ({
    type: COMPARISON_ACTION_TYPES.GET_COMPARISON_RESULTS_FAILURE,
    payload: error,
  }),

  // Select Vendor
  selectVendor: (proposalId: string) => ({
    type: COMPARISON_ACTION_TYPES.SELECT_VENDOR_REQUEST,
    payload: { proposalId },
  }),
  selectVendorSuccess: (data: any) => ({
    type: COMPARISON_ACTION_TYPES.SELECT_VENDOR_SUCCESS,
    payload: data,
  }),
  selectVendorFailure: (error: string) => ({
    type: COMPARISON_ACTION_TYPES.SELECT_VENDOR_FAILURE,
    payload: error,
  }),

  // Clear Errors
  clearErrors: () => ({
    type: COMPARISON_ACTION_TYPES.CLEAR_COMPARISON_ERRORS,
  }),
};
