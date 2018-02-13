import React from 'react';

import SigninForm from '../../../components/signup/SigninForm';
import store from '../../../store';

let props = {
  signIn: jest.fn(() => Promise.resolve())
}

const setup = () => {
  const wrapper = shallow(<SigninForm {...props} store={store} />);
  return { wrapper }
}

describe('onChange', () => {
  it('should change event', () => {
    const event = {
      target: { name: 'email', value: 'Doe@yahoo.com' },
    };
    const { wrapper } = setup();
    const email = wrapper.find('#signInEmail');
    email.simulate('change', event);
    expect(wrapper.instance().state.email).toBe('Doe@yahoo.com');
  });
});

describe('onSubmit', () => {
  it('be called when form is submitted', () => {
    const { wrapper } = setup();
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      email: 'jane@yahoo.com',
      password: 'janedoe',
      errors: {},
      isLoading: false
    });
    wrapper.instance().onSubmit(event);
    expect(props.signIn.mock.calls.length).toEqual(1);
  });
});

describe('onSubmit', () => {
  it('return an error when form is submitted', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    props.signIn = jest.fn(() => Promise.reject());
    const wrapper = shallow(<SigninForm {...props} store={store} />);

    wrapper.setState({
      email: 'jane@yahoo.com',
      password: 'janed',
    });
    wrapper.instance().onSubmit(event);
    expect(props.signIn.mock.calls.length).toEqual(1);
  });
});

describe('Test for Sign up form', () => {
  it('should render component', () => {

    const wrapper = setup();
    expect(wrapper).toMatchSnapshot()
  });
});
