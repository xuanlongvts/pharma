import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RoutersAuthen from './RoutersAuthen';

import Loading from '../components/loading';

class Routers extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            routes: RoutersAuthen
        };
    }

    render() {
        const { routes } = this.state;

        return (
            <BrowserRouter>
                <div className="main-container">
                    <Switch>{routes.length && routes.map((route, key) => <Route key={key} {...route} />)}</Switch>

                    <Loading />
                </div>
            </BrowserRouter>
        );
    }
}

export default Routers;
