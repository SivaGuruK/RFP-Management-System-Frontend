import axios, { type AxiosInstance,type AxiosResponse, AxiosError } from 'axios';
import { type RFP,type GeneratedRFP,type DashboardStats } from '../store/types/rfp.types';
import { type Vendor,type VendorStats } from '../store/types/vendor.types';

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

export default api;