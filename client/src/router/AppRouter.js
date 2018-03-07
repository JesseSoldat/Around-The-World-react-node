import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Welcome from '../pages/Welcome';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const NotFoundPage = () => (<h1>Not Found</h1>);

const AppRouter = () => (
  <Router history={history}>
    <div className="container">
      <Switch>
        <PublicRoute path="/" component={Welcome} exact />
        <PublicRoute path="/register" component={RegisterPage} exact />
        <PublicRoute path="/login" component={LoginPage} exact />
        <PrivateRoute path="/dashboard" component={DashboardPage} exact/>
        
        <Route component={NotFoundPage} />
      </Switch>

    </div>
  </Router>
);

export default AppRouter;
