import React from 'react';

import PasswordForm from '../../../components/user/PasswordForm';
import store from '../../../store';

let props = {
  changePassword: jest.fn(() => Promise.resolve())
}

const setup = () => {
  const wrapper = shallow(<PasswordForm {...props} store={store} />);
  return { wrapper }
}

describe('onChange', () => {
  it('should change event', () => {
    const event = {
      target: { name: 'password', value: 'janedoe' },
    };
    const { wrapper } = setup();
    const password = wrapper.find('#old');
    password.simulate('change', event);
    expect(wrapper.instance().state.password).toBe('janedoe');
  });
});

describe('onSubmit', () => {
  it('be called when form is submitted', () => {
    const { wrapper } = setup();
    const event = {
      preventDefault: jest.fn(),
    };
    document.body.innerHTML =
    '<div>' +
    '  <form id="pwdForm" />' +
    '  <button id="button" />' +
    '</div>';
    wrapper.setState({
      oldPassword: 'janedoe',
      newPassword: 'janedo',
      newPassword_confirmation: 'janedo',
      errors: {},
      isLoading: false
    });

    wrapper.instance().onSubmit(event);
    expect(props.changePassword.mock.calls.length).toEqual(1);
  });
});

describe('onSubmit', () => {
  it('return validation error when form is submitted', () => {
    const { wrapper } = setup();
    const event = {
      preventDefault: jest.fn(),
    };
    document.body.innerHTML =
    '<div>' +
    '  <form id="pwdForm" />' +
    '  <button id="button" />' +
    '</div>';

    wrapper.setState({
      oldPassword: 'janedoe',
      newPassword: 'janedo',
    });
    wrapper.instance().onSubmit(event);
    expect(props.changePassword.mock.calls.length).toEqual(1);
  });
});

describe('onSubmit', () => {
  it('return an error when form is submitted', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    props.changePassword = jest.fn(() => Promise.reject());
    const wrapper = shallow(<PasswordForm {...props} store={store} />);
    document.body.innerHTML =
    '<div>' +
    '  <form id="pwdForm" />' +
    '  <button id="button" />' +
    '</div>';

    wrapper.setState({
      oldPassword: 'janedoe',
      newPassword: 'janedo',
      newPassword_confirmation: 'janedo',
    });
    wrapper.instance().onSubmit(event);
    expect(props.changePassword.mock.calls.length).toEqual(1);
  });
});

describe('Test for Sign up form', () => {
  it('should render component', () => {

    const wrapper = setup();
    expect(wrapper).toMatchSnapshot()
  });
});
