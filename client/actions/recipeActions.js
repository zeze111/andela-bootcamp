import axios from 'axios';

import { CREATE_RECIPE } from './types';

export function addRecipeRequest(recipeData) {
  return (dispatch) => {
    return axios.post('/api/v1/recipes', recipeData)
      .then(response => {
        dispatch({
          type: CREATE_RECIPE,
          payload: response,
        });
      });
  };
}
