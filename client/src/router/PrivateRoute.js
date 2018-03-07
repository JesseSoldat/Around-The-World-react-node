import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
    isAuthenticated ? (
      <div>
        <Header />
        <div className="spacer"></div>
        <Component {...props} />
      </div>
    ) : (
      <Redirect to="/" />
    )
  )} />
);

const mapStateToProps = ({auth}) => ({
  isAuthenticated: !!auth._id
});

export default connect(mapStateToProps)(PrivateRoute);