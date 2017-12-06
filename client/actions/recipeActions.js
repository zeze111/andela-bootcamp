import axios from 'axios';

import { CREATE_RECIPE, GET_USER_RECIPES, GET_ALL_RECIPES } from './types';


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
