import React from 'react';

import Footer from '../../components/Footer';
import Authorize from '../../components/confirmAuth';
import store from '../../store';
import mockLocalStorage from '../mocks/localStorage';


window.localStorage = mockLocalStorage;

const components = Authorize(Footer);

const {WrappedComponent} = components;

const props = {
  signout: jest.fn(),
  auth: { }
};

const context = {
  router: {
    history: {
      push: jest.fn()
    }
  }
};

window.localStorage.setItem('jwtToken', 'kdrhkhdkjhvzhdjvhvbd.jvgjhxbdvh.jdvcxhjvxhvv∫');

describe('Test for Confirm Authentication', () => {
  it('should render component', () => {
    const wrapper = shallow(<WrappedComponent {...props}/>, { context } );
    expect(wrapper).toMatchSnapshot()
  });
});
