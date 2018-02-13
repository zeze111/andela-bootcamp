import React from 'react';

import SignupPage from '../../../components/signup/Signuppage';
import store from '../../../store';

const props = {
  signUp: jest.fn(() => Promise.resolve()),
  signIn: jest.fn(() => Promise.resolve())
}

const setup = () => {
  const wrapper = shallow(<SignupPage {...props} store={store} />);
  return { wrapper }
}

describe('Test for Sign up page', () => {
  it('should render component', () => {

    const wrapper = setup();
    expect(wrapper).toMatchSnapshot()
  });
});
