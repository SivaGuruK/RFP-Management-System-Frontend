import { VENDOR_ACTION_TYPES } from '../types/vendor.actionTypes';
import { type Vendor,type VendorStats } from '../types/vendor.types';

export const vendorActions = {
  // Create Vendor
  createVendor: (vendorData: Partial<Vendor>) => ({
    type: VENDOR_ACTION_TYPES.CREATE_VENDOR_REQUEST,
    payload: vendorData,
  }),

  createVendorSuccess: (data: Vendor) => ({
    type: VENDOR_ACTION_TYPES.CREATE_VENDOR_SUCCESS,
    payload: data,
  }),

  createVendorFailure: (error: string) => ({
    type: VENDOR_ACTION_TYPES.CREATE_VENDOR_FAILURE,
    payload: error,
  }),

  // Get All Vendors
  getAllVendors: (search?: string) => ({
    type: VENDOR_ACTION_TYPES.GET_ALL_VENDORS_REQUEST,
    payload: { search },
  }),

  getAllVendorsSuccess: (data: Vendor[]) => ({
    type: VENDOR_ACTION_TYPES.GET_ALL_VENDORS_SUCCESS,
    payload: data,
  }),

  getAllVendorsFailure: (error: string) => ({
    type: VENDOR_ACTION_TYPES.GET_ALL_VENDORS_FAILURE,
    payload: error,
  }),

  // Get Vendor by ID
  getVendorById: (id: string) => ({
    type: VENDOR_ACTION_TYPES.GET_VENDOR_BY_ID_REQUEST,
    payload: { id },
  }),

  getVendorByIdSuccess: (data: Vendor) => ({
    type: VENDOR_ACTION_TYPES.GET_VENDOR_BY_ID_SUCCESS,
    payload: data,
  }),

  getVendorByIdFailure: (error: string) => ({
    type: VENDOR_ACTION_TYPES.GET_VENDOR_BY_ID_FAILURE,
    payload: error,
  }),

  // Update Vendor
  updateVendor: (id: string, vendorData: Partial<Vendor>) => ({
    type: VENDOR_ACTION_TYPES.UPDATE_VENDOR_REQUEST,
    payload: { id, vendorData },
  }),

  updateVendorSuccess: (data: Vendor) => ({
    type: VENDOR_ACTION_TYPES.UPDATE_VENDOR_SUCCESS,
    payload: data,
  }),

  updateVendorFailure: (error: string) => ({
    type: VENDOR_ACTION_TYPES.UPDATE_VENDOR_FAILURE,
    payload: error,
  }),

  // Delete Vendor
  deleteVendor: (id: string) => ({
    type: VENDOR_ACTION_TYPES.DELETE_VENDOR_REQUEST,
    payload: { id },
  }),

  deleteVendorSuccess: (id: string) => ({
    type: VENDOR_ACTION_TYPES.DELETE_VENDOR_SUCCESS,
    payload: { id },
  }),

  deleteVendorFailure: (error: string) => ({
    type: VENDOR_ACTION_TYPES.DELETE_VENDOR_FAILURE,
    payload: error,
  }),

  // Update Vendor Stats
  updateVendorStats: (id: string, stats: VendorStats) => ({
    type: VENDOR_ACTION_TYPES.UPDATE_VENDOR_STATS_REQUEST,
    payload: { id, stats },
  }),

  updateVendorStatsSuccess: (data: Vendor) => ({
    type: VENDOR_ACTION_TYPES.UPDATE_VENDOR_STATS_SUCCESS,
    payload: data,
  }),

  updateVendorStatsFailure: (error: string) => ({
    type: VENDOR_ACTION_TYPES.UPDATE_VENDOR_STATS_FAILURE,
    payload: error,
  }),

  // Clear Errors
  clearErrors: () => ({
    type: VENDOR_ACTION_TYPES.CLEAR_VENDOR_ERRORS,
  }),
};
