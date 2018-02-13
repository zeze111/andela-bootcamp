import React from 'react';

import PopularContent from '../../../components/homepage/PopularContent';
import store from '../../../store';

const props = {
  recipe: {
    id: 1,
    name: 'some name'
  }
};

describe('Test for Popular Content', () => {
  it('should render component', () => {
    const wrapper = shallow(<PopularContent {...props} store={store}/> );
    expect(wrapper).toMatchSnapshot()
  });
});
