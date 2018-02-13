import React from 'react';

import PageNotFound from '../../components/PageNotFound';

describe('Test for 404 Page', () => {
  it('', () => {
    const wrapper = shallow(<PageNotFound /> );
    expect(wrapper).toMatchSnapshot()
  });
});
