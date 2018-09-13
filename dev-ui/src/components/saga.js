import { all, put, take, call, fork } from 'redux-saga/effects';

import { boxRecieve } from './actions';
import * as nameActList from './consts';

import { loadingOpen, loadingClose } from './loading/actions';

import API from '../_services/api';

const fetchBox = () => {
    const restApi = new API();
    const path = '/list';

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

function* boxGet() {
    while (true) {
        yield take(nameActList.BOX_REQUEST);
        const result = yield call(fetchBox);
        result.status === 200 && (yield put(boxRecieve(result.data.data)));
    }
}

const createNewBoxRequest = (id, nameBranch, des) => {
    const restApi = new API();
    const path = `/create/${id}`;

    const payload = {
        id,
        nameBranch,
        des
    };

    return restApi
        .put({ path, payload })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return {
                type: nameActList.BOX_ERR,
                err
            };
        });
};

function* boxCreateNewSaga() {
    while (true) {
        const { id, nameBranch, des } = yield take(nameActList.BOX_CREATE_NEW);
        yield put(loadingOpen());
        const result = yield call(createNewBoxRequest, id, nameBranch, des);
        yield put(loadingClose());
        yield put(boxRecieve(result.data));
    }
}

const boxReleaseHandle = id => {
    const restApi = new API();
    const path = `/delete/${id}`;

    const payload = {
        id
    };

    return restApi
        .delete({ path, payload })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return {
                type: nameActList.BOX_ERR,
                err
            };
        });
};

function* boxReleaseSaga() {
    while (true) {
        const { id } = yield take(nameActList.BOX_RELEASE);

        const result = yield call(boxReleaseHandle, id);

        yield put(boxRecieve(result.data));
    }
}

export default function* root() {
    yield all([fork(boxGet), fork(boxCreateNewSaga), fork(boxReleaseSaga)]);
}
