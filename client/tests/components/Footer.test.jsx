import React from 'react';

import Footer from '../../components/Footer';

describe('Test for footer', () => {
  it('', () => {
    const wrapper = shallow(<Footer /> );
    expect(wrapper).toMatchSnapshot()
  });
});
