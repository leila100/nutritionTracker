import React from "react";
import { connect } from "react-redux";

import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ isAuth, component: Component, ...rest }) => {
  return <Route {...rest} render={props => (!isAuth ? <Redirect to='/login' /> : <Component {...props} />)} />;
};

const mapStateToProps = state => {
  return {
    isAuth: state.isAuth
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
