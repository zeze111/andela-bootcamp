import React from 'react';
import { Redirect } from 'react-router-dom';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import { store } from '../Index';
import { setCurrentUser } from '../actions/signinActions';
import decodeToken from '../utils/decodeToken';

const confirmAuth = (Component) => {
  if (!store.getState().auth.isAuthenticated) {
    return () => <Redirect to="/" />;
  }
  if (!decodeToken()) {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    setAuthorizationToken(false);
    store.dispatch(setCurrentUser(undefined, undefined));
    return () => <Redirect to="/" />;
  }
  return props => <Component {...props} />;
};

export default confirmAuth;
