import mockData from '../mocks/recipeData';
import {
  addRecipeRequest,
  getAllRecipes,
  getARecipe,
  getMostUpvotedRecipe,
  getPaginatedRecipes,
  getRecipeCategory,
  getUserRecipes,
  updateRecipe,
  deleteRecipe,
  searchRecipe,
  getPopularRecipes
} from '../../actions/recipeActions';
import {
  CREATE_RECIPE,
  GET_USER_RECIPES,
  GET_ALL_RECIPES,
  DELETE_RECIPE,
  UPDATE_RECIPE,
  GET_RECIPE,
  GET_RECIPES_CATEGORY,
  SEARCH_RECIPE,
  GET_PAGED_RECIPES,
  DELETE_RECIPE_FAILURE,
  MOST_UPVOTED_RECIPES,
  GET_ALL_RECIPES_FAILURE,
  GET_PAGED_RECIPES_FAILURE,
  GET_USER_RECIPES_FAILURE,
  GET_RECIPE_FAILURE,
  UPDATE_RECIPE_FAILURE,
  GET_RECIPES_CATEGORY_FAILURE,
  SEARCH_RECIPE_FAILURE,
  MOST_UPVOTED_RECIPES_FAILURE,
  POPULAR_RECIPES
} from '../../actions/types';
import mockLocalStorage from '../mocks/localStorage';


window.localStorage = mockLocalStorage;

describe('Recipes actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('adds a new recipe', async (done) => {
    const { addRecipeResponse, recipeData } = mockData;
    moxios.stubRequest('/api/v1/recipes', {
      status: 201,
      response: addRecipeResponse
    });

    const expectedActions = [{
      type: CREATE_RECIPE,
      payload: addRecipeResponse
    }];
    const store = mockStore({});
    await store.dispatch(addRecipeRequest(recipeData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('adds another new recipe', async (done) => {
    const { addRecipeResponse2, recipeData2 } = mockData;
    moxios.stubRequest('/api/v1/recipes', {
      status: 201,
      response: addRecipeResponse2
    });

    const expectedActions = [{
      type: CREATE_RECIPE,
      payload: addRecipeResponse2
    }];
    const store = mockStore({});
    await store.dispatch(addRecipeRequest(recipeData2))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('gets all recipes', async (done) => {
    const { getAllRecipesResponse } = mockData;
    moxios.stubRequest('/api/v1/recipes', {
      status: 200,
      response: getAllRecipesResponse
    });
    const expectedActions = [{
      type: GET_ALL_RECIPES,
      payload: getAllRecipesResponse
    }];
    const store = mockStore({});
    await store.dispatch(getAllRecipes())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('gets all user recipes', async (done) => {
    const { getAllRecipesResponse } = mockData;
    moxios.stubRequest(`/api/v1/user/recipes?limit=${3}&offset=${0}`, {
      status: 200,
      response: getAllRecipesResponse
    });
    const expectedActions = [{
      type: GET_USER_RECIPES,
      payload: getAllRecipesResponse
    }];
    const store = mockStore({});
    await store.dispatch(getUserRecipes(3, 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('gets all recipes in pagination', async (done) => {
    const { getPagedRecipesResponse } = mockData;
    moxios.stubRequest(`/api/v1/recipes/?limit=${3}&offset=${0}`, {
      status: 200,
      response: getPagedRecipesResponse
    });
    const expectedActions = [{
      type: GET_PAGED_RECIPES,
      payload: getPagedRecipesResponse
    }];
    const store = mockStore({});
    await store.dispatch(getPaginatedRecipes(3, 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('gets most upvoted recipes', async (done) => {
    const { mostUpvotedResponse } = mockData;
    moxios.stubRequest('/api/v1/recipes/?sort=upvotes&order=des', {
      status: 200,
      response: mostUpvotedResponse
    });
    const expectedActions = [{
      type: MOST_UPVOTED_RECIPES,
      payload: mostUpvotedResponse
    }];
    const store = mockStore({});
    await store.dispatch(getMostUpvotedRecipe())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('gets most favorited recipes', async (done) => {
    const { mostUpvotedResponse } = mockData;
    moxios.stubRequest('/api/v1/recipes/favorites/?sort=favorites&order=des', {
      status: 200,
      response: mostUpvotedResponse
    });
    const expectedActions = [{
      type: POPULAR_RECIPES,
      payload: mostUpvotedResponse
    }];
    const store = mockStore({});
    await store.dispatch(getPopularRecipes())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('gets a single recipe', async (done) => {
    const { viewRecipeResponse } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${2}`, {
      status: 200,
      response: viewRecipeResponse
    });
    const expectedActions = [{
      type: GET_RECIPE,
      payload: viewRecipeResponse
    }];
    const store = mockStore({});
    await store.dispatch(getARecipe(2))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('catches an error for returning a recipe', async (done) => {
    const { viewRecipeError } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${4}`, {
      status: 404,
      response: viewRecipeError
    });
    const expectedActions = [{
      type: GET_RECIPE_FAILURE,
      payload: viewRecipeError
    }];
    const store = mockStore({});
    await store.dispatch(getARecipe(4))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('updates the details of a recipe', async (done) => {
    const { updateRecipeData, updateRecipeResponse } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${2}`, {
      status: 200,
      response: updateRecipeResponse
    });
    const expectedActions = [{
      type: UPDATE_RECIPE,
      payload: updateRecipeResponse
    }];
    const store = mockStore({});
    await store.dispatch(updateRecipe(2, updateRecipeData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('catches an error for updating a recipe', async (done) => {
    const { updateRecipeData, viewRecipeError } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${4}`, {
      status: 404,
      response: viewRecipeError
    });
    const expectedActions = [{
      type: UPDATE_RECIPE_FAILURE,
      payload: viewRecipeError
    }];
    const store = mockStore({});
    await store.dispatch(updateRecipe(4, updateRecipeData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('deletes a recipe from the app', async (done) => {
    const { deleteRecipeResponse } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${3}`, {
      status: 200,
      response: deleteRecipeResponse
    });
    const expectedActions = [{
      type: DELETE_RECIPE,
      payload: 3
    }];
    const store = mockStore({});
    await store.dispatch(deleteRecipe(3))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('catches an error for deleting a recipe', async (done) => {
    const { viewRecipeError } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${4}`, {
      status: 404,
      response: viewRecipeError
    });
    const expectedActions = [{
      type: DELETE_RECIPE_FAILURE,
      payload: viewRecipeError
    }];
    const store = mockStore({});
    await store.dispatch(deleteRecipe(4))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('gets all recipes that match the selected category', async (done) => {
    const { searchResponse } = mockData;
    moxios.stubRequest(`/api/v1/recipes/categories/${'Main'}?limit=${3}&offset=${0}`, {
      status: 200,
      response: searchResponse
    });
    const expectedActions = [{
      type: GET_RECIPES_CATEGORY,
      payload: searchResponse
    }];
    const store = mockStore({});
    await store.dispatch(getRecipeCategory('Main', 3, 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('gets a recipe that matches serach parameter', async (done) => {
    const { searchResponse } = mockData;
    moxios.stubRequest(`/api/v1/recipes/search/${'Amala'}?limit=${3}&offset=${0}`, {
      status: 200,
      response: searchResponse
    });
    const expectedActions = [{
      type: SEARCH_RECIPE,
      payload: searchResponse
    }];
    const store = mockStore({});
    await store.dispatch(searchRecipe('Amala', 3, 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
