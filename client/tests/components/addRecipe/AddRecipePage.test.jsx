import React from 'react';

import AddRecipePage from '../../../components/addRecipe/AddRecipePage';
import store from '../../../store';

const props = {
  addRecipeRequest: jest.fn(() => Promise.resolve())
};

describe('Test for Add Recipe Page', () => {
  it('should render component', () => {
    const wrapper = shallow(<AddRecipePage {...props} store={store}/> );
    expect(wrapper).toMatchSnapshot()
  });
});
