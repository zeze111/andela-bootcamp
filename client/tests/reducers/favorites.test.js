import favoriteReducer from '../../reducers/favoriteReducer';
import mockData from '../mocks/favoritesData';
import {
  FAVORITE_RECIPE,
  GET_FAVORITE_RECIPE,
  DELETE_FAVORITE,
} from '../../actions/types';

describe('Favorites reducer', () => {
  it('stores and adds a recipe to a favorites list', () => {
    const { favoriteResponse } = mockData;
    const initialState = {
      favorites: [],
      message: ''
    }

    const payload = {
      favorite: favoriteResponse.favorite,
      message: favoriteResponse.message
    }

    const action = {
      type: FAVORITE_RECIPE,
      payload
    };

    const newState = favoriteReducer(initialState, action);
    expect(newState.message).toEqual(action.payload.message);
    expect(newState.favorites).toEqual(
      expect.arrayContaining([action.payload.favorite])
    );
  });

  it('stores current paginated recipes in a favorites list', () => {
    const { allFavoritesResponse } = mockData;
    const initialState = {
      favorites: [],
      message: '',
      pagination: {}
    }

    const payload = {
      favorites: allFavoritesResponse.favorites,
      message: allFavoritesResponse.message,
      pagination: allFavoritesResponse.pagination
    }

    const action = {
      type: GET_FAVORITE_RECIPE,
      payload
    };

    const newState = favoriteReducer(initialState, action);
    expect(newState.message).toEqual(action.payload.message);
    expect(newState.favorites).toEqual(
      expect.arrayContaining(action.payload.favorites)
    );
    expect(newState.pagination).toEqual(action.payload.pagination);
  });

  it('removes current deleted recipe from favorites list', () => {
    const { favoriteResponse, allFavoritesResponse } = mockData;
    const initialState = {
      favorites: [ allFavoritesResponse.favorites ]
    }

    const action = {
      type: DELETE_FAVORITE,
      payload: favoriteResponse.favorite.recipeId
    };

    const newState = favoriteReducer(initialState, action);
    expect(newState.favorites).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: action.payload })
      ])
    );
  });

  it('return initial state when there\'s no action', () => {
    const initialState = {
      favorites: []
    }

    const action = {
      type: 'NOTHING'
    };

    const newState = favoriteReducer(initialState, action);
    expect(newState.favorites).toEqual([]);
  });

  it('return current state when there\'s no state', () => {
    const { favoriteResponse, allFavoritesResponse } = mockData;
    const initialState = {
      favorites: [ allFavoritesResponse.favorites ]
    }

    const action = {
      type: DELETE_FAVORITE,
      payload: favoriteResponse.favorite.recipeId
    };

    const newState = favoriteReducer(undefined, action);
    expect(newState.favorites).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining(undefined)
      ])
    );
  });
});
