import { type RFPState } from './rfp.types';
import { type VendorState } from './vendor.types';
import { type EmailState } from './email.types';
import type { ProposalState } from './proposal.types';
import type { ComparisonState } from './comparison.types';
import type { EmailReceiverState } from './emailReceiver.types';

export interface RootState {
  rfp: RFPState;
  vendor: VendorState;
  email: EmailState;
  proposal: ProposalState;
  comparison: ComparisonState;
  emailReceiver: EmailReceiverState;
}