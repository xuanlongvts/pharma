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

export const boxCreateNew = (id, nameBranch, des) => {
    return {
        type: listTypes.BOX_CREATE_NEW,
        id,
        nameBranch,
        des
    };
};

export const boxUpdateDes = (id, des) => {
    return {
        type: listTypes.BOX_UPDATE_DES,
        id,
        des
    };
};

export const boxRefresh = (id, nameBranch) => {
    return {
        type: listTypes.BOX_REFRESH,
        id,
        nameBranch
    };
};
