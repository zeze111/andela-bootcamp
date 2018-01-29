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
        message: action.payload.message,
      };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(review => review.id !== action.payload),
      };
    default: return state;
  }
};
