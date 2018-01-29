import React from 'react';
import { Redirect } from 'react-router-dom';

import { store } from '../Index';
import { signout } from '../actions/signinActions';
import decodeToken from '../utils/decodeToken';

const confirmAuth = (Component) => {
  if (!store.getState().auth.isAuthenticated) {
    return () => <Redirect to="/" />;
  }
  // if (!decodeToken()) {
  //   console.log('22222222', decodeToken());
  //   signout();
  //   return () => <Redirect to="/" />;
  // }
  return props => <Component {...props} />;
};

export default confirmAuth;
