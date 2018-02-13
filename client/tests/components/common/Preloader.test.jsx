import React from 'react';

import Preloader from '../../../components/common/PreLoader';

describe('Test for Preloader', () => {
  it('should render component', () => {
    const wrapper = shallow(<Preloader /> );
    expect(wrapper).toMatchSnapshot()
  });
});
