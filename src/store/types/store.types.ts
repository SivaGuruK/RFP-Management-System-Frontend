import { type RFPState } from './rfp.types';
import { type VendorState } from './vendor.types';
import { type EmailState } from './email.types';
import type { ComparisonState } from './comparison.types';

export interface RootState {
  rfp: RFPState;
  vendor: VendorState;
  email: EmailState;
  comparison: ComparisonState;
}