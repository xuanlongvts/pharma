import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';

import reducerHome from '../components/reducer';

const rootReducer = combineReducers({
    router: routerReducer,
    form: reduxFormReducer,
    reducerHome
});

export default rootReducer;
