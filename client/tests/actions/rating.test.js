import mockData from '../mocks/ratingsData';
import {
  upvoteRecipe,
  downvoteRecipe,
  getDownvotes,
  getUpvotes
} from '../../actions/ratingActions';
import {
  UPVOTE_RECIPE,
  DOWNVOTE_RECIPE,
  GET_DOWNVOTES,
  GET_UPVOTES,
  UPVOTE_RECIPE_FAILURE,
  DOWNVOTE_RECIPE_FAILURE,
  GET_UPVOTES_FAILURE,
  GET_DOWNVOTES_FAILURE,
  UPDATE_RECIPE
} from '../../actions/types';
import mockLocalStorage from '../mocks/localStorage';


window.localStorage = mockLocalStorage;

describe('Voting actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('upvotes a recipe', async (done) => {
    const { upvoteResponse } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${2}/upvote`, {
      status: 201,
      response: upvoteResponse
    });

    const expectedActions = [{
      type: UPVOTE_RECIPE,
      payload: upvoteResponse
    }];
    const store = mockStore({});
    await store.dispatch(upvoteRecipe(2))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('catches an error for upvoting a recipe', async (done) => {
    const { votingError } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${5}/upvote`, {
      status: 404,
      response: votingError
    });
    const expectedActions = [{
      type: UPVOTE_RECIPE_FAILURE,
      payload: votingError
    }];
    const store = mockStore({});
    await store.dispatch(upvoteRecipe(5))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('downvotes a recipe', async (done) => {
    const { downvoteResponse } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${2}/downvote`, {
      status: 200,
      response: downvoteResponse
    });

    const expectedActions = [{
      type: DOWNVOTE_RECIPE,
      payload: downvoteResponse
    }];
    const store = mockStore({});
    await store.dispatch(downvoteRecipe(2))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('catches an error for downvoting a recipe', async (done) => {
    const { votingError } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${5}/downvote`, {
      status: 404,
      response: votingError
    });
    const expectedActions = [{
      type: DOWNVOTE_RECIPE_FAILURE,
      payload: votingError
    }];
    const store = mockStore({});
    await store.dispatch(downvoteRecipe(5))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('gets the total upvotes for a recipe', async (done) => {
    const { allUpvotesResponse } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${2}/upvotes`, {
      status: 200,
      response: allUpvotesResponse
    });
    const expectedActions = [{
      type: GET_UPVOTES,
      payload: allUpvotesResponse
    }];
    const store = mockStore({});
    await store.dispatch(getUpvotes(2))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('gets the total downvotes for a recipe', async (done) => {
    const { allDownvotesResponse } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${2}/downvotes`, {
      status: 200,
      response: allDownvotesResponse
    });
    const expectedActions = [{
      type: GET_DOWNVOTES,
      payload: allDownvotesResponse
    }];
    const store = mockStore({});
    await store.dispatch(getDownvotes(2))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
