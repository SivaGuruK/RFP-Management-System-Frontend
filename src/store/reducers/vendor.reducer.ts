import { VENDOR_ACTION_TYPES } from '../types/vendor.actionTypes';
import { type VendorState } from '../types/vendor.types';

const initialState: VendorState = {
  vendors: [],
  currentVendor: null,
  loading: false,
  error: null,
  success: false,
};

type VendorAction = {
  type: string;
  payload?: any;
};

const vendorReducer = (state = initialState, action: VendorAction): VendorState => {
  switch (action.type) {
    // Create Vendor
    case VENDOR_ACTION_TYPES.CREATE_VENDOR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case VENDOR_ACTION_TYPES.CREATE_VENDOR_SUCCESS:
      return {
        ...state,
        loading: false,
        vendors: [action.payload, ...state.vendors],
        success: true,
      };

    case VENDOR_ACTION_TYPES.CREATE_VENDOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Get All Vendors
    case VENDOR_ACTION_TYPES.GET_ALL_VENDORS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case VENDOR_ACTION_TYPES.GET_ALL_VENDORS_SUCCESS:
      return {
        ...state,
        loading: false,
        vendors: action.payload,
      };

    case VENDOR_ACTION_TYPES.GET_ALL_VENDORS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Get Vendor by ID
    case VENDOR_ACTION_TYPES.GET_VENDOR_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        currentVendor: null,
      };

    case VENDOR_ACTION_TYPES.GET_VENDOR_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        currentVendor: action.payload,
      };

    case VENDOR_ACTION_TYPES.GET_VENDOR_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Update Vendor
    case VENDOR_ACTION_TYPES.UPDATE_VENDOR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case VENDOR_ACTION_TYPES.UPDATE_VENDOR_SUCCESS:
      return {
        ...state,
        loading: false,
        vendors: state.vendors.map((vendor) =>
          vendor._id === action.payload._id ? action.payload : vendor
        ),
        currentVendor: action.payload,
        success: true,
      };

    case VENDOR_ACTION_TYPES.UPDATE_VENDOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Delete Vendor
    case VENDOR_ACTION_TYPES.DELETE_VENDOR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case VENDOR_ACTION_TYPES.DELETE_VENDOR_SUCCESS:
      return {
        ...state,
        loading: false,
        vendors: state.vendors.filter((vendor) => vendor._id !== action.payload.id),
        success: true,
      };

    case VENDOR_ACTION_TYPES.DELETE_VENDOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Update Vendor Stats
    case VENDOR_ACTION_TYPES.UPDATE_VENDOR_STATS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case VENDOR_ACTION_TYPES.UPDATE_VENDOR_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        vendors: state.vendors.map((vendor) =>
          vendor._id === action.payload._id ? action.payload : vendor
        ),
        currentVendor: action.payload,
      };

    case VENDOR_ACTION_TYPES.UPDATE_VENDOR_STATS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Clear Errors
    case VENDOR_ACTION_TYPES.CLEAR_VENDOR_ERRORS:
      return {
        ...state,
        error: null,
        success: false,
      };

    default:
      return state;
  }
};

export default vendorReducer;
