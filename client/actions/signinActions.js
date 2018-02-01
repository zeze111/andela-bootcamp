import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import { setCurrentUser } from './signupActions';


/** signs user out of the app
 *
 * @export {function}
 *
 * @returns {object} any
 */
export function signout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser(undefined, undefined));
  };
}

/** makes api call to sign user in and dispatch the response
 * 
 * @export {function}
 *
 * @param {object} userData form data
 *
 * @returns {object} any
 */
export function userSigninRequest(userData) {
  return dispatch => axios.post('/api/v1/users/signin', userData)
    .then((response) => {
      const { token, user } = response.data;
      const { id, email, firstName } = user;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser({ id, email, firstName }));
    });
}
