import axios from 'axios';
import uploadImageToCloud from '../utils/image';

import {
  CREATE_RECIPE, GET_USER_RECIPES, GET_ALL_RECIPES, DELETE_RECIPE,
  UPDATE_RECIPE, GET_RECIPE,
} from './types';

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
      });
  };
}

export function addRecipeRequest(recipeData) {
  return (dispatch) => {
    const cloudUrl = 'http://res.cloudinary.com/zeze-andela/image/upload/v1513857342/noimg_mhvbu1.png';
    if (recipeData.imageFile.name) {
      return uploadImageToCloud(recipeData.imageFile)
        .then((response) => {
          const imageUrl = response.data.secure_url;
          dispatch(addRecipe(recipeData, imageUrl));
        })
        .catch(error => console.log(error));
    }
    return dispatch(addRecipe(recipeData, cloudUrl));
  };
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
