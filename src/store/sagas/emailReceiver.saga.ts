import { call, put, takeLatest } from 'redux-saga/effects';
import { type AxiosResponse } from 'axios';
import { EMAIL_RECEIVER_ACTION_TYPES } from '../types/emailReceiver.actionTypes';
import { emailReceiverActions } from '../actions/emailReceiver.actions';
import { emailReceiverAPI } from '../../services/api';
import {type EmailReceiverStatus } from '../types/emailReceiver.types';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

function* startPollingSaga(action: ReturnType<typeof emailReceiverActions.startPolling>) {
  try {
    const response: AxiosResponse<ApiResponse<any>> = yield call(
      emailReceiverAPI.startPolling,
      action.payload.intervalSeconds
    );
    yield put(emailReceiverActions.startPollingSuccess(response.data));
  } catch (error) {
    yield put(emailReceiverActions.startPollingFailure(error as string));
  }
}

function* stopPollingSaga() {
  try {
    const response: AxiosResponse<ApiResponse<any>> = yield call(emailReceiverAPI.stopPolling);
    yield put(emailReceiverActions.stopPollingSuccess(response.data));
  } catch (error) {
    yield put(emailReceiverActions.stopPollingFailure(error as string));
  }
}

function* checkNowSaga() {
  try {
    const response: AxiosResponse<ApiResponse<any>> = yield call(emailReceiverAPI.checkNow);
    yield put(emailReceiverActions.checkNowSuccess(response.data));
  } catch (error) {
    yield put(emailReceiverActions.checkNowFailure(error as string));
  }
}

function* getStatusSaga() {
  try {
    const response: AxiosResponse<ApiResponse<EmailReceiverStatus>> = yield call(
      emailReceiverAPI.getStatus
    );
    yield put(emailReceiverActions.getStatusSuccess(response.data.data!));
  } catch (error) {
    yield put(emailReceiverActions.getStatusFailure(error as string));
  }
}

export function* watchEmailReceiver() {
  yield takeLatest(EMAIL_RECEIVER_ACTION_TYPES.START_POLLING_REQUEST, startPollingSaga);
  yield takeLatest(EMAIL_RECEIVER_ACTION_TYPES.STOP_POLLING_REQUEST, stopPollingSaga);
  yield takeLatest(EMAIL_RECEIVER_ACTION_TYPES.CHECK_NOW_REQUEST, checkNowSaga);
  yield takeLatest(EMAIL_RECEIVER_ACTION_TYPES.GET_STATUS_REQUEST, getStatusSaga);
}