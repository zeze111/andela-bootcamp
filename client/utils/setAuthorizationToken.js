import axios from 'axios';

/**
 * @export {function}
 * @param {any} token
 * @returns {object} any
 */
export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['x-token'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['x-token'];
  }
}
