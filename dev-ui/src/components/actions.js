import * as listTypes from './consts';

export const boxRequest = () => {
    return {
        type: listTypes.BOX_REQUEST
    };
};

export const boxRecieve = listBoxs => {
    return {
        type: listTypes.BOX_RECIEVE,
        listBoxs
    };
};

export const boxRelease = id => {
    return {
        type: listTypes.BOX_RELEASE,
        id
    };
};

export const boxUpdate = (id, des) => {
    return {
        type: listTypes.BOX_UPDATE_DES,
        id,
        des
    };
};

export const boxRefresh = id => {
    return {
        type: listTypes.BOX_REFRESH,
        id
    };
};
