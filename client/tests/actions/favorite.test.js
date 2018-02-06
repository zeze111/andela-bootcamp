import mockData from '../mocks/favoritesData';
import {
  favoriteRecipe,
  getFavoriteRecipes,
  deleteFavorite
} from '../../actions/favoriteActions';
import {
  FAVORITE_RECIPE,
  GET_FAVORITE_RECIPE,
  DELETE_FAVORITE,
  FAVORITE_RECIPE_FAILURE,
  GET_FAVORITE_RECIPE_FAILURE,
  DELETE_FAVORITE_FAILURE
} from '../../actions/types';
import mockLocalStorage from '../mocks/localStorage';


window.localStorage = mockLocalStorage;

describe('Favorites actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('adds a recipe to user\'s favorites', async (done) => {
    const { favoriteResponse} = mockData;
    moxios.stubRequest(`/api/v1/recipes/${2}/favorite`, {
      status: 201,
      response: favoriteResponse
    });

    const expectedActions = [{
      type: FAVORITE_RECIPE,
      payload: favoriteResponse
    }];
    const store = mockStore({});
    await store.dispatch(favoriteRecipe(2))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('catches an error for adding a recipe to favorites', async (done) => {
    const { favoriteError } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${5}/favorite`, {
      status: 404,
      response: favoriteError
    });
    const expectedActions = [{
      type: FAVORITE_RECIPE_FAILURE,
      payload: favoriteError
    }];
    const store = mockStore({});
    await store.dispatch(favoriteRecipe(5))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('gets all favorites for a user', async (done) => {
    const { allFavoritesResponse } = mockData;
    moxios.stubRequest(`/api/v1/user/favorites?limit=${3}&offset=${0}`, {
      status: 200,
      response: allFavoritesResponse
    });
    const expectedActions = [{
      type: GET_FAVORITE_RECIPE,
      payload: allFavoritesResponse
    }];
    const store = mockStore({});
    await store.dispatch(getFavoriteRecipes(3, 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('deletes a recipe from user\'s favorites', async (done) => {
    const { deleteFavoriteResponse } = mockData;
    moxios.stubRequest(`/api/v1/user/favorites/${2}`, {
      status: 200,
      response: deleteFavoriteResponse
    });
    const expectedActions = [{
      type: DELETE_FAVORITE,
      payload: deleteFavoriteResponse
    }];
    const store = mockStore({});
    await store.dispatch(deleteFavorite(2))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('catches an error for deleting a recipe from favorites', async (done) => {
    const { favoriteError } = mockData;
    moxios.stubRequest(`/api/v1/user/favorites/${5}`, {
      status: 404,
      response: favoriteError
    });
    const expectedActions = [{
      type: DELETE_FAVORITE_FAILURE,
      payload: favoriteError
    }];
    const store = mockStore({});
    await store.dispatch(deleteFavorite(5))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
