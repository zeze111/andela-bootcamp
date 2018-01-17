import axios from 'axios';
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
  MOST_UPVOTED_RECIPES
} from './types';

/**
 * @export {function}
 * @param {any} recipeData
 * @param {any} imageUrl
 * @returns {object} any
 */
export function addRecipe(recipeData, imageUrl) {
  return (dispatch) => {
    axios.defaults.headers.common['x-token'] = window.localStorage.jwtToken;
    const {
      name, prepTime, description, type, ingredients, instructions,
    } = recipeData;
    const recipe = {
      name,
      prepTime,
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
      })
      .catch((error) => {
        return error;
      });
  };
}

/**
 * @export {function}
 * @param {any} recipeData
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
        .catch((error) => {
          return error;
        });
    }
    return dispatch(addRecipe(recipeData, cloudUrl));
  };
}

/**
 * @export {function}
 * @returns {object} any
 */
export function getAllRecipes() {
  return dispatch => axios.get('/api/v1/recipes')
    .then((response) => {
      dispatch({
        type: GET_ALL_RECIPES,
        payload: response.data,
      });
    });
}

/**
 * @export {function}
 * @param {any} userId
 * @returns {object} any
 */
export function getUserRecipes(userId) {
  return dispatch => axios.get(`/api/v1/user/${userId}/recipes`)
    .then((response) => {
      dispatch({
        type: GET_USER_RECIPES,
        payload: response.data,
      });
    });
}

/**
 * @export {function}
 * @param {any} recipeId
 * @returns {object} any
 */
export function getARecipe(recipeId) {
  return dispatch => axios.get(`/api/v1/recipes/${recipeId}`)
    .then((response) => {
      dispatch({
        type: GET_RECIPE,
        payload: response.data,
      });
    });
}

/**
 * @export {function}
 * @param {any} recipeId
 * @param {any} recipeData
 * @returns {object} any
 */
export function updateRecipe(recipeId, recipeData) {
  return dispatch => axios.put(`/api/v1/recipes/${recipeId}`, recipeData)
    .then((response) => {
      dispatch({
        type: UPDATE_RECIPE,
        payload: response.data,
      });
    });
}

/**
 * @export {function}
 * @param {any} recipeId
 * @returns {object} any
 */
export function deleteRecipe(recipeId) {
  return dispatch => axios.delete(`/api/v1/recipes/${recipeId}`)
    .then(() => {
      dispatch({
        type: DELETE_RECIPE,
        payload: recipeId,
      });
    });
}

/**
 * @export {function}
 * @param {any} type
 * @returns {object} any
 */
export function getRecipeCategory(type) {
  return dispatch => axios.get(`/api/v1/recipes/?type=${type}`)
    .then((response) => {
      dispatch({
        type: GET_RECIPES_CATEGORY,
        payload: response.data,
      });
    });
}

/**
 * @export {function}
 * @param {any} word
 * @returns {object} any
 */
export function searchRecipe(word) {
  return dispatch => axios.get(`/api/v1/recipes/?search=${word}`)
    .then((response) => {
      dispatch({
        type: SEARCH_RECIPE,
        payload: response.data,
      });
    });
}

/**
 * @export {function}
 * @param {any} word
 * @returns {object} any
 */
export function getMostUpvotedRecipe() {
  return dispatch => axios.get('/api/v1/recipes/?sort=upvotes&order=des')
    .then((response) => {
      dispatch({
        type: MOST_UPVOTED_RECIPES,
        payload: response.data,
      });
    });
}
