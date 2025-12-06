import { PROPOSAL_ACTION_TYPES } from '../types/proposal.actionTypes';
import {type Proposal } from '../types/proposal.types';

export const proposalActions = {
  // Get Proposals by RFP
  getProposalsByRFP: (rfpId: string) => ({
    type: PROPOSAL_ACTION_TYPES.GET_PROPOSALS_BY_RFP_REQUEST,
    payload: { rfpId },
  }),
  getProposalsByRFPSuccess: (data: Proposal[]) => ({
    type: PROPOSAL_ACTION_TYPES.GET_PROPOSALS_BY_RFP_SUCCESS,
    payload: data,
  }),
  getProposalsByRFPFailure: (error: string) => ({
    type: PROPOSAL_ACTION_TYPES.GET_PROPOSALS_BY_RFP_FAILURE,
    payload: error,
  }),

  // Get Proposal by ID
  getProposalById: (id: string) => ({
    type: PROPOSAL_ACTION_TYPES.GET_PROPOSAL_BY_ID_REQUEST,
    payload: { id },
  }),
  getProposalByIdSuccess: (data: Proposal) => ({
    type: PROPOSAL_ACTION_TYPES.GET_PROPOSAL_BY_ID_SUCCESS,
    payload: data,
  }),
  getProposalByIdFailure: (error: string) => ({
    type: PROPOSAL_ACTION_TYPES.GET_PROPOSAL_BY_ID_FAILURE,
    payload: error,
  }),

  // Create Proposal
  createProposal: (proposalData: Partial<Proposal>) => ({
    type: PROPOSAL_ACTION_TYPES.CREATE_PROPOSAL_REQUEST,
    payload: proposalData,
  }),
  createProposalSuccess: (data: Proposal) => ({
    type: PROPOSAL_ACTION_TYPES.CREATE_PROPOSAL_SUCCESS,
    payload: data,
  }),
  createProposalFailure: (error: string) => ({
    type: PROPOSAL_ACTION_TYPES.CREATE_PROPOSAL_FAILURE,
    payload: error,
  }),

  // Update Proposal
  updateProposal: (id: string, proposalData: Partial<Proposal>) => ({
    type: PROPOSAL_ACTION_TYPES.UPDATE_PROPOSAL_REQUEST,
    payload: { id, proposalData },
  }),
  updateProposalSuccess: (data: Proposal) => ({
    type: PROPOSAL_ACTION_TYPES.UPDATE_PROPOSAL_SUCCESS,
    payload: data,
  }),
  updateProposalFailure: (error: string) => ({
    type: PROPOSAL_ACTION_TYPES.UPDATE_PROPOSAL_FAILURE,
    payload: error,
  }),

  // Delete Proposal
  deleteProposal: (id: string) => ({
    type: PROPOSAL_ACTION_TYPES.DELETE_PROPOSAL_REQUEST,
    payload: { id },
  }),
  deleteProposalSuccess: (id: string) => ({
    type: PROPOSAL_ACTION_TYPES.DELETE_PROPOSAL_SUCCESS,
    payload: { id },
  }),
  deleteProposalFailure: (error: string) => ({
    type: PROPOSAL_ACTION_TYPES.DELETE_PROPOSAL_FAILURE,
    payload: error,
  }),

  // Parse Email to Proposal
  parseEmailToProposal: (emailId: string) => ({
    type: PROPOSAL_ACTION_TYPES.PARSE_EMAIL_TO_PROPOSAL_REQUEST,
    payload: { emailId },
  }),
  parseEmailToProposalSuccess: (data: Proposal) => ({
    type: PROPOSAL_ACTION_TYPES.PARSE_EMAIL_TO_PROPOSAL_SUCCESS,
    payload: data,
  }),
  parseEmailToProposalFailure: (error: string) => ({
    type: PROPOSAL_ACTION_TYPES.PARSE_EMAIL_TO_PROPOSAL_FAILURE,
    payload: error,
  }),

  // Simulate Vendor Response
  simulateVendorResponse: (rfpId: string, vendorId: string, emailBody: string) => ({
    type: PROPOSAL_ACTION_TYPES.SIMULATE_VENDOR_RESPONSE_REQUEST,
    payload: { rfpId, vendorId, emailBody },
  }),
  simulateVendorResponseSuccess: (data: Proposal) => ({
    type: PROPOSAL_ACTION_TYPES.SIMULATE_VENDOR_RESPONSE_SUCCESS,
    payload: data,
  }),
  simulateVendorResponseFailure: (error: string) => ({
    type: PROPOSAL_ACTION_TYPES.SIMULATE_VENDOR_RESPONSE_FAILURE,
    payload: error,
  }),

  // Clear Errors
  clearErrors: () => ({
    type: PROPOSAL_ACTION_TYPES.CLEAR_PROPOSAL_ERRORS,
  }),
};

