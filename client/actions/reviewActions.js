import axios from 'axios';
import { REVIEW_RECIPE, GET_REVIEWS, DELETE_REVIEW } from './types';

export function reviewRecipe(recipeId, review) {
  return dispatch => axios.post(`/api/v1/recipes/${recipeId}/review`, review)
    .then((response) => {
      dispatch({
        type: REVIEW_RECIPE,
        payload: response.data,
      });
    });
}

export function getReviews(recipeId) {
  return dispatch => axios.get(`/api/v1/recipes/${recipeId}/reviews`)
    .then((response) => {
      dispatch({
        type: GET_REVIEWS,
        payload: response.data,
      });
    });
}

export function deleteReview(reviewId) {
  return dispatch => axios.delete(`/api/v1/recipes/${reviewId}/review`)
    .then((response) => {
      dispatch({
        type: DELETE_REVIEW,
        payload: response.data,
      });
    });
}
