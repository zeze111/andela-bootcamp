import axios from 'axios';

import { CREATE_RECIPE, GET_USER_RECIPES, GET_ALL_RECIPES, DELETE_RECIPE,
  UPDATE_RECIPE, GET_RECIPE } from './types';

// if (axios.defaults.headers.common['x-token'] === '') {

// }

export function addRecipeRequest(recipeData) {
  return dispatch => axios.post('/api/v1/recipes', recipeData)
    .then((response) => {
      dispatch({
        type: CREATE_RECIPE,
        payload: response.data,
      });
    });
}

export function getAllRecipes() {
  return dispatch => axios.get('/api/v1/recipes')
    .then((response) => {
      dispatch({
        type: GET_ALL_RECIPES,
        payload: response.data,
      });
    });
}

export function getUserRecipes(userId) {
  return dispatch => axios.get(`/api/v1/user/${userId}/recipes`)
    .then((response) => {
      dispatch({
        type: GET_USER_RECIPES,
        payload: response.data,
      });
    });
}

export function getARecipe(recipeId) {
  return dispatch => axios.get(`/api/v1/recipes/${recipeId}`)
    .then((response) => {
      dispatch({
        type: GET_RECIPE,
        payload: response.data,
      });
    });
}

export function updateRecipe(recipeId, recipeData) {
  return dispatch => axios.put(`/api/v1/recipes/${recipeId}`, recipeData)
    .then((response) => {
      dispatch({
        type: UPDATE_RECIPE,
        payload: response.data,
      });
    });
}

export function deleteRecipe(recipeId) {
  return dispatch => axios.delete(`/api/v1/recipes/${recipeId}`)
    .then((response) => {
      dispatch({
        type: DELETE_RECIPE,
        payload: response.data,
      });
    });
}
