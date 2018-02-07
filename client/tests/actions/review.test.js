import mockData from '../mocks/reviewData';
import {
  reviewRecipe,
  getReviews,
  deleteReview
} from '../../actions/reviewActions';
import {
  REVIEW_RECIPE,
  GET_REVIEWS,
  DELETE_REVIEW,
  REVIEW_RECIPE_FAILURE,
  GET_REVIEWS_FAILURE,
  DELETE_REVIEW_FAILURE
} from '../../actions/types';
import mockLocalStorage from '../mocks/localStorage';


window.localStorage = mockLocalStorage;

describe('Review actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('adds a review for a recipe', async (done) => {
    const { reviewData, reviewResponse } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${2}/review`, {
      status: 201,
      response: reviewResponse
    });

    const expectedActions = [{
      type: REVIEW_RECIPE,
      payload: reviewResponse
    }];
    const store = mockStore({});
    await store.dispatch(reviewRecipe(2, reviewData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('catches an error for reviewing a recipe', async (done) => {
    const { reviewData, reviewError } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${5}/review`, {
      status: 404,
      response: reviewError
    });
    const expectedActions = [{
      type: REVIEW_RECIPE_FAILURE,
      payload: reviewError
    }];
    const store = mockStore({});
    await store.dispatch(reviewRecipe(5))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('gets all the reviews for a recipe', async (done) => {
    const { allReviewsResponse } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${2}/reviews?limit=${3}&offset=${0}`, {
      status: 200,
      response: allReviewsResponse
    });
    const expectedActions = [{
      type: GET_REVIEWS,
      payload: allReviewsResponse
    }];
    const store = mockStore({});
    await store.dispatch(getReviews(2, 3, 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('deletes the review for a recipe', async (done) => {
    const { deleteReviewResponse } = mockData;
    moxios.stubRequest(`/api/v1/recipe/reviews/${12}`, {
      status: 200,
      response: deleteReviewResponse
    });
    const expectedActions = [{
      type: DELETE_REVIEW,
      payload: 12
    }];
    const store = mockStore({});
    await store.dispatch(deleteReview(12))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('catches an error for deleting a review', async (done) => {
    const { reviewError } = mockData;
    moxios.stubRequest(`/api/v1/recipe/reviews/${5}`, {
      status: 404,
      response: reviewError
    });
    const expectedActions = [{
      type: DELETE_REVIEW_FAILURE,
      payload: reviewError
    }];
    const store = mockStore({});
    await store.dispatch(deleteReview(5))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('catches a server error', async (done) => {
    const { reviewServerError } = mockData;
    moxios.stubRequest('/api/v1/recipes/3/reviews?limit=5&offset=0', {
      status: 500,
      response: reviewServerError.message
    });
    const expectedActions = [{
      type: GET_REVIEWS_FAILURE,
      payload: reviewServerError.message
    }];
    const store = mockStore({});
    await store.dispatch(getReviews(3, 5, 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
