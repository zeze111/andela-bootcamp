import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';

/** sets user object to current user
 *
 * @export {function}
 *
 * @param {object} user
 *
 * @returns {object} any
 */
export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user,
});

/** makes api call to create a new user and dispatch the response
 *
 * @export {function}
 *
 * @param {object} userData form data
 *
 * @returns {object} any
 */
export const signUp = userData =>
  dispatch => axios.post('/api/v1/users/signup', userData)
    .then((res) => {
      const { token, user } = res.data;
      const { id, email, firstName } = user;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser({ id, email, firstName }));
    });
