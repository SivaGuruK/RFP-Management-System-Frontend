import { combineReducers } from 'redux';
import rfpReducer from './rfp.reducer';
import vendorReducer from './vendor.reducer';

const rootReducer = combineReducers({
  rfp: rfpReducer,
  vendor: vendorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
