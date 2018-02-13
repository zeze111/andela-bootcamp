import React from 'react';

import Slide from '../../../components/homepage/Slide';
import store from '../../../store';

describe('Test for Slide', () => {
  it('should render component', () => {
    const wrapper = shallow(<Slide /> );
    expect(wrapper).toMatchSnapshot()
  });
});
