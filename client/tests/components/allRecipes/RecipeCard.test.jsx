import React from 'react';

import RecipeCard from '../../../components/allRecipes/RecipeCard';
import store from '../../../store';

const props = {
  recipe: {
    id: 0,
    name: 'something'
  }
};

describe('Test for Recipe Card', () => {
  it('should render component', () => {
    const wrapper = shallow(<RecipeCard {...props} store={store}/> );
    expect(wrapper).toMatchSnapshot()
  });
});
