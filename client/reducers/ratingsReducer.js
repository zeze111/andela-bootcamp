import {
  UPVOTE_RECIPE,
  DOWNVOTE_RECIPE,
  GET_UPVOTES,
  GET_DOWNVOTES,
} from '../actions/types';

const initialState = { upvotes: {}, downvotes: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case UPVOTE_RECIPE:
      return {
        ...state,
        upvotes: action.payload.vote,
      };
    case DOWNVOTE_RECIPE:
      return {
        ...state,
        downvotes: action.payload.vote,
      };
    case GET_UPVOTES:
      return {
        ...state,
        upvotes: action.payload.votes,
      };
    case GET_DOWNVOTES:
      return {
        ...state,
        downvotes: action.payload.votes,
      };
    default: return state;
  }
};
