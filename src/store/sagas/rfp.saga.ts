import { call, put, takeLatest } from 'redux-saga/effects';
import { type AxiosResponse } from 'axios';
import { RFP_ACTION_TYPES } from '../types/rfp.actionTypes';
import { rfpActions } from '../actions/rfp.actions';
import { rfpAPI } from '../../services/api';
import type { RFP, GeneratedRFP, DashboardStats } from '../types/rfp.types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Generate RFP Saga
function* generateRFPSaga(action: ReturnType<typeof rfpActions.generateRFP>) {
  try {
    const response: AxiosResponse<ApiResponse<GeneratedRFP>> = yield call(
      rfpAPI.generateRFP,
      action.payload.description
    );
    yield put(rfpActions.generateRFPSuccess(response.data.data));
  } catch (error) {
    yield put(rfpActions.generateRFPFailure(error as string));
  }
}

// Create RFP Saga
function* createRFPSaga(action: ReturnType<typeof rfpActions.createRFP>) {
  try {
    const response: AxiosResponse<ApiResponse<RFP>> = yield call(
      rfpAPI.createRFP,
      action.payload
    );
    yield put(rfpActions.createRFPSuccess(response.data.data));
  } catch (error) {
    yield put(rfpActions.createRFPFailure(error as string));
  }
}

// Get All RFPs Saga
function* getAllRFPsSaga(action: ReturnType<typeof rfpActions.getAllRFPs>) {
  try {
    const response: AxiosResponse<ApiResponse<RFP[]>> = yield call(
      rfpAPI.getAllRFPs,
      action.payload.status
    );
    yield put(rfpActions.getAllRFPsSuccess(response.data.data));
  } catch (error) {
    yield put(rfpActions.getAllRFPsFailure(error as string));
  }
}

// Get RFP by ID Saga
function* getRFPByIdSaga(action: ReturnType<typeof rfpActions.getRFPById>) {
  try {
    const response: AxiosResponse<ApiResponse<RFP>> = yield call(
      rfpAPI.getRFPById,
      action.payload.id
    );
    yield put(rfpActions.getRFPByIdSuccess(response.data.data));
  } catch (error) {
    yield put(rfpActions.getRFPByIdFailure(error as string));
  }
}

// Update RFP Saga
function* updateRFPSaga(action: ReturnType<typeof rfpActions.updateRFP>) {
  try {
    const { id, rfpData } = action.payload;
    const response: AxiosResponse<ApiResponse<RFP>> = yield call(
      rfpAPI.updateRFP,
      id,
      rfpData
    );
    yield put(rfpActions.updateRFPSuccess(response.data.data));
  } catch (error) {
    yield put(rfpActions.updateRFPFailure(error as string));
  }
}

// Delete RFP Saga
function* deleteRFPSaga(action: ReturnType<typeof rfpActions.deleteRFP>) {
  try {
    yield call(rfpAPI.deleteRFP, action.payload.id);
    yield put(rfpActions.deleteRFPSuccess(action.payload.id));
  } catch (error) {
    yield put(rfpActions.deleteRFPFailure(error as string));
  }
}

// Get Dashboard Stats Saga
function* getDashboardStatsSaga() {
  try {
    const response: AxiosResponse<ApiResponse<DashboardStats>> = yield call(
      rfpAPI.getDashboardStats
    );
    yield put(rfpActions.getDashboardStatsSuccess(response.data.data));
  } catch (error) {
    yield put(rfpActions.getDashboardStatsFailure(error as string));
  }
}

// Watcher Saga
export function* watchRFP() {
  yield takeLatest(RFP_ACTION_TYPES.GENERATE_RFP_REQUEST, generateRFPSaga);
  yield takeLatest(RFP_ACTION_TYPES.CREATE_RFP_REQUEST, createRFPSaga);
  yield takeLatest(RFP_ACTION_TYPES.GET_ALL_RFPS_REQUEST, getAllRFPsSaga);
  yield takeLatest(RFP_ACTION_TYPES.GET_RFP_BY_ID_REQUEST, getRFPByIdSaga);
  yield takeLatest(RFP_ACTION_TYPES.UPDATE_RFP_REQUEST, updateRFPSaga);
  yield takeLatest(RFP_ACTION_TYPES.DELETE_RFP_REQUEST, deleteRFPSaga);
  yield takeLatest(RFP_ACTION_TYPES.GET_DASHBOARD_STATS_REQUEST, getDashboardStatsSaga);
}
