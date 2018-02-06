import reviewReducer from '../../reducers/reviewReducer';
import mockData from '../mocks/reviewData';
import {
  REVIEW_RECIPE,
  GET_REVIEWS,
  DELETE_REVIEW
} from '../../actions/types';

describe('Reviews reducer', () => {
  it('stores and adds a review to the reviews list of a recipe', () => {
    const { reviewResponse } = mockData;
    const initialState = {
      reviews: []
    }

    const payload = {
      review: reviewResponse.review
    }

    const action = {
      type: REVIEW_RECIPE,
      payload
    };

    const newState = reviewReducer(initialState, action);
    expect(newState.reviews).toEqual(
      expect.arrayContaining([action.payload.review])
    );
  });

  it('stores current paginated reviews in a reviews list', () => {
    const { allReviewsResponse } = mockData;
    const initialState = {
      reviews: [],
      message: '',
      pagination: {}
    }

    const payload = {
      reviews: allReviewsResponse.reviews,
      message: allReviewsResponse.message,
      pagination: allReviewsResponse.pagination
    }

    const action = {
      type: GET_REVIEWS,
      payload
    };

    const newState = reviewReducer(initialState, action);
    expect(newState.message).toEqual(action.payload.message);
    expect(newState.reviews).toEqual(
      expect.arrayContaining(action.payload.reviews)
    );
    expect(newState.pagination).toEqual(action.payload.pagination);
  });

  it('removes current deleted review from reviews list', () => {
    const { allReviewsResponse, reviewResponse } = mockData;
    const initialState = {
      reviews: [
        allReviewsResponse.reviews
      ]
    }

    const action = {
      type: DELETE_REVIEW,
      payload: reviewResponse.review.recipeId
    };

    const newState = reviewReducer(initialState, action);
    expect(newState.reviews).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: action.payload })
      ])
    );
  });

  it('return initial state when there\'s no action', () => {
    const initialState = {
      reviews: []
    }

    const action = {};

    const newState = reviewReducer();
    expect(newState.reviews).toEqual([]);
  });
});
