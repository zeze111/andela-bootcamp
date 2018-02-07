import axios from 'axios';
import jwt from 'jsonwebtoken';

import {
  UPDATE_USER,
  GET_USER,
  GET_USER_FAILURE,
  UPDATE_USER_FAILURE,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAILURE
} from './types';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { setCurrentUser } from './signupActions';

/** makes api call to update a user's details
 *
 * @export {function}
 *
 * @param {object} user
 *
 * @returns {object} any
 */
export function updateUser(user) {
  setAuthorizationToken(window.localStorage.jwtToken);
  return dispatch => axios.put('/api/v1/user/', user)
    .then((response) => {
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      dispatch(setCurrentUser(jwt.decode(token)));
      dispatch({
        type: UPDATE_USER,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_USER_FAILURE,
        payload: error.response.data,
      });
    });
}

/** makes api call to change user's password
 *
 * @export {function}
 *
 * @param {object} passwordData
 *
 * @returns {object} any
 */
export function changePassword(passwordData) {
  return dispatch => axios.patch('/api/v1/user/password', passwordData)
    .then((response) => {
      dispatch({
        type: CHANGE_PASSWORD,
        payload: response.data,
      });
    });
}

/** makes api call to get user's detail from database
 *
 * @export {function}
 *
 * @param {number} userId
 *
 * @returns {object} any
 */
export function getUser(userId) {
  return dispatch => axios.get(`/api/v1/users/${userId}`)
    .then((response) => {
      const { id, email, firstName } = response.data.user;
      dispatch(setCurrentUser({ id, email, firstName }));
      dispatch({
        type: GET_USER,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_USER_FAILURE,
        payload: error.response.data,
      });
    });
}
