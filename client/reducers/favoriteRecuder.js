import {
  FAVORITE_RECIPE,
  GET_FAVORITE_RECIPE,
  DELETE_FAVORITE,
  FAVORITE_RECIPE_FAILURE
} from '../actions/types';

const initialState = { message: '', favorites: [], pagination: {} };

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FAVORITE_RECIPE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload.favorite],
        message: action.payload.message,
      };
    case FAVORITE_RECIPE_FAILURE:
      return {
        ...state,
        message: action.payload.message,
        color: 'red'
      };
    case GET_FAVORITE_RECIPE:
      return {
        ...state,
        favorites: action.payload.favorites,
        pagination: action.payload.pagination,
        message: action.payload.message
      };
    case DELETE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(favorite => favorite.id !== action.payload.recipeId),
      };
    default: return state;
  }
};
