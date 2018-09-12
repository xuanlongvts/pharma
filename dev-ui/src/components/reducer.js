import { fromJS } from 'immutable';

import { BOX_REQUEST, BOX_RELEASE, BOX_UPDATE_DES, BOX_RECIEVE } from './consts';

const initialState = fromJS({
    isLoading: false,
    listBoxs: []
});

const reducHome = (state = initialState, action) => {
    switch (action.type) {
        case BOX_REQUEST:
            return state.set('isLoading', true);
        case BOX_RECIEVE:
            return state.set('isLoading', false).set('listBoxs', action.listBoxs);
        case BOX_RELEASE:
            return state;
        case BOX_UPDATE_DES:
            return state;
        default:
            return state;
    }
};

export default reducHome;
