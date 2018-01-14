import axios from 'axios';
import {
  UPVOTE_RECIPE, DOWNVOTE_RECIPE, GET_DOWNVOTES, GET_UPVOTES
} from './types';

/**
 * @export {function}
 * @param {any} recipeId
 * @returns {object} any
 */
export function upvoteRecipe(recipeId) {
  return dispatch => axios.post(`/api/v1/recipes/${recipeId}/upvote`)
    .then((response) => {
      dispatch({
        type: UPVOTE_RECIPE,
        payload: response.data,
      });
    });
}

/**
 * @export {function}
 * @param {any} recipeId
 * @returns {object} any
 */
export function downvoteRecipe(recipeId) {
  return dispatch => axios.post(`/api/v1/recipes/${recipeId}/downvote`)
    .then((response) => {
      dispatch({
        type: DOWNVOTE_RECIPE,
        payload: response.data,
      });
    });
}

/**
 * @export {function}
 * @param {any} recipeId
 * @returns {object} any
 */
export function getUpvotes(recipeId) {
  return dispatch => axios.get(`/api/v1/recipes/${recipeId}/upvotes`)
    .then((response) => {
      dispatch({
        type: GET_UPVOTES,
        payload: response.data,
      });
    });
}

/**
 * @export {function}
 * @param {any} recipeId
 * @returns {object} any
 */
export function getDownvotes(recipeId) {
  return dispatch => axios.get(`/api/v1/recipes/${recipeId}/downvotes`)
    .then((response) => {
      dispatch({
        type: GET_DOWNVOTES,
        payload: response.data,
      });
    });
}
