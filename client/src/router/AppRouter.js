import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Welcome from '../pages/Welcome';
import RegisterPage from '../pages/RegisterPage';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const NotFoundPage = () => (<h1>Not Found</h1>);

const AppRouter = () => (
  <Router history={history}>
    <div className="container">
      <Switch>
        <PublicRoute path="/" component={Welcome} exact />
        <PublicRoute path="/register" component={RegisterPage} exact/>
        
        <Route component={NotFoundPage} />
      </Switch>

    </div>
  </Router>
);

export default AppRouter;
