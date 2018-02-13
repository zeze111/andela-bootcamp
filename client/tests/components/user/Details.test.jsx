import React from 'react';

import Details from '../../../components/user/Details';
import store from '../../../store';

const props = {
  onChange: jest.fn(() => Promise.resolve()),
  onSubmit: jest.fn(() => Promise.resolve()),
  isLoading: false,
};

describe('Test for Details', () => {
  it('should render component', () => {
    const wrapper = shallow(<Details {...props} store={store}/> );
    expect(wrapper).toMatchSnapshot()
  });
});
