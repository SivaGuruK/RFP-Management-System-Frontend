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
    const response: AxiosResponse<ApiResponse<any>> = yield call(
      comparisonAPI.compareProposals,
      action.payload.rfpId
    );

    const apiData = response.data.data;

    const mappedResult: ComparisonResult = {
      scores: apiData.comparison.scores.map((s: any) => ({
        proposalId: s.proposalId,
        score: s.score,
        strengths: s.strengths,
        weaknesses: s.weaknesses,
        priceScore: s.priceScore,
        deliveryScore: s.deliveryScore,
        warrantyScore: s.warrantyScore,
        valueScore: s.valueScore,
        vendorName: s.vendorName,
      })),
      reasoning: apiData.comparison.reasoning,
      topRecommendation: {
        vendor: apiData.comparison.topVendor,
        score: apiData.comparison.scores.find((s: any) => s.vendorName === apiData.comparison.topVendor)?.score || 0,
        price: apiData.comparison.scores.find((s: any) => s.vendorName === apiData.comparison.topVendor)?.priceScore || 0,
        deliveryTime: `${apiData.comparison.scores.find((s: any) => s.vendorName === apiData.comparison.topVendor)?.deliveryScore || 0} days`,
        warranty: `${apiData.comparison.scores.find((s: any) => s.vendorName === apiData.comparison.topVendor)?.warrantyScore || 0}-year`,
        recommendation: apiData.comparison.reasoning,
      },
      proposals: [],
    };

    yield put(comparisonActions.compareProposalsSuccess(mappedResult));
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
