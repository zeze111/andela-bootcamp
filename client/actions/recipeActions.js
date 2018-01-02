import axios from 'axios';
import FormData from 'form-data';

import {
  CREATE_RECIPE, GET_USER_RECIPES, GET_ALL_RECIPES, DELETE_RECIPE,
  UPDATE_RECIPE, GET_RECIPE,
} from './types';

function addRecipe(recipeData, cloudUrl) {
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
      image: cloudUrl,
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
    let cloudUrl = 'http://res.cloudinary.com/zeze-andela/image/upload/v1513857342/noimg_mhvbu1.png';
    if (recipeData.imageFile.name != null) {
      const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/zeze-andela/image/upload';
      const CLOUDINARY_UPLOAD_PRESET = 'oenu8grd';

      const formData = new FormData();
      formData.append('file', recipeData.imageFile);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      delete axios.defaults.headers.common['x-token'];
      return axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        data: formData,
      })
        .then((response) => {
          cloudUrl = response.data.secure_url;
          dispatch(addRecipe(recipeData, cloudUrl));
        })
        .catch((error) => {
          dispatch(error);
        });
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
