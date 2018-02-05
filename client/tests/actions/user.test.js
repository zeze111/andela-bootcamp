import jwt from 'jsonwebtoken';

import mockData from '../mocks/userData';
import {
  signIn,
  signout
} from '../..//actions/signinActions';
import { signUp } from '../../actions/signupActions';
import {
  getUser,
  updateUser
} from '../../actions/userActions';
import {
  SET_CURRENT_USER,
  GET_USER,
  GET_USER_FAILURE,
  UPDATE_USER,
  UPDATE_USER_FAILURE
} from '../../actions/types';
import mockLocalStorage from '../mocks/localStorage';


window.localStorage = mockLocalStorage;

describe('Authentication actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('signs up a new user', async (done) => {
    const { signUpData, signUpresponse } = mockData;
    moxios.stubRequest('/api/v1/users/signup', {
      status: 200,
      response: signUpresponse
    });
    const { email, id, firstName } = signUpresponse.user;
    const user = { email, id, firstName };
    const expectedActions = [{
      type: SET_CURRENT_USER,
      user
    }];
    const store = mockStore({});
    await store.dispatch(signUp(signUpData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('signs in a user', async (done) => {
    const { signInData, signInResponse } = mockData;
    moxios.stubRequest('/api/v1/users/signin', {
      status: 200,
      response: signInResponse
    });
    const { email, id, firstName } = signInResponse.user;
    const user = { email, id, firstName };
    const expectedActions = [{
      type: SET_CURRENT_USER,
      user
    }];
    const store = mockStore({});
    await store.dispatch(signIn(signInData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('signs out a user', async (done) => {
    const expectedActions = [{
      type: SET_CURRENT_USER,
      user: undefined
    }];
    const store = mockStore({});
    store.dispatch(signout());
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('gets a user details', async (done) => {
    const { userProfileResponse } = mockData;
    moxios.stubRequest('/api/v1/users/2', {
      status: 200,
      response: userProfileResponse
    });

    const { email, id, firstName } = userProfileResponse.user;
    const user = { email, id, firstName };
    const expectedActions = [
      {
        type: SET_CURRENT_USER,
        user
      },
      {
        type: GET_USER,
        payload: userProfileResponse
      }
    ];
    const store = mockStore({});
    await store.dispatch(getUser(2))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('catches an error for getting a user details', async (done) => {
    const { userError } = mockData;
    moxios.stubRequest('/api/v1/users/1', {
      status: 404,
      response: userError
    });

    const expectedActions = [
      {
        type: GET_USER_FAILURE,
        payload: userError
      }
    ];
    const store = mockStore({});
    await store.dispatch(getUser(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('updates a user details', async (done) => {
    const { updateResponse } = mockData;
    moxios.stubRequest('/api/v1/user/', {
      status: 200,
      response: updateResponse
    });

    const data = { surname: "Somebody" };
    const user = jwt.decode(updateResponse.token);
    const expectedActions = [
      {
        type: SET_CURRENT_USER,
        user
      },
      {
        type: UPDATE_USER,
        payload: updateResponse
      }
    ];
    const store = mockStore({});
    await store.dispatch(updateUser(data))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('catches an error for updating a user details', async (done) => {
    const { userValidateError } = mockData;
    moxios.stubRequest('/api/v1/user/', {
      status: 422,
      response: userValidateError
    });

    const data = {};
    const expectedActions = [{
      type: UPDATE_USER_FAILURE,
      payload: userValidateError
    }];
    const store = mockStore({});
    await store.dispatch(updateUser(data))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});
