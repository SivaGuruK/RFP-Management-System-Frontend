import { combineReducers } from 'redux';
import rfpReducer from './rfp.reducer';
import vendorReducer from './vendor.reducer';
import emailReducer from './email.reducer';
import comparisonReducer from './comparison.reducer';

const rootReducer = combineReducers({
  rfp: rfpReducer,
  vendor: vendorReducer,
  email: emailReducer,
  comparison: comparisonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
