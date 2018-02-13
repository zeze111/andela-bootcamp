import React from 'react';

import Recipes from '../../../components/user/Recipes';
import store from '../../../store';

const props = {
  deleteRecipe: jest.fn(() => Promise.resolve()),
  recipe: {
    id: 1,
    name: 'blah',
    User: {
      id: 20,
      firstName: 'Jane'
    }
  },
};

const setup = () => {
  const wrapper = shallow(<Recipes {...props} store={store} />);
  return { wrapper }
}

describe('clickEvent', () => {
  it('should be called on delete a review', () => {
    const { wrapper } = setup();

    wrapper.instance().clickEvent();
  });
});

describe('Test for Recipes', () => {
  it('should render component', () => {

    const wrapper = setup();
    expect(wrapper).toMatchSnapshot()
  });
});
