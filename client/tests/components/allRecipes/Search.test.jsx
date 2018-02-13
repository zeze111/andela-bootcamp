import React from 'react';

import Search from '../../../components/allRecipes/Search';
import store from '../../../store';

const props = {
  onChange: jest.fn(() => Promise.resolve()),
  search: 'some'
};

describe('Test for Search', () => {
  it('should render component', () => {
    const wrapper = shallow(<Search {...props} store={store}/> );
    expect(wrapper).toMatchSnapshot()
  });
});
