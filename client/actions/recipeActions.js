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
    setAuthorizationToken(window.localStorage.jwtToken);
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
      .catch(error => error);
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
        .catch(error => error);
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
 * @param {any} limit
 * @param {any} offset
 * @export {function}
 * @returns {object} any
 */
export function getPaginatedRecipes(limit, offset) {
  return dispatch => axios.get(`/api/v1/recipes/?limit=${limit}&offset=${offset}`)
    .then((response) => {
      dispatch({
        type: GET_PAGED_RECIPES,
        payload: response.data,
      });
    });
}

/**
 * @param {any} limit
 * @param {any} offset
 * @export {function}
 * @returns {object} any
 */
export function getUserRecipes(limit, offset) {
  return dispatch => axios.get(`/api/v1/user/recipes?limit=${limit}&offset=${offset}`)
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
 * @param {any} limit
 * @param {any} offset
 * @returns {object} any
 */
export function getRecipeCategory(type, limit, offset) {
  return dispatch => axios.get(`/api/v1/recipes/categories/${type}?limit=${limit}&offset=${offset}`)
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
 * @param {any} limit
 * @param {any} offset
 * @returns {object} any
 */
export function searchRecipe(word, limit, offset) {
  return dispatch => axios.get(`/api/v1/recipes/search/${word}?limit=${limit}&offset=${offset}`)
    .then((response) => {
      dispatch({
        type: SEARCH_RECIPE,
        payload: response.data,
      });
    });
}

/**
 * @export {function}
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
