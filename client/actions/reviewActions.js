import axios from 'axios';
import {
  REVIEW_RECIPE,
  GET_REVIEWS,
  DELETE_REVIEW,
  REVIEW_RECIPE_FAILURE,
  GET_REVIEWS_FAILURE,
  DELETE_REVIEW_FAILURE
} from './types';

/** makes api call to submit e review for a recipe
 *
 * @export {function}
 *
 * @param {number} recipeId
 *
 * @param {object} review form data
 *
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
    .catch((error) => {
      const toastContent = $(`<span>${error.response.data.message}</span>`);
      Materialize.toast(toastContent, 3000, 'red');
      dispatch({
        type: REVIEW_RECIPE_FAILURE,
        payload: error.response.data,
      });
    });
}

/** makes api call to get all reviews for a recipe
 *
 * @export {function}
 *
 * @param {number} recipeId
 *
 * @param {number} limit
 *
 * @param {number} offset
 *
 * @returns {object} any
 */
export function getReviews(recipeId, limit, offset) {
  return dispatch => axios.get(`/api/v1/recipes/${recipeId}/reviews?limit=${limit}&offset=${offset}`)
    .then((response) => {
      dispatch({
        type: GET_REVIEWS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_REVIEWS_FAILURE,
        payload: error.response.data,
      });
    });
}

/** makes api call to delete a user's review
 *
 * @export {function}
 *
 * @param {number} reviewId
 *
 * @returns {object} any
 */
export function deleteReview(reviewId) {
  return dispatch => axios.delete(`/api/v1/recipe/reviews/${reviewId}`)
    .then((response) => {
      Materialize.toast(`<span> ${response.data.message}</span>`, 2000);

      dispatch({
        type: DELETE_REVIEW,
        payload: reviewId,
      });
    })
    .catch((error) => {
      dispatch({
        type: DELETE_REVIEW_FAILURE,
        payload: error.response.data,
      });
    });
}
