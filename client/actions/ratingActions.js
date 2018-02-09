import axios from 'axios';
import {
  UPVOTE_RECIPE,
  DOWNVOTE_RECIPE,
  GET_DOWNVOTES,
  GET_UPVOTES,
  UPVOTE_RECIPE_FAILURE,
  DOWNVOTE_RECIPE_FAILURE,
  GET_UPVOTES_FAILURE,
  GET_DOWNVOTES_FAILURE
} from './types';
/** makes api call to get all upvotes for a recipe
 *
 * @export {function}
 *
 * @param {number} recipeId
 *
 * @returns {object} any
 */
export const getUpvotes = recipeId =>
  dispatch => axios.get(`/api/v1/recipes/${recipeId}/upvotes`)
    .then((response) => {
      dispatch({
        type: GET_UPVOTES,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_UPVOTES_FAILURE,
        payload: error.response.data,
      });
    });

/** makes api call to get all downvotes for a recipe
 *
 * @export {function}
 *
 * @param {number} recipeId
 *
 * @returns {object} any
 */
export const getDownvotes = recipeId =>
  dispatch => axios.get(`/api/v1/recipes/${recipeId}/downvotes`)
    .then((response) => {
      dispatch({
        type: GET_DOWNVOTES,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_DOWNVOTES_FAILURE,
        payload: error.response.data,
      });
    });

/** makes api call to upvote a recipe
 *
 * @export {function}
 *
 * @param {number} recipeId
 *
 * @returns {object} any
 */
export const upvoteRecipe = recipeId =>
  dispatch => axios.post(`/api/v1/recipes/${recipeId}/upvote`)
    .then((response) => {
      dispatch(getUpvotes(recipeId));
      dispatch(getDownvotes(recipeId));
      dispatch({
        type: UPVOTE_RECIPE,
        payload: response.data,
      });
    })
    .catch((error) => {
      const toastContent = $(`<span>${error.response.data.message}</span>`);
      Materialize.toast(toastContent, 3000, 'red');
      dispatch({
        type: UPVOTE_RECIPE_FAILURE,
        payload: error.response.data,
      });
    });

/** makes api call to downvote a recipe
 *
 * @export {function}
 *
 * @param {number} recipeId
 *
 * @returns {object} any
 */
export const downvoteRecipe = recipeId =>
  dispatch => axios.post(`/api/v1/recipes/${recipeId}/downvote`)
    .then((response) => {
      dispatch(getUpvotes(recipeId));
      dispatch(getDownvotes(recipeId));
      dispatch({
        type: DOWNVOTE_RECIPE,
        payload: response.data,
      });
    })
    .catch((error) => {
      const toastContent = $(`<span>${error.response.data.message}</span>`);
      Materialize.toast(toastContent, 3000, 'red');
      dispatch({
        type: DOWNVOTE_RECIPE_FAILURE,
        payload: error.response.data,
      });
    });
