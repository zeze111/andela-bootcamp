import React from 'react';

import Details from '../../../components/recipe/Details';
import store from '../../../store';

const props = {
  clickEvent: jest.fn(() => Promise.resolve()),
  isLoading: false,
  recipe: {
    id: 1,
    name: 'some thing',
    userId: 12
  }
};

describe('Test for Details', () => {
  it('should render component', () => {
    const wrapper = shallow(<Details {...props} store={store}/> );
    expect(wrapper).toMatchSnapshot()
  });
});
