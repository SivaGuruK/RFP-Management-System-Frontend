import { call, put, takeLatest } from 'redux-saga/effects';
import { type AxiosResponse } from 'axios';
import { VENDOR_ACTION_TYPES } from '../types/vendor.actionTypes';
import { vendorActions } from '../actions/vendor.actions';
import { vendorAPI } from '../../services/api';
import { type Vendor } from '../types/vendor.types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Create Vendor Saga
function* createVendorSaga(action: ReturnType<typeof vendorActions.createVendor>) {
  try {
    const response: AxiosResponse<ApiResponse<Vendor>> = yield call(
      vendorAPI.createVendor,
      action.payload
    );
    yield put(vendorActions.createVendorSuccess(response.data.data));
  } catch (error) {
    yield put(vendorActions.createVendorFailure(error as string));
  }
}

// Get All Vendors Saga
function* getAllVendorsSaga(action: ReturnType<typeof vendorActions.getAllVendors>) {
  try {
    const response: AxiosResponse<ApiResponse<Vendor[]>> = yield call(
      vendorAPI.getAllVendors,
      action.payload.search
    );
    yield put(vendorActions.getAllVendorsSuccess(response.data.data));
  } catch (error) {
    yield put(vendorActions.getAllVendorsFailure(error as string));
  }
}

// Get Vendor by ID Saga
function* getVendorByIdSaga(action: ReturnType<typeof vendorActions.getVendorById>) {
  try {
    const response: AxiosResponse<ApiResponse<Vendor>> = yield call(
      vendorAPI.getVendorById,
      action.payload.id
    );
    yield put(vendorActions.getVendorByIdSuccess(response.data.data));
  } catch (error) {
    yield put(vendorActions.getVendorByIdFailure(error as string));
  }
}

// Update Vendor Saga
function* updateVendorSaga(action: ReturnType<typeof vendorActions.updateVendor>) {
  try {
    const { id, vendorData } = action.payload;
    const response: AxiosResponse<ApiResponse<Vendor>> = yield call(
      vendorAPI.updateVendor,
      id,
      vendorData
    );
    yield put(vendorActions.updateVendorSuccess(response.data.data));
  } catch (error) {
    yield put(vendorActions.updateVendorFailure(error as string));
  }
}

// Delete Vendor Saga
function* deleteVendorSaga(action: ReturnType<typeof vendorActions.deleteVendor>) {
  try {
    yield call(vendorAPI.deleteVendor, action.payload.id);
    yield put(vendorActions.deleteVendorSuccess(action.payload.id));
  } catch (error) {
    yield put(vendorActions.deleteVendorFailure(error as string));
  }
}

// Watcher Saga
export function* watchVendor() {
  yield takeLatest(VENDOR_ACTION_TYPES.CREATE_VENDOR_REQUEST, createVendorSaga);
  yield takeLatest(VENDOR_ACTION_TYPES.GET_ALL_VENDORS_REQUEST, getAllVendorsSaga);
  yield takeLatest(VENDOR_ACTION_TYPES.GET_VENDOR_BY_ID_REQUEST, getVendorByIdSaga);
  yield takeLatest(VENDOR_ACTION_TYPES.UPDATE_VENDOR_REQUEST, updateVendorSaga);
  yield takeLatest(VENDOR_ACTION_TYPES.DELETE_VENDOR_REQUEST, deleteVendorSaga);
}
