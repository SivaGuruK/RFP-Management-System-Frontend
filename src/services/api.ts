import axios, { type AxiosInstance,type AxiosResponse, AxiosError } from 'axios';
import { type RFP,type GeneratedRFP,type DashboardStats } from '../store/types/rfp.types';
import { type Vendor,type VendorStats } from '../store/types/vendor.types';
import type{ Email, SendRFPToVendorsPayload, SendRFPToVendorsResponse } from '../store/types/email.types';
import { type Proposal } from '../store/types/proposal.types';
import {type ComparisonResult } from '../store/types/comparison.types';
import {type EmailReceiverStatus } from '../store/types/emailReceiver.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => config,
  (error: AxiosError) => Promise.reject(error)
);


api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(message);
  }
);

// RFP API
export const rfpAPI = {
  generateRFP: (description: string): Promise<AxiosResponse<ApiResponse<GeneratedRFP>>> =>
    api.post('/rfps/generate-rfp', { description }),

  createRFP: (rfpData: Partial<RFP>): Promise<AxiosResponse<ApiResponse<RFP>>> =>
    api.post('/rfps/create-rfp', rfpData),

  getAllRFPs: (status?: string): Promise<AxiosResponse<ApiResponse<RFP[]>>> => {
    const params = status ? { status } : {};
    return api.get('/rfps', { params });
  },

  getRFPById: (id: string): Promise<AxiosResponse<ApiResponse<RFP>>> =>
    api.get(`/rfps/${id}`),

  updateRFP: (id: string, rfpData: Partial<RFP>): Promise<AxiosResponse<ApiResponse<RFP>>> =>
    api.put(`/rfps/${id}`, rfpData),

  deleteRFP: (id: string): Promise<AxiosResponse<ApiResponse<{ message: string }>>> =>
    api.delete(`/rfps/${id}`),

  getDashboardStats: (): Promise<AxiosResponse<ApiResponse<DashboardStats>>> =>
    api.get('/rfps/stats/dashboard'),
};

// Vendor API
export const vendorAPI = {
  createVendor: (vendorData: Partial<Vendor>): Promise<AxiosResponse<ApiResponse<Vendor>>> =>
    api.post('/vendors/create-vendor', vendorData),

  getAllVendors: (search?: string): Promise<AxiosResponse<ApiResponse<Vendor[]>>> => {
    const params = search ? { search } : {};
    return api.get('/vendors', { params });
  },

  getVendorById: (id: string): Promise<AxiosResponse<ApiResponse<Vendor>>> =>
    api.get(`/vendors/${id}`),

  updateVendor: (id: string, vendorData: Partial<Vendor>): Promise<AxiosResponse<ApiResponse<Vendor>>> =>
    api.put(`/vendors/${id}`, vendorData),

  deleteVendor: (id: string): Promise<AxiosResponse<ApiResponse<{ message: string }>>> =>
    api.delete(`/vendors/${id}`),

  updateVendorStats: (id: string, stats: VendorStats): Promise<AxiosResponse<ApiResponse<Vendor>>> =>
    api.put(`/vendors/${id}/stats`, stats),
};

// Email API
export const emailAPI = {
  sendRFPToVendors: (payload: SendRFPToVendorsPayload): Promise<AxiosResponse<ApiResponse<SendRFPToVendorsResponse>>> =>
    api.post('/emails/send-rfp', payload),

  getAllEmails: (direction?: string, status?: string): Promise<AxiosResponse<ApiResponse<Email[]>>> => {
    const params: any = {};
    if (direction) params.direction = direction;
    if (status) params.status = status;
    return api.get('/emails', { params });
  },

  getEmailsByRFP: (rfpId: string): Promise<AxiosResponse<ApiResponse<Email[]>>> =>
    api.get(`/emails/rfp/${rfpId}`),

  getEmailById: (id: string): Promise<AxiosResponse<ApiResponse<Email>>> =>
    api.get(`/emails/${id}`),
};

export const proposalAPI = {
  getProposalsByRFP: (rfpId: string): Promise<AxiosResponse<ApiResponse<Proposal[]>>> =>
    api.get(`/proposal/rfp/${rfpId}`),

  getProposalById: (id: string): Promise<AxiosResponse<ApiResponse<Proposal>>> =>
    api.get(`/proposal/${id}`),

  createProposal: (proposalData: Partial<Proposal>): Promise<AxiosResponse<ApiResponse<Proposal>>> =>
    api.post('/proposal', proposalData),

  updateProposal: (id: string, proposalData: Partial<Proposal>): Promise<AxiosResponse<ApiResponse<Proposal>>> =>
    api.put(`/proposal/${id}`, proposalData),

  deleteProposal: (id: string): Promise<AxiosResponse<ApiResponse<{ message: string }>>> =>
    api.delete(`/proposal/${id}`),

  parseEmailToProposal: (emailId: string): Promise<AxiosResponse<ApiResponse<Proposal>>> =>
    api.post('/proposal/parse-email', { emailId }),

  simulateVendorResponse: (
    rfpId: string,
    vendorId: string,
    emailBody: string
  ): Promise<AxiosResponse<ApiResponse<Proposal>>> =>
    api.post('/proposal/simulate-response', { rfpId, vendorId, emailBody }),
};

// Comparison API
export const comparisonAPI = {
  compareProposals: (rfpId: string): Promise<AxiosResponse<ApiResponse<ComparisonResult>>> =>
    api.post('/compare/analyze', { rfpId }),

  getComparisonResults: (rfpId: string): Promise<AxiosResponse<ApiResponse<ComparisonResult>>> =>
    api.get(`/compare/rfp/${rfpId}`),

  selectVendor: (proposalId: string): Promise<AxiosResponse<ApiResponse<any>>> =>
    api.post('/compare/select-vendor', { proposalId }),
};

// Email Receiver API
export const emailReceiverAPI = {
  startPolling: (intervalSeconds?: number): Promise<AxiosResponse<ApiResponse<any>>> =>
    api.post('/email-receiver/start', { intervalSeconds }),

  stopPolling: (): Promise<AxiosResponse<ApiResponse<any>>> =>
    api.post('/email-receiver/stop'),

  checkNow: (): Promise<AxiosResponse<ApiResponse<any>>> =>
    api.post('/email-receiver/check-now'),

  getStatus: (): Promise<AxiosResponse<ApiResponse<EmailReceiverStatus>>> =>
    api.get('/email-receiver/status'),
};

export default api;