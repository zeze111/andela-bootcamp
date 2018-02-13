import React from 'react';

import connectedHomepage, {Homepage} from '../../../components/homepage/Homepage';
import store from '../../../store';

const props = {
  getAllRecipes: jest.fn(() => Promise.resolve()),
  getMostUpvotedRecipe: jest.fn(() => Promise.resolve()),
  getPopularRecipes: jest.fn(() => Promise.resolve()),
  recipes: [
    {
      id: 1,
      name: 'something'
    },
    {
      id: 2,
      name: 'another thing'
    }
  ],
  upvotedRecipes: [
    {
      id: 1,
      name: 'something'
    },
    {
      id: 2,
      name: 'another thing'
    }
  ],
  popularRecipes: [
    {
      id: 1,
      name: 'something'
    },
    {
      id: 2,
      name: 'another thing'
    }
  ]
}

$ = () => {
  tooltip: () => {}
};

const setup = () => {
  const wrapper = shallow(<Homepage {...props} store={store} />);
  return { wrapper }
}

describe('Test for Homepage', () => {
  it('should render component', () => {
    const wrapper = setup();
    '<div>' +
    '  <Link class="button-collapse" />' +
    '  <div class="tooltipped" />' +
    '</div>';

    expect(wrapper).toMatchSnapshot()
  });
});
