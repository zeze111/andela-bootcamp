import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';

/**
 * @export {function}
 * @param {any} user
 * @returns {object} any
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

/**
 * @export {function}
 * @returns {object} any
 */
export function signout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    setAuthorizationToken(false);
    dispatch(setCurrentUser(undefined, undefined));
  };
}

/**
 * @export {function}
 * @param {any} userData
 * @returns {object} any
 */
export function userSigninRequest(userData) {
  return dispatch => axios.post('/api/v1/users/signin', userData)
    .then((res) => {
      const { token, user } = res.data;
      const { id, email, firstName } = user;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('user', JSON.stringify({ id, email, firstName }));
      setAuthorizationToken(token);
      dispatch(setCurrentUser({ id, email, firstName }));
    });
}
