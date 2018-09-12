import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';

import store from './store';
import Routes from './router';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store()}>
        <Routes />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
