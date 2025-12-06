import { all } from 'redux-saga/effects';
import { watchRFP } from './rfp.saga';
import { watchVendor } from './vendor.saga';
import { watchEmail } from './email.saga';
import { watchComparison } from './comparison.saga';

export default function* rootSaga() {
  yield all([
    watchRFP(),
    watchVendor(),
    watchEmail(),
    watchComparison(),
  ]);
}