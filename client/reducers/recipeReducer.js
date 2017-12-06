import { CREATE_RECIPE, GET_USER_RECIPES, GET_ALL_RECIPES } from '../actions/types';

const initialState = { recipes: [], currentRecipe: {} };

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload.recipe],
      };
    case GET_USER_RECIPES:
      return {
        ...state,
        recipes: action.payload.recipes,
      };
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload.recipes,
      };
    default: return state;
  }
};

