import axios from 'axios';

/** sets the header value of x-token to token
 * @export {function}
 *
 * @param {string} token
 *
 * @returns {object} any
 */
export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['x-token'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['x-token'];
  }
}
