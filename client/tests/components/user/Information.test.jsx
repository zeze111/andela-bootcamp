import React from 'react';

import Information from '../../../components/user/Information';
import store from '../../../store';

const props = {
  uploadImage: jest.fn(() => Promise.resolve()),
  iamge: 'pic.jpg',
  isPicLoading: false,
  isLoading: false
};

const setup = () => {
  const wrapper = shallow(<Information {...props} store={store} />);
  return { wrapper }
}

describe('Test for Information', () => {
  it('should render component', () => {

    const wrapper = setup();
    expect(wrapper).toMatchSnapshot()
  });
});
