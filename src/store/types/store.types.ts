import { type RFPState } from './rfp.types';
import { type VendorState } from './vendor.types';

export interface RootState {
  rfp: RFPState;
  vendor: VendorState;
}