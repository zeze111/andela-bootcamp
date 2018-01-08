import { REVIEW_RECIPE, GET_REVIEWS, DELETE_REVIEW } from '../actions/types';

const initialState = { reviews: [], message: '' };

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case REVIEW_RECIPE:
      return {
        ...state,
        reviews: [...state.reviews, action.payload.review],
      };
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload.reviews,
      };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews,
        message: action.payload.message,
      };
    default: return state;
  }
};
