import mockData from './mocks/userData';
import {
  signIn,
  signout
} from '../actions/signinActions';
import { signUp } from '../actions/signupActions';
import { SET_CURRENT_USER } from '../actions/types';
import mockLocalStorage from './mocks/localStorage';


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
    const user = {email, id, firstName};
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
    const user = {email, id, firstName};
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

  // it('gets a user details', async (done) => {
  //   const { userProfileResponse } = mockData;
  //   moxios.stubRequest('/api/v1/users/12/profile', {
  //     status: 200,
  //     response: userProfileResponse
  //   });

  //   const {
  //     user: {
  //       userId,
  //       name,
  //       username,
  //       email,
  //       imageUrl,
  //       myRecipes,
  //       myReviews,
  //       myFavs
  //     }
  //   } = userProfileResponse;

  //   const expectedActions = [{
  //     type: SET_USER_PROFILE,
  //     user: {
  //       userId,
  //       name,
  //       username,
  //       email,
  //       imageUrl,
  //       myRecipes,
  //       myReviews,
  //       myFavs
  //     }
  //   }];
  //   const store = mockStore({});
  //   await store.dispatch(getUser(12))
  //     .then(() => {
  //       expect(store.getActions()).toEqual(expectedActions);
  //     });
  //   done();
  // });
});
