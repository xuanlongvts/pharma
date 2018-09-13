import { fromJS } from 'immutable';

import { BOX_RELEASE, BOX_UPDATE_DES, BOX_RECIEVE } from './consts';

const initialState = fromJS({
    listBoxs: []
});

const reducHome = (state = initialState, action) => {
    switch (action.type) {
        case BOX_RECIEVE:
            return state.set('listBoxs', action.listBoxs);
        case BOX_RELEASE:
            return state;
        case BOX_UPDATE_DES:
            return state;
        default:
            return state;
    }
};

export default reducHome;
