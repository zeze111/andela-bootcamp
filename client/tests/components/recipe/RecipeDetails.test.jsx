import React from 'react';

import connectedRecipeDetails, {RecipeDetails} from '../../../components/recipe/RecipeDetails';
import store from '../../../store';

let props = {
  deleteRecipe: jest.fn(() => Promise.resolve()),
  getARecipe: jest.fn(() => Promise.resolve()),
  favoriteRecipe: jest.fn(() => Promise.resolve()),
  upvoteRecipe: jest.fn(() => Promise.resolve()),
  downvoteRecipe: jest.fn(() => Promise.resolve()),
  getUpvotes: jest.fn(() => Promise.resolve()),
  getDownvotes: jest.fn(() => Promise.resolve()),
  reviewRecipe: jest.fn(() => Promise.resolve()),
  getReviews: jest.fn(() => Promise.resolve()),
  deleteReview: jest.fn(() => Promise.resolve()),
  message: 'added',
  match: {
    params: {
      recipeId: 10
    }
  },
  recipe: {
    id: 1,
    name: 'blah',
    User: {
      id: 20,
      firstName: 'Jane'
    }
  },
  isLoading: false
};

const setup = () => {
  const wrapper = shallow(<RecipeDetails {...props} store={store} />);
  return { wrapper }
}

describe('component will receive props', () => {
  it('should call get recipes function', () => {
    const spy = sinon.spy(RecipeDetails.prototype, 'componentWillReceiveProps');
  });
});

describe('onClickFave', () => {
  it('should be called on favorite a recipe', () => {
    const { wrapper } = setup();

    wrapper.instance().onClickFave();
  });
});

describe('onClickFave', () => {
  it('should be called on favorite a recipe', () => {
    props.message = '';
    const wrapper = shallow(<RecipeDetails {...props} store={store} />);

    wrapper.instance().onClickFave();
  });
});

describe('onNextSet', () => {
  it('is called when next set of reviews clicked', () => {
    const { wrapper } = setup();

    wrapper.instance().onNextSet();
  });
});

describe('onPreviousSet', () => {
  it('is called when previous set of reviews clicked', () => {
    const { wrapper } = setup();

    wrapper.instance().onPreviousSet();
  });
});

describe('onUpvote', () => {
  it('is called when a recipe is upvoted', () => {
    const { wrapper } = setup();

    wrapper.instance().onUpvote();
  });
});

describe('onDownvote', () => {
  it('is called when a recipe is downvoted', () => {
    const { wrapper } = setup();

    wrapper.instance().onDownvote();
  });
});

describe('clickEvent', () => {
  beforeEach(() => {
    swal = {
      success: () => {},
      error: () => {}
    };
  });
  it('is called when delete recipe is clicked', () => {
    const { wrapper } = setup();

    wrapper.instance().clickEvent();
    expect(props.deleteRecipe.mock.calls.length).toEqual(0);
  });
});

describe('Test for Recipe Details', () => {
  it('should render component', () => {
    document.body.innerHTML =
    '<div>' +
    '  <img class="materialboxed" />' +
    '  <button id="button" />' +
    '</div>';

    const wrapper = setup();
    expect(wrapper).toMatchSnapshot()
  });
});
