import React from 'react';

import AllContent from '../../../components/homepage/AllContent';
import store from '../../../store';

const props = {
  recipe: {
    id: 1,
    name: 'some name'
  }
};

describe('Test for All Content', () => {
  it('should render component', () => {
    const wrapper = shallow(<AllContent {...props} store={store}/> );
    expect(wrapper).toMatchSnapshot()
  });
});
