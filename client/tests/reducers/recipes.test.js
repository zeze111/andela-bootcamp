import recipeReducer from '../../reducers/recipeReducer';
import mockData from '../mocks/recipeData';
import {
  CREATE_RECIPE,
  GET_USER_RECIPES,
  GET_ALL_RECIPES,
  DELETE_RECIPE,
  UPDATE_RECIPE,
  GET_RECIPE,
  GET_PAGED_RECIPES,
  GET_RECIPES_CATEGORY,
  MOST_UPVOTED_RECIPES,
  SEARCH_RECIPE
} from '../../actions/types';

describe('Recipes reducer', () => {
  it('stores and adds a recipe to a recipe list', () => {
    const { addRecipeResponse } = mockData;
    const initialState = {
      recipes: []
    }

    const payload = {
      recipe: addRecipeResponse.recipe
    }

    const action = {
      type: CREATE_RECIPE,
      payload
    };

    const newState = recipeReducer(initialState, action);
    expect(newState.recipes).toEqual(
      expect.arrayContaining([action.payload.recipe])
    );
  });

  it('stores current paginated recipes for a user in recipes list', () => {
    const { getPagedRecipesResponse } = mockData;
    const initialState = {
      recipes: [],
      message: '',
      pagination: {}
    }

    const payload = {
      recipes: getPagedRecipesResponse.recipes,
      message: getPagedRecipesResponse.message,
      pagination: getPagedRecipesResponse.pagination
    }

    const action = {
      type: GET_USER_RECIPES,
      payload
    };

    const newState = recipeReducer(initialState, action);
    expect(newState.message).toEqual(action.payload.message);
    expect(newState.recipes).toEqual(
      expect.arrayContaining(action.payload.recipes)
    );
    expect(newState.pagination).toEqual(action.payload.pagination)
  });

  it('stores current recipes in recipes list', () => {
    const { getAllRecipesResponse } = mockData;
    const initialState = {
      recipes: [],
      message: '',
    }

    const payload = {
      recipes: getAllRecipesResponse.recipes,
      message: getAllRecipesResponse.message
    }

    const action = {
      type: GET_ALL_RECIPES,
      payload
    };

    const newState = recipeReducer(initialState, action);
    expect(newState.message).toEqual(action.payload.message);
    expect(newState.recipes).toEqual(
      expect.arrayContaining(action.payload.recipes)
    );
  });

  it('stores current paginated recipes in recipes list', () => {
    const { getPagedRecipesResponse } = mockData;
    const initialState = {
      recipes: [],
      pagination: {}
    }

    const payload = {
      recipes: getPagedRecipesResponse.recipes,
      pagination: getPagedRecipesResponse.pagination
    }

    const action = {
      type: GET_PAGED_RECIPES,
      payload
    };

    const newState = recipeReducer(initialState, action);
    expect(newState.recipes).toEqual(
      expect.arrayContaining(action.payload.recipes)
    );
    expect(newState.pagination).toEqual(action.payload.pagination)
  });

  it('stores current paginated recipes for a particular category in recipes list', () => {
    const { getPagedRecipesResponse } = mockData;
    const initialState = {
      recipes: [],
      message: '',
      pagination: {}
    }

    const payload = {
      recipes: getPagedRecipesResponse.recipes,
      message: getPagedRecipesResponse.message,
      pagination: getPagedRecipesResponse.pagination
    }

    const action = {
      type: GET_RECIPES_CATEGORY,
      payload
    };

    const newState = recipeReducer(initialState, action);
    expect(newState.message).toEqual(action.payload.message);
    expect(newState.recipes).toEqual(
      expect.arrayContaining(action.payload.recipes)
    );
    expect(newState.pagination).toEqual(action.payload.pagination)
  });

  it('stores current paginated recipes for a search in recipes list', () => {
    const { getPagedRecipesResponse } = mockData;
    const initialState = {
      recipes: [],
      message: '',
      pagination: {}
    }

    const payload = {
      recipes: getPagedRecipesResponse.recipes,
      message: getPagedRecipesResponse.message,
      pagination: getPagedRecipesResponse.pagination
    }

    const action = {
      type: SEARCH_RECIPE,
      payload
    };

    const newState = recipeReducer(initialState, action);
    expect(newState.message).toEqual(action.payload.message);
    expect(newState.recipes).toEqual(
      expect.arrayContaining(action.payload.recipes)
    );
    expect(newState.pagination).toEqual(action.payload.pagination)
  });

  it('stores current recipes with the most upvotes in upvoted recipes list', () => {
    const { mostUpvotedResponse } = mockData;
    const initialState = {
      upvotedRecipes: [],
      message: ''
    }

    const payload = {
      recipes: mostUpvotedResponse.recipes,
      message: mostUpvotedResponse.message
    }

    const action = {
      type: MOST_UPVOTED_RECIPES,
      payload
    };

    const newState = recipeReducer(initialState, action);
    expect(newState.upvotedRecipes).toEqual(
      expect.arrayContaining(action.payload.recipes)
    );
    expect(newState.message).toEqual(action.payload.message);
  });

  it('stores current recipe to be viewed', () => {
    const { viewRecipeResponse } = mockData;
    const initialState = {
      currentRecipe: {}
    }

    const payload = {
      recipe: viewRecipeResponse.recipe
    }

    const action = {
      type: GET_RECIPE,
      payload
    };

    const newState = recipeReducer(initialState, action);
    expect(newState.currentRecipe).toEqual(action.payload.recipe);
  });

  it('stores current updated recipe in a recipes list', () => {
    const { updateRecipeResponse } = mockData;
    const initialState = {
      recipes: []
    }

    const payload = {
      recipes: updateRecipeResponse.recipe
    }

    const action = {
      type: UPDATE_RECIPE,
      payload
    };

    const newState = recipeReducer(initialState, action);
    expect(newState.recipes).toEqual(
      expect.arrayContaining([action.payload.recipe])
    );
  });

  it('removes current deleted recipe from recipes list', () => {
    const { getAllRecipesResponse } = mockData;
    const initialState = {
      recipes: [ getAllRecipesResponse.recipes ]
    }

    const action = {
      type: DELETE_RECIPE,
      payload: 2
    };

    const newState = recipeReducer(initialState, action);
    expect(newState.recipes).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: action.payload })
      ])
    );
  });

  it('return initial state when there\'s no action', () => {
    const initialState = {
      recipes: []
    }

    const action = {};

    const newState = recipeReducer();
    expect(newState.recipes).toEqual([]);
  });
});
