import { call, put, takeLatest } from 'redux-saga/effects';
import {type AxiosResponse } from 'axios';
import { PROPOSAL_ACTION_TYPES } from '../types/proposal.actionTypes';
import { proposalActions } from '../actions/proposal.actions';
import { proposalAPI } from '../../services/api';
import { type Proposal } from '../types/proposal.types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

function* getProposalsByRFPSaga(action: ReturnType<typeof proposalActions.getProposalsByRFP>) {
  try {
    const response: AxiosResponse<ApiResponse<Proposal[]>> = yield call(
      proposalAPI.getProposalsByRFP,
      action.payload.rfpId
    );
    yield put(proposalActions.getProposalsByRFPSuccess(response.data.data));
  } catch (error) {
    yield put(proposalActions.getProposalsByRFPFailure(error as string));
  }
}

function* getProposalByIdSaga(action: ReturnType<typeof proposalActions.getProposalById>) {
  try {
    const response: AxiosResponse<ApiResponse<Proposal>> = yield call(
      proposalAPI.getProposalById,
      action.payload.id
    );
    yield put(proposalActions.getProposalByIdSuccess(response.data.data));
  } catch (error) {
    yield put(proposalActions.getProposalByIdFailure(error as string));
  }
}

function* createProposalSaga(action: ReturnType<typeof proposalActions.createProposal>) {
  try {
    const response: AxiosResponse<ApiResponse<Proposal>> = yield call(
      proposalAPI.createProposal,
      action.payload
    );
    yield put(proposalActions.createProposalSuccess(response.data.data));
  } catch (error) {
    yield put(proposalActions.createProposalFailure(error as string));
  }
}

function* updateProposalSaga(action: ReturnType<typeof proposalActions.updateProposal>) {
  try {
    const { id, proposalData } = action.payload;
    const response: AxiosResponse<ApiResponse<Proposal>> = yield call(
      proposalAPI.updateProposal,
      id,
      proposalData
    );
    yield put(proposalActions.updateProposalSuccess(response.data.data));
  } catch (error) {
    yield put(proposalActions.updateProposalFailure(error as string));
  }
}

function* deleteProposalSaga(action: ReturnType<typeof proposalActions.deleteProposal>) {
  try {
    yield call(proposalAPI.deleteProposal, action.payload.id);
    yield put(proposalActions.deleteProposalSuccess(action.payload.id));
  } catch (error) {
    yield put(proposalActions.deleteProposalFailure(error as string));
  }
}

function* parseEmailToProposalSaga(action: ReturnType<typeof proposalActions.parseEmailToProposal>) {
  try {
    const response: AxiosResponse<ApiResponse<Proposal>> = yield call(
      proposalAPI.parseEmailToProposal,
      action.payload.emailId
    );
    yield put(proposalActions.parseEmailToProposalSuccess(response.data.data));
  } catch (error) {
    yield put(proposalActions.parseEmailToProposalFailure(error as string));
  }
}

function* simulateVendorResponseSaga(action: ReturnType<typeof proposalActions.simulateVendorResponse>) {
  try {
    const { rfpId, vendorId, emailBody } = action.payload;
    const response: AxiosResponse<ApiResponse<Proposal>> = yield call(
      proposalAPI.simulateVendorResponse,
      rfpId,
      vendorId,
      emailBody
    );
    yield put(proposalActions.simulateVendorResponseSuccess(response.data.data));
  } catch (error) {
    yield put(proposalActions.simulateVendorResponseFailure(error as string));
  }
}

export function* watchProposal() {
  yield takeLatest(PROPOSAL_ACTION_TYPES.GET_PROPOSALS_BY_RFP_REQUEST, getProposalsByRFPSaga);
  yield takeLatest(PROPOSAL_ACTION_TYPES.GET_PROPOSAL_BY_ID_REQUEST, getProposalByIdSaga);
  yield takeLatest(PROPOSAL_ACTION_TYPES.CREATE_PROPOSAL_REQUEST, createProposalSaga);
  yield takeLatest(PROPOSAL_ACTION_TYPES.UPDATE_PROPOSAL_REQUEST, updateProposalSaga);
  yield takeLatest(PROPOSAL_ACTION_TYPES.DELETE_PROPOSAL_REQUEST, deleteProposalSaga);
  yield takeLatest(PROPOSAL_ACTION_TYPES.PARSE_EMAIL_TO_PROPOSAL_REQUEST, parseEmailToProposalSaga);
  yield takeLatest(PROPOSAL_ACTION_TYPES.SIMULATE_VENDOR_RESPONSE_REQUEST, simulateVendorResponseSaga);
}

