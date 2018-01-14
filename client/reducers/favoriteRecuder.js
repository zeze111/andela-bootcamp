import {
  FAVORITE_RECIPE, GET_FAVORITE_RECIPE, DELETE_FAVORITE
} from '../actions/types';

const initialState = { message: '', favorites: [], delMessage: '' };

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FAVORITE_RECIPE:
      return {
        ...state,
        ...state.favorites,
        favorites: [...state.favorites, action.payload.favorite],
        message: action.payload.message,
      };
    case GET_FAVORITE_RECIPE:
      return {
        ...state,
        favorites: action.payload.favorites,
        message: action.payload.message,
      };
    case DELETE_FAVORITE:
      return {
        ...state,
        delMessage: action.payload.message,
        favorites: state.favorites.filter(favorite => favorite.id !== action.payload.recipeId),
      };
    default: return state;
  }
};
