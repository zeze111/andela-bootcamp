import React from 'react';

import Reviews from '../../../components/recipe/Reviews';
import store from '../../../store';

const props = {
  deleteReview: jest.fn(() => Promise.resolve()),
  review: {
    id: 1,
    title: 'blah',
    User: {
      id: 20,
      firstName: 'Jane'
    }
  },
  isLoading: false
};

const setup = () => {
  const wrapper = shallow(<Reviews {...props} store={store} />);
  return { wrapper }
}

describe('reviewClickEvent', () => {
  it('should be called on delete a review', () => {
    const { wrapper } = setup();

    wrapper.instance().reviewClickEvent();
  });
});

describe('Test for Reviews', () => {
  it('should render component', () => {

    const wrapper = setup();
    expect(wrapper).toMatchSnapshot()
  });
});
