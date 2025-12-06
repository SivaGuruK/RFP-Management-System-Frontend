import { all } from 'redux-saga/effects';
import { watchRFP } from './rfp.saga';
import { watchVendor } from './vendor.saga';
import { watchEmail } from './email.saga';
import { watchProposal } from './proposal.saga';
import { watchComparison } from './comparison.saga';
import { watchEmailReceiver } from './emailReceiver.saga';

export default function* rootSaga() {
  yield all([
    watchRFP(),
    watchVendor(),
    watchEmail(),
    watchProposal(),
    watchComparison(),
    watchEmailReceiver(),
  ]);
}