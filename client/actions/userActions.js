import axios from 'axios';
import { UPDATE_USER, GET_USER } from './types';

export function updateUser(userId, user) {
  axios.defaults.headers.common['x-token'] = window.localStorage.jwtToken;
  return dispatch => axios.put(`/api/v1/user/${userId}`, user)
    .then((response) => {
      dispatch({
        type: UPDATE_USER,
        payload: response.data,
      });
    });
}

export function getUser(userId) {
  return dispatch => axios.get(`/api/v1/user/${userId}`)
    .then((response) => {
      dispatch({
        type: GET_USER,
        payload: response.data,
      });
    });
}
