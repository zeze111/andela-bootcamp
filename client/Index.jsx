import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';

import store from './store';
import App from './components/App';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/signupActions';
import './assets/style.scss';

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
