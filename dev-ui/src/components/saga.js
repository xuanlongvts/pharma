import { put, take, call, fork } from 'redux-saga/effects';

import { boxRecieve } from './actions';
import * as nameActList from './consts';

import API from '../_services/api';

const fetchBox = () => {
    const restApi = new API();
    const path = 'list';

    return restApi
        .fetch(path)
        .then(res => {
            return res;
        })
        .catch(err => {
            return {
                type: nameActList.BOX_ERR,
                err
            };
        });
};

function* test() {
    while (true) {
        yield take(nameActList.BOX_REQUEST);
        const result = yield call(fetchBox);
        result.status === 200 && (yield put(boxRecieve(result.data.data)));
    }
}

export default function* root() {
    yield fork(test);
}
