import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Login from "../components/Auth/Login";

const Auth = ({ isAuth }) => {
  // return <Login />;
  return isAuth ? <Redirect to='/' /> : <Login />;
};

const mapStateToProps = state => {
  return {
    isAuth: state.isAuth
  };
};

export default connect(mapStateToProps)(Auth);
