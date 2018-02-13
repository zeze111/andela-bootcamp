import React from 'react';

import AuthUser from '../../../components/navBar/AuthUser';
import store from '../../../store';

const props = {
  signout: jest.fn(() => Promise.resolve()),
  firstName: 'some'
};

describe('Test for AuthUser', () => {
  it('should render component', () => {
    const wrapper = shallow(<AuthUser {...props} store={store}/> );
    expect(wrapper).toMatchSnapshot()
  });
});
