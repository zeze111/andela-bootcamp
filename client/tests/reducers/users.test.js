import auth from '../../reducers/auth';
import mockData from '../mocks/userData';
import {
  SET_CURRENT_USER,
  UPDATE_USER,
  GET_USER,
  UPDATE_RECIPE,
  CHANGE_PASSWORD
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

  it('updates user\'s password', () => {
    const { updatePassword, passwordResponse } = mockData;
    const initialState = {
      profile: {},
      message: ''
    }

    const payload = {
      profile: passwordResponse.user,
      message: passwordResponse.message
    }

    const action = {
      type: CHANGE_PASSWORD,
      payload
    };

    const newState = auth(initialState, action);
    expect(newState.profile).toEqual(action.payload.user);
  });

  it('return initial state when there\'s no valid action', () => {
    const initialState = {
      user: {}
    }

    const action = {
      type: 'NOTHING'
    };

    const newState = auth(initialState, action);
    expect(newState.user).toEqual({});
  });

  it('return current state when there\'s no state', () => {
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

    const newState = auth(undefined, action);
    expect(newState.profile).toEqual(undefined);
  });
});
