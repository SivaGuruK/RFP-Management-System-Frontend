import { combineReducers } from 'redux';
import rfpReducer from './rfp.reducer';
import vendorReducer from './vendor.reducer';
import emailReducer from './email.reducer';
import proposalReducer from './proposal.reducer';
import comparisonReducer from './comparison.reducer';
import emailReceiverReducer from './emailReceiver.reducer';

const rootReducer = combineReducers({
  rfp: rfpReducer,
  vendor: vendorReducer,
  email: emailReducer,
  proposal: proposalReducer,
  comparison: comparisonReducer,
  emailReceiver: emailReceiverReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
