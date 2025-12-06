import { call, put, takeLatest } from 'redux-saga/effects';
import {type AxiosResponse } from 'axios';
import { EMAIL_ACTION_TYPES } from '../types/email.actionTypes';
import { emailActions } from '../actions/email.actions';
import { emailAPI } from '../../services/api';
import type{ Email, SendRFPToVendorsResponse } from '../types/email.types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Send RFP to Vendors Saga
function* sendRFPToVendorsSaga(action: ReturnType<typeof emailActions.sendRFPToVendors>) {
  try {
    const { rfpId, vendorIds } = action.payload;
    const response: AxiosResponse<ApiResponse<SendRFPToVendorsResponse>> = yield call(
      emailAPI.sendRFPToVendors,
      { rfpId, vendorIds }
    );
    yield put(emailActions.sendRFPToVendorsSuccess(response.data.data));
  } catch (error) {
    yield put(emailActions.sendRFPToVendorsFailure(error as string));
  }
}

// Get All Emails Saga
function* getAllEmailsSaga(action: ReturnType<typeof emailActions.getAllEmails>) {
  try {
    const { direction, status } = action.payload;
    const response: AxiosResponse<ApiResponse<Email[]>> = yield call(
      emailAPI.getAllEmails,
      direction,
      status
    );
    yield put(emailActions.getAllEmailsSuccess(response.data.data));
  } catch (error) {
    yield put(emailActions.getAllEmailsFailure(error as string));
  }
}

// Get Emails by RFP Saga
function* getEmailsByRFPSaga(action: ReturnType<typeof emailActions.getEmailsByRFP>) {
  try {
    const response: AxiosResponse<ApiResponse<Email[]>> = yield call(
      emailAPI.getEmailsByRFP,
      action.payload.rfpId
    );
    yield put(emailActions.getEmailsByRFPSuccess(response.data.data));
  } catch (error) {
    yield put(emailActions.getEmailsByRFPFailure(error as string));
  }
}

// Get Email by ID Saga
function* getEmailByIdSaga(action: ReturnType<typeof emailActions.getEmailById>) {
  try {
    const response: AxiosResponse<ApiResponse<Email>> = yield call(
      emailAPI.getEmailById,
      action.payload.id
    );
    yield put(emailActions.getEmailByIdSuccess(response.data.data));
  } catch (error) {
    yield put(emailActions.getEmailByIdFailure(error as string));
  }
}

// Watcher Saga
export function* watchEmail() {
  yield takeLatest(EMAIL_ACTION_TYPES.SEND_RFP_TO_VENDORS_REQUEST, sendRFPToVendorsSaga);
  yield takeLatest(EMAIL_ACTION_TYPES.GET_ALL_EMAILS_REQUEST, getAllEmailsSaga);
  yield takeLatest(EMAIL_ACTION_TYPES.GET_EMAILS_BY_RFP_REQUEST, getEmailsByRFPSaga);
  yield takeLatest(EMAIL_ACTION_TYPES.GET_EMAIL_BY_ID_REQUEST, getEmailByIdSaga);
}
