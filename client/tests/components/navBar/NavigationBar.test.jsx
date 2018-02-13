import React from 'react';

import connectedNavigationBar, {NavigationBar} from '../../../components/navbar/NavigationBar';
import store from '../../../store';

const props = {
  signout: jest.fn(() => Promise.resolve()),
  auth: {},
  user: {}
};

const context = {
  router: {
    history: {
      push: jest.fn()
    }
  }
};

const setup = () => {
  const wrapper = shallow(<NavigationBar {...props} store={store} />, {context});
  return { wrapper }
}

describe('component will receive props', () => {
  it('should call get recipes function', () => {
    const spy = sinon.spy(NavigationBar.prototype, 'componentWillReceiveProps');

    const nextProps = {
      signout: jest.fn(() => Promise.resolve()),
      auth: {},
      user: {
        firstName: 'Jane'
      }
    };

    const wrapper = shallow(<NavigationBar {...nextProps} />);
    wrapper.setProps({ prop: 3 });
    expect(spy.calledOnce).toEqual(true);
  });
});

describe('signout', () => {
  it('be called when form is submitted', () => {
    const { wrapper } = setup();

    wrapper.instance().signout();
  });
});

describe('Test for Navigation Bar', () => {
  it('should render component', () => {
    const wrapper = setup();
    document.body.innerHTML =
    '<div>' +
    '  <Link class="button-collapse" />' +
    '  <div class="tooltipped" />' +
    '</div>';

    expect(wrapper).toMatchSnapshot()
  });
});
