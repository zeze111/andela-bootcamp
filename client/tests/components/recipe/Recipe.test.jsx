import React from 'react';

import Recipe from '../../../components/recipe/Recipe';
import store from '../../../store';

const props = {
  onUpvote: jest.fn(() => Promise.resolve()),
  onDownvote: jest.fn(() => Promise.resolve()),
  onClickFave: jest.fn(() => Promise.resolve()),
  icon: 'star',
  recipe: {
    id: 1,
    name: 'some thing',
    userId: 12
  }
};

describe('Test for Recipe', () => {
  it('should render component', () => {
    const wrapper = shallow(<Recipe {...props} store={store}/> );
    expect(wrapper).toMatchSnapshot()
  });
});
