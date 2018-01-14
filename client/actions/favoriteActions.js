import axios from 'axios';
import { FAVORITE_RECIPE, GET_FAVORITE_RECIPE, DELETE_FAVORITE } from './types';

/**
 * @export {function}
 * @param {any} recipeId
 * @returns {object} any
 */
export function favoriteRecipe(recipeId) {
  return dispatch => axios.post(`/api/v1/recipes/${recipeId}/favorite`)
    .then((response) => {
      dispatch({
        type: FAVORITE_RECIPE,
        payload: response.data,
      });
    });
}

/**
 *  @export {function}
 * @param {any} userId
 * @returns {object} any
 */
export function getFavoriteRecipes(userId) {
  return dispatch => axios.get(`/api/v1/user/${userId}/favorites`)
    .then((response) => {
      dispatch({
        type: GET_FAVORITE_RECIPE,
        payload: response.data,
      });
    });
}

/**
 *  @export {function}
 * @param {any} recipeId
 * @returns {object} any
 */
export function deleteFavorite(recipeId) {
  return dispatch => axios.delete(`/api/v1/favorites/${recipeId}/recipe`)
    .then((response) => {
      response.data.recipeId = recipeId;
      dispatch({
        type: DELETE_FAVORITE,
        payload: response.data,
      });
    });
}
