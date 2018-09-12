import { all, fork } from 'redux-saga/effects';

import homeSaga from '../components/saga';

export default function* rootSaga() {
    yield all([fork(homeSaga)]);
}
