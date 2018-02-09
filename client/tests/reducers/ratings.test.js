import ratingsReducer from '../../reducers/ratingsReducer';
import mockData from '../mocks/ratingsData';
import {
  UPVOTE_RECIPE,
  DOWNVOTE_RECIPE,
  GET_UPVOTES,
  GET_DOWNVOTES,
} from '../../actions/types';

describe('Voting reducer', () => {
  it('stores and adds an upvote to the upvotes of a recipe', () => {
    const { upvoteResponse } = mockData;
    const initialState = {
      upvotes: {}
    }

    const payload = {
      vote: upvoteResponse.vote
    }

    const action = {
      type: UPVOTE_RECIPE,
      payload
    };

    const newState = ratingsReducer(initialState, action);
    expect(newState.upvotes).toEqual(action.payload.vote);
  });

  it('stores and adds a downvote to the downvotes of a recipe', () => {
    const { downvoteResponse } = mockData;
    const initialState = {
      downvotes: {}
    }

    const payload = {
      vote: downvoteResponse.vote
    }

    const action = {
      type: DOWNVOTE_RECIPE,
      payload
    };

    const newState = ratingsReducer(initialState, action);
    expect(newState.downvotes).toEqual(action.payload.vote);
  });

  it('stores current upvotes of a recipe', () => {
    const { allUpvotesResponse } = mockData;
    const initialState = {
      upvotes: {}
    }

    const payload = {
      votes: allUpvotesResponse.votes
    }

    const action = {
      type: GET_UPVOTES,
      payload
    };

    const newState = ratingsReducer(initialState, action);
    expect(newState.upvotes).toEqual(action.payload.votes);
  });

  it('stores current downvotes of a recipe', () => {
    const { allDownvotesResponse } = mockData;
    const initialState = {
      downvotes: {}
    }

    const payload = {
      votes: allDownvotesResponse.votes
    }

    const action = {
      type: GET_DOWNVOTES,
      payload
    };

    const newState = ratingsReducer(initialState, action);
    expect(newState.downvotes).toEqual(action.payload.votes);
  });

  it('return initial state when there\'s no action', () => {
    const initialState = {
      upvotes: {}
    }

    const action = {
      type: 'NOTHING'
    };

    const newState = ratingsReducer(initialState, action);
    expect(newState.upvotes).toEqual({});
  });

  it('return current state when there\'s no state', () => {
    const { downvoteResponse } = mockData;
    const initialState = {
      downvotes: {}
    }

    const payload = {
      vote: downvoteResponse.vote
    }

    const action = {
      type: DOWNVOTE_RECIPE,
      payload
    };

    const newState = ratingsReducer(undefined, action);
    expect(newState.downvotes).toEqual(undefined);
  });
});
