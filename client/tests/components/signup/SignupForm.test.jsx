import React from 'react';

import SignupForm from '../../../components/signup/SignupForm';
import store from '../../../store';

let props = {
  signUp: jest.fn(() => Promise.resolve())
}

const setup = () => {
  const wrapper = shallow(<SignupForm {...props} store={store} />);
  return { wrapper }
}

describe('onChange', () => {
  it('should change event', () => {
    const event = {
      target: { name: 'surname', value: 'Doe' },
    };
    const { wrapper } = setup();
    const surname = wrapper.find('#sname');
    surname.simulate('change', event);
    expect(wrapper.instance().state.surname).toBe('Doe');
  });
});

describe('onSubmit', () => {
  it('be called when form is submitted', () => {
    const { wrapper } = setup();
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      firstName: 'Jane',
      surname: 'Doe',
      email: 'jane@yahoo.com',
      password: 'janedoe',
      password_confirmation: 'janedoe',
      errors: {},
      isLoading: false
    });
    wrapper.instance().onSubmit(event);
    expect(props.signUp.mock.calls.length).toEqual(1);
  });
});

describe('onSubmit', () => {
  it('return validation error when form is submitted', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    props.signUp = jest.fn(() => Promise.reject());
    const wrapper = shallow(<SignupForm {...props} store={store} />);

    wrapper.setState({
      firstName: 'Jane',
      surname: 'Doe',
      email: 'jane@yahoo.com',
      password: 'janedoe'
    });
    wrapper.instance().onSubmit(event);
    expect(props.signUp.mock.calls.length).toEqual(0);
  });
});

describe('onSubmit', () => {
  it('return an error when form is submitted', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    props.signUp = jest.fn(() => Promise.reject());
    const wrapper = shallow(<SignupForm {...props} store={store} />);

    wrapper.setState({
      firstName: 'Jane',
      surname: 'Doe',
      email: 'jane@yahoo.com',
      password: 'janedoe',
      password_confirmation: 'janedoe',
      errors: {},
      isLoading: false
    });
    wrapper.instance().onSubmit(event);
    expect(props.signUp.mock.calls.length).toEqual(1);
  });
});

describe('Test for Sign up form', () => {
  it('should render component', () => {

    const wrapper = setup();
    expect(wrapper).toMatchSnapshot()
  });
});
