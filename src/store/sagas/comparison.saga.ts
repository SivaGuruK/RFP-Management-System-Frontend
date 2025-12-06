import { call, put, takeLatest } from 'redux-saga/effects';
import { type AxiosResponse } from 'axios';
import { COMPARISON_ACTION_TYPES } from '../types/comparison.actionTypes';
import { comparisonActions } from '../actions/comparison.actions';
import { comparisonAPI } from '../../services/api';
import { type ComparisonResult } from '../types/comparison.types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

function* compareProposalsSaga(action: ReturnType<typeof comparisonActions.compareProposals>) {
  try {
    const response: AxiosResponse<ApiResponse<ComparisonResult>> = yield call(
      comparisonAPI.compareProposals,
      action.payload.rfpId
    );

    yield put(comparisonActions.compareProposalsSuccess(response.data.data));
  } catch (error) {
    yield put(comparisonActions.compareProposalsFailure(error as string));
  }
}

function* getComparisonResultsSaga(action: ReturnType<typeof comparisonActions.getComparisonResults>) {
  try {
    const response: AxiosResponse<ApiResponse<ComparisonResult>> = yield call(
      comparisonAPI.getComparisonResults,
      action.payload.rfpId
    );
    yield put(comparisonActions.getComparisonResultsSuccess(response.data.data));
  } catch (error) {
    yield put(comparisonActions.getComparisonResultsFailure(error as string));
  }
}

export function* watchComparison() {
  yield takeLatest(COMPARISON_ACTION_TYPES.COMPARE_PROPOSALS_REQUEST, compareProposalsSaga);
  yield takeLatest(COMPARISON_ACTION_TYPES.GET_COMPARISON_RESULTS_REQUEST, getComparisonResultsSaga);
}