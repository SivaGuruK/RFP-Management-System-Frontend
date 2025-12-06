import {type RootState } from '../types/store.types';
import {type Vendor } from '../types/vendor.types';

export const vendorSelectors = {
  selectAllVendors: (state: RootState): Vendor[] => state.vendor.vendors,
  selectCurrentVendor: (state: RootState): Vendor | null => state.vendor.currentVendor,
  selectVendorLoading: (state: RootState): boolean => state.vendor.loading,
  selectVendorError: (state: RootState): string | null => state.vendor.error,
  selectVendorSuccess: (state: RootState): boolean => state.vendor.success,
  selectVendorCount: (state: RootState): number => state.vendor.vendors.length,
  selectVendorById: (id: string) => (state: RootState): Vendor | undefined =>
    state.vendor.vendors.find((vendor) => vendor._id === id),
  selectVendorsBySearch: (searchTerm: string) => (state: RootState): Vendor[] => {
    if (!searchTerm) return state.vendor.vendors;
    
    const lowerSearch = searchTerm.toLowerCase();
    return state.vendor.vendors.filter(
      (vendor) =>
        vendor.name.toLowerCase().includes(lowerSearch) ||
        vendor.email.toLowerCase().includes(lowerSearch)
    );
  },

  selectVendorsSortedByName: (state: RootState): Vendor[] =>
    [...state.vendor.vendors].sort((a, b) => a.name.localeCompare(b.name)),
};