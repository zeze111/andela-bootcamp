import React from 'react';

import Favorites from '../../../components/user/Favorites';
import store from '../../../store';

const props = {
  deleteFavorite: jest.fn(() => Promise.resolve()),
  favorite: {
    id: 1,
    name: 'blah',
    User: {
      id: 20,
      firstName: 'Jane'
    }
  },
  isLoading: false
};

const setup = () => {
  const wrapper = shallow(<Favorites {...props} store={store} />);
  return { wrapper }
}

describe('clickEvent', () => {
  it('should be called on delete a review', () => {
    const { wrapper } = setup();

    wrapper.instance().clickEvent();
  });
});

describe('Test for Favorites', () => {
  it('should render component', () => {

    const wrapper = setup();
    expect(wrapper).toMatchSnapshot()
  });
});
