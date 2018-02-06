import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import uploadImageToCloud from '../utils/image';
import {
  CREATE_RECIPE,
  GET_USER_RECIPES,
  GET_ALL_RECIPES,
  DELETE_RECIPE,
  UPDATE_RECIPE,
  GET_RECIPE,
  GET_RECIPES_CATEGORY,
  SEARCH_RECIPE,
  GET_PAGED_RECIPES,
  MOST_UPVOTED_RECIPES,
  GET_ALL_RECIPES_FAILURE,
  GET_PAGED_RECIPES_FAILURE,
  GET_USER_RECIPES_FAILURE,
  GET_RECIPE_FAILURE,
  UPDATE_RECIPE_FAILURE,
  GET_RECIPES_CATEGORY_FAILURE,
  SEARCH_RECIPE_FAILURE,
  MOST_UPVOTED_RECIPES_FAILURE,
  DELETE_RECIPE_FAILURE
} from './types';

/** makes api call to add a new recipe
 *
 * @export {function}
 *
 * @param {object} recipeData form data
 *
 * @param {string} imageUrl
 *
 * @returns {object} any
 */
export function addRecipe(recipeData, imageUrl) {
  return (dispatch) => {
    setAuthorizationToken(window.localStorage.jwtToken);
    const {
      name, preparationTime, description, type, ingredients, instructions,
    } = recipeData;
    const recipe = {
      name,
      preparationTime,
      description,
      type,
      ingredients,
      instructions,
      image: imageUrl,
    };

    return axios.post('/api/v1/recipes', recipe)
      .then((response) => {
        dispatch({
          type: CREATE_RECIPE,
          payload: response.data,
        });
      });
  };
}

/** uploads recipe image to cloudinary and calls addRecipe function
 *
 * @export {function}
 *
 * @param {object} recipeData form data
 *
 * @returns {object} any
 */
export function addRecipeRequest(recipeData) {
  return (dispatch) => {
    const cloudUrl = 'http://res.cloudinary.com/zeze-andela/image/upload/v1513857342/noimg_mhvbu1.png';
    if (recipeData.imageFile.name) {
      return uploadImageToCloud(recipeData.imageFile)
        .then((response) => {
          const imageUrl = response.data.secure_url;
          dispatch(addRecipe(recipeData, imageUrl));
        })
        .catch(error => error);
    }
    return dispatch(addRecipe(recipeData, cloudUrl));
  };
}

/** makes api call to get all recipes from the database
 *
 * @export {function}
 *
 * @returns {object} any
 */
export function getAllRecipes() {
  return dispatch => axios.get('/api/v1/recipes')
    .then((response) => {
      dispatch({
        type: GET_ALL_RECIPES,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_ALL_RECIPES_FAILURE,
        payload: error.response.data,
      });
    });
}

/** makes makes api call to get all recipes with pagination from the database
 *
 * @export {function}
 *
 * @param {number} limit
 *
 * @param {number} offset
 *
 * @returns {object} any
 */
export function getPaginatedRecipes(limit, offset) {
  return dispatch =>
    axios.get(`/api/v1/recipes/?limit=${limit}&offset=${offset}`)
      .then((response) => {
        dispatch({
          type: GET_PAGED_RECIPES,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_PAGED_RECIPES_FAILURE,
          payload: error.response.data,
        });
      });
}

/** makes api call to get all recipes submitted by a user
 *
 * @param {number} limit
 *
 * @param {number} offset
 *
 * @export {function}
 *
 * @returns {object} any
 */
export function getUserRecipes(limit, offset) {
  return dispatch =>
    axios.get(`/api/v1/user/recipes?limit=${limit}&offset=${offset}`)
      .then((response) => {
        dispatch({
          type: GET_USER_RECIPES,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_USER_RECIPES_FAILURE,
          payload: error.response.data,
        });
      });
}

/** makes api call to get a single recipe
 * @export {function}
 *
 * @param {number} recipeId
 *
 * @returns {object} any
 */
export function getARecipe(recipeId) {
  return dispatch => axios.get(`/api/v1/recipes/${recipeId}`)
    .then((response) => {
      dispatch({
        type: GET_RECIPE,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_RECIPE_FAILURE,
        payload: error.response.data,
      });
    });
}

/** makes api call to update a recipe
 *
 * @export {function}
 *
 * @param {number} recipeId
 *
 * @param {object} recipeData form data
 *
 * @returns {object} any
 */
export function updateRecipe(recipeId, recipeData) {
  return dispatch => axios.put(`/api/v1/recipes/${recipeId}`, recipeData)
    .then((response) => {
      dispatch({
        type: UPDATE_RECIPE,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_RECIPE_FAILURE,
        payload: error.response.data,
      });
    });
}

/** makes api call to delete a user's recipe
 *
 * @export {function}
 *
 * @param {number} recipeId
 *
 * @returns {object} any
 */
export function deleteRecipe(recipeId) {
  return dispatch => axios.delete(`/api/v1/recipes/${recipeId}`)
    .then(() => {
      dispatch({
        type: DELETE_RECIPE,
        payload: recipeId,
      });
    })
    .catch((error) => {
      dispatch({
        type: DELETE_RECIPE_FAILURE,
        payload: error.response.data,
      });
    });
}

/** makes api call to get all recipes matching a category type
 *
 * @export {function}
 *
 * @param {string} type category type
 *
 * @param {number} limit
 *
 * @param {number} offset
 *
 * @returns {object} any
 */
export function getRecipeCategory(type, limit, offset) {
  return dispatch =>
    axios.get(`/api/v1/recipes/categories/${type}?limit=${limit}&offset=${offset}`)
      .then((response) => {
        dispatch({
          type: GET_RECIPES_CATEGORY,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_RECIPES_CATEGORY_FAILURE,
          payload: error.response.data,
        });
      });
}

/** makes api call to search for a recipe match
 *
 * @export {function}
 *
 * @param {string} word search word
 *
 * @param {number} limit
 *
 * @param {number} offset
 *
 * @returns {object} any
 */
export function searchRecipe(word, limit, offset) {
  return dispatch =>
    axios.get(`/api/v1/recipes/search/${word}?limit=${limit}&offset=${offset}`)
      .then((response) => {
        dispatch({
          type: SEARCH_RECIPE,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: SEARCH_RECIPE_FAILURE,
          payload: error.response.data,
        });
      });
}

/** makes api call to get most upvoted recipes
 *
 * @export {function}
 *
 * @returns {object} any
 */
export function getMostUpvotedRecipe() {
  return dispatch => axios.get('/api/v1/recipes/?sort=upvotes&order=des')
    .then((response) => {
      dispatch({
        type: MOST_UPVOTED_RECIPES,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: MOST_UPVOTED_RECIPES_FAILURE,
        payload: error.response.data,
      });
    });
}
