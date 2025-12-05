import { RFP_ACTION_TYPES } from '../types/rfp.actionTypes';
import { type RFP,type GeneratedRFP,type DashboardStats } from '../types/rfp.types';

export const rfpActions = {
  // Generate RFP
  generateRFP: (description: string) => ({
    type: RFP_ACTION_TYPES.GENERATE_RFP_REQUEST,
    payload: { description },
  }),

  generateRFPSuccess: (data: GeneratedRFP) => ({
    type: RFP_ACTION_TYPES.GENERATE_RFP_SUCCESS,
    payload: data,
  }),

  generateRFPFailure: (error: string) => ({
    type: RFP_ACTION_TYPES.GENERATE_RFP_FAILURE,
    payload: error,
  }),

  // Create RFP
  createRFP: (rfpData: Partial<RFP>) => ({
    type: RFP_ACTION_TYPES.CREATE_RFP_REQUEST,
    payload: rfpData,
  }),

  createRFPSuccess: (data: RFP) => ({
    type: RFP_ACTION_TYPES.CREATE_RFP_SUCCESS,
    payload: data,
  }),

  createRFPFailure: (error: string) => ({
    type: RFP_ACTION_TYPES.CREATE_RFP_FAILURE,
    payload: error,
  }),

  // Get All RFPs
  getAllRFPs: (status?: string) => ({
    type: RFP_ACTION_TYPES.GET_ALL_RFPS_REQUEST,
    payload: { status },
  }),

  getAllRFPsSuccess: (data: RFP[]) => ({
    type: RFP_ACTION_TYPES.GET_ALL_RFPS_SUCCESS,
    payload: data,
  }),

  getAllRFPsFailure: (error: string) => ({
    type: RFP_ACTION_TYPES.GET_ALL_RFPS_FAILURE,
    payload: error,
  }),

  // Get RFP by ID
  getRFPById: (id: string) => ({
    type: RFP_ACTION_TYPES.GET_RFP_BY_ID_REQUEST,
    payload: { id },
  }),

  getRFPByIdSuccess: (data: RFP) => ({
    type: RFP_ACTION_TYPES.GET_RFP_BY_ID_SUCCESS,
    payload: data,
  }),

  getRFPByIdFailure: (error: string) => ({
    type: RFP_ACTION_TYPES.GET_RFP_BY_ID_FAILURE,
    payload: error,
  }),

  // Update RFP
  updateRFP: (id: string, rfpData: Partial<RFP>) => ({
    type: RFP_ACTION_TYPES.UPDATE_RFP_REQUEST,
    payload: { id, rfpData },
  }),

  updateRFPSuccess: (data: RFP) => ({
    type: RFP_ACTION_TYPES.UPDATE_RFP_SUCCESS,
    payload: data,
  }),

  updateRFPFailure: (error: string) => ({
    type: RFP_ACTION_TYPES.UPDATE_RFP_FAILURE,
    payload: error,
  }),

  // Delete RFP
  deleteRFP: (id: string) => ({
    type: RFP_ACTION_TYPES.DELETE_RFP_REQUEST,
    payload: { id },
  }),

  deleteRFPSuccess: (id: string) => ({
    type: RFP_ACTION_TYPES.DELETE_RFP_SUCCESS,
    payload: { id },
  }),

  deleteRFPFailure: (error: string) => ({
    type: RFP_ACTION_TYPES.DELETE_RFP_FAILURE,
    payload: error,
  }),
  // Dashboard Stats
  getDashboardStats: () => ({
    type: RFP_ACTION_TYPES.GET_DASHBOARD_STATS_REQUEST,
  }),

  getDashboardStatsSuccess: (data: DashboardStats) => ({
    type: RFP_ACTION_TYPES.GET_DASHBOARD_STATS_SUCCESS,
    payload: data,
  }),

  getDashboardStatsFailure: (error: string) => ({
    type: RFP_ACTION_TYPES.GET_DASHBOARD_STATS_FAILURE,
    payload: error,
  }),

  // Clear Errors
  clearErrors: () => ({
    type: RFP_ACTION_TYPES.CLEAR_RFP_ERRORS,
  }),
};