import { all } from 'redux-saga/effects';
import { watchRFP } from './rfp.saga';
import { watchVendor } from './vendor.saga';

export default function* rootSaga() {
  yield all([
    watchRFP(),
    watchVendor(),
  ]);
}