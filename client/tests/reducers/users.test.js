import auth from '../../reducers/auth';
import mockData from '../mocks/userData';
import {
  SET_CURRENT_USER,
  UPDATE_USER,
  GET_USER,
  UPDATE_RECIPE
} from '../../actions/types';

describe('Users reducer', () => {
  it('stores user when a user signs up / signs in', () => {
    const { signUpresponse } = mockData;
    const initialState = {
      isAuthenticated: false,
      user: {}
    }
    const { email, id, firstName } = signUpresponse.user;
    const user = { email, id, firstName };

    const action = {
      type: SET_CURRENT_USER,
      user: signUpresponse.user
    };

    const newState = auth(initialState, action);
    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.user).toEqual(action.user);
  });

  it('updates stored user when details are updated', () => {
    const { updateResponse } = mockData;
    const initialState = {
      profile: {},
      message: ''
    }

    const payload = {
      user: updateResponse.user,
      message: updateResponse.message
    }

    const action = {
      type: UPDATE_USER,
      payload
    };

    const newState = auth(initialState, action);
    expect(newState.message).toEqual(action.payload.message);
    expect(newState.profile).toEqual(action.payload.user);
  });

  it('updates profile to store current user\'s details', () => {
    const { userProfileResponse } = mockData;
    const initialState = {
      profile: {},
    }

    const payload = {
      profile: userProfileResponse.user
    }

    const action = {
      type: GET_USER,
      payload
    };

    const newState = auth(initialState, action);
    expect(newState.profile).toEqual(action.payload.user);
  });

  it('return initial state when there\'s no action', () => {
    const initialState = {
      user: {}
    }

    const action = {};

    const newState = auth();
    expect(newState.user).toEqual({});
  });
});
