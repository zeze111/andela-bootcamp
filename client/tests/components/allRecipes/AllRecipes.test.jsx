import React from 'react';

import connectedAllRecipes, {AllRecipes} from '../../../components/allRecipes/AllRecipes';
import store from '../../../store';

const props = {
  getPaginatedRecipes: jest.fn(() => Promise.resolve()),
  getRecipeCategory: jest.fn(() => Promise.resolve()),
  searchRecipe: jest.fn(() => Promise.resolve()),
  recipes: [
    {
      id: 1,
      name: 'something'
    },
    {
      id: 2,
      name: 'something'
    },
  ]
};

const setup = () => {
  const wrapper = shallow(<AllRecipes {...props} store={store} />);
  return { wrapper }
}

describe('component will mount', () => {
  it('should call get recipes function', () => {
    const spy = sinon.spy(AllRecipes.prototype, 'componentWillMount');
  });
});

describe('onNextPage', () => {
  it('is called when next/previous page is called', () => {
    const { wrapper } = setup();
    const event = 1;

    wrapper.instance().onNextPage(event);
  });
});

describe('onNextPage', () => {
  it('is called when next/previous page is called for category', () => {
    const { wrapper } = setup();
    const event = 1;

    wrapper.setState({
      dropdown: 'Main'
    });

    wrapper.instance().onNextPage(event);
  });
});

describe('onNextPage', () => {
  it('is called when next/previous page is called for search', () => {
    const { wrapper } = setup();
    const event = 1;

    wrapper.setState({
      searching: true
    });

    wrapper.instance().onNextPage(event);
  });
});

describe('onSelectCategory', () => {
  it('is called when a category is selected', () => {
    const { wrapper } = setup();
    const event = 'Main';

    wrapper.instance().onSelectCategory(event);
  });
});

describe('onSelectAllRecipes', () => {
  it('is called when All recipes category is selected', () => {
    const { wrapper } = setup();
    const event = 'All Recipes';

    wrapper.instance().onSelectAllRecipes(event);
  });
});

describe('onChange', () => {
  it('is called when searching for a recipe', () => {
    const { wrapper } = setup();
    const event = {
      target: { value: 'rice' }
    };
    const search = wrapper.find('#search');

    wrapper.instance().onChange(event);
  });
});

describe('onChange', () => {
  it('is called when searching for a recipe', () => {
    const { wrapper } = setup();
    const event = {
      target: { value: '' }
    };
    const search = wrapper.find('#search');

    wrapper.instance().onChange(event);
  });
});

describe('Connect All Recipes component', () => {
  it('should render component successfully', () => {
    const store = mockStore({
        recipeReducer: {
          recipes: [],
          message: '',
          pagination: {}
        }
    })

    const wrapper = shallow(<AllRecipes {...props} store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('Test for All Recipes', () => {
  it('should render component', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot()
  });
});
