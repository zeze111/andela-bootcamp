import axios from 'axios';
import {
  FAVORITE_RECIPE,
  GET_FAVORITE_RECIPE,
  DELETE_FAVORITE,
  FAVORITE_RECIPE_FAILURE,
  GET_FAVORITE_RECIPE_FAILURE,
  DELETE_FAVORITE_FAILURE
} from './types';

/** makes api call to favorite a recipe
 *
 * @export {function}
 *
 * @param {number} recipeId
 *
 * @returns {object} any
 */
export const favoriteRecipe = recipeId =>
  dispatch => axios.post(`/api/v1/recipes/${recipeId}/favorite`)
    .then((response) => {
      const toastContent = $(`<span>${response.data.message}</span>`);
      Materialize.toast(toastContent, 3000, 'green');
      dispatch({
        type: FAVORITE_RECIPE,
        payload: response.data,
      });
    })
    .catch((error) => {
      const toastContent = $(`<span>${error.response.data.message}</span>`);
      Materialize.toast(toastContent, 3000, 'red');
      dispatch({
        type: FAVORITE_RECIPE_FAILURE,
        payload: error.response.data,
      });
    });

/** makes api call to get all favorited recipes for a user
 *
 * @export {function}
 *
 * @param {number} limit
 *
 * @param {number} offset
 *
 * @returns {object} any
 */
export const getFavoriteRecipes = (limit, offset) =>
  dispatch => axios.get(`/api/v1/user/favorites?limit=${limit}&offset=${offset}`)
    .then((response) => {
      dispatch({
        type: GET_FAVORITE_RECIPE,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_FAVORITE_RECIPE_FAILURE,
        payload: error.response.data,
      });
    });

/** makes api call to delete a recipe from favorites list
 *
 * @export {function}
 *
 * @param {number} recipeId
 *
 * @returns {object} any
 */
export const deleteFavorite = recipeId =>
  dispatch => axios.delete(`/api/v1/user/favorites/${recipeId}`)
    .then((response) => {
      Materialize.toast(
        `<span> ${response.data.message}</span>`,
        2000,
        'green'
      );
      response.data.recipeId = recipeId;

      dispatch({
        type: DELETE_FAVORITE,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: DELETE_FAVORITE_FAILURE,
        payload: error.response.data,
      });
    });
