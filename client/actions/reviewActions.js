import axios from 'axios';
import { REVIEW_RECIPE, GET_REVIEWS, DELETE_REVIEW } from './types';

/**
 * @export {function}
 * @param {any} recipeId
 * @param {any} review
 * @returns {object} any
 */
export function reviewRecipe(recipeId, review) {
  return dispatch => axios.post(`/api/v1/recipes/${recipeId}/review`, review)
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
 * @returns {object} any
 */
export function getReviews(recipeId) {
  return dispatch => axios.get(`/api/v1/recipes/${recipeId}/reviews`)
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
  return dispatch => axios.delete(`/api/v1/recipes/${reviewId}/review`)
    .then((response) => {
      Materialize.toast(`<span> ${response.data.message}</span>`, 2000);

      dispatch({
        type: DELETE_REVIEW,
        payload: reviewId,
      });
    });
}
