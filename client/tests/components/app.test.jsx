import React from 'react';

import App from '../../components/App';

describe('Test for routes', () => {
  it('run all the routes', () => {
    const wrapper = shallow(<App /> );
    expect(wrapper).toMatchSnapshot()
  })
})
