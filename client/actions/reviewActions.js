import axios from 'axios';
import { REVIEW_RECIPE, GET_REVIEWS, DELETE_REVIEW } from './types';

/**
 * @export {function}
 * @param {any} recipeId
 * @param {any} review
 * @returns {object} any
 */
export function reviewRecipe(recipeId, review) {
  return dispatch => axios.post(`/api/v1/recipe/${recipeId}/review`, review)
    .then((response) => {
      dispatch({
        type: REVIEW_RECIPE,
        payload: response.data
      });
    })
    .catch(error => error);
}

/**
 * @export {function}
 * @param {any} recipeId
 * @param {any} limit
 * @param {any} offset
 * @returns {object} any
 */
export function getReviews(recipeId, limit, offset) {
  return dispatch => axios.get(`/api/v1/recipe/${recipeId}/reviews?limit=${limit}&offset=${offset}`)
    .then((response) => {
      dispatch({
        type: GET_REVIEWS,
        payload: response.data,
      });
    });
}

/**
 * @export {function}
 * @param {any} reviewId
 * @returns {object} any
 */
export function deleteReview(reviewId) {
  return dispatch => axios.delete(`/api/v1/recipe/${reviewId}/review`)
    .then((response) => {
      Materialize.toast(`<span> ${response.data.message}</span>`, 2000);

      dispatch({
        type: DELETE_REVIEW,
        payload: reviewId,
      });
    });
}
