import {
  CREATE_RECIPE, GET_USER_RECIPES, GET_ALL_RECIPES, DELETE_RECIPE,
  UPDATE_RECIPE, GET_RECIPE,
} from '../actions/types';

const initialState = { recipes: [], currentRecipe: {}, message: '' };

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
        message: action.payload.message,
      };
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload.recipes,
      };
    case GET_RECIPE:
      return {
        ...state,
        currentRecipe: action.payload.recipe,
      };
    case UPDATE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload.recipe],
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes,
      };
    default: return state;
  }
};
