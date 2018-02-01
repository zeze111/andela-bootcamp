import React from 'react';
import jwt from 'jsonwebtoken';
import { Redirect } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import { store } from '../Index';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const getTokenState = () => {
  const token = localStorage.getItem('jwtToken');
  jwt.verify(token, process.env.SECRET_KEY, ((error, decoded) => decoded));
};

// const decodeToken = () => {

//   if (token) {
//     jwt.verify(token, process.env.SECRET_KEY, ((error) => {
//       if (!error) {
//         decode = true;
//       }
//       decode = false;
//     }));
//   }
//   console.log('decodeeeeeee', decode);
//   return decode;
// };

const ConfirmAuth = (Component) => {
  if (!store.getState().auth.isAuthenticated) {
    return () => <Redirect to="/" />;
  }
  // console.log(getTokenState(), 'authhhhhhhhhh');
  // if (!decodeToken()) {
  //   localStorage.removeItem('jwtToken');
  //   setAuthorizationToken(false);
  //   return () => <Redirect to="/" />;
  // }
  // const token = localStorage.getItem('jwtToken');
  // jwt.verify(token, process.env.SECRET_KEY, ((error, decoded) => {
  //   if (decoded.id) {
  //     console.log('true');
  //     localStorage.removeItem('jwtToken');
  //     setAuthorizationToken(false);
  //     return () => <Redirect to="/" />;
  //   } else {
  //     // localStorage.removeItem('jwtToken');
  //     // setAuthorizationToken(false);
  //     // return () => <Redirect to="/" />;
  //   }
  // }));
  return props => <Component {...props} />;
};


export default ConfirmAuth;
