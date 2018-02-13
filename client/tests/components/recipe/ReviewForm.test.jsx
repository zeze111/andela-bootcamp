import React from 'react';

import ReviewForm from '../../../components/recipe/ReviewForm';
import store from '../../../store';

const props = {
  reviewRecipe: jest.fn(() => Promise.resolve()),
  getReviews: jest.fn(() => Promise.resolve()),
  offset: 3,
  limit: 0,
  recipe: {
    id: 1,
    name: 'some thing',
    userId: 12
  }
};

const setup = () => {
  const wrapper = shallow(<ReviewForm {...props} store={store} />);
  return { wrapper }
}

describe('onChange', () => {
  it('should change event', () => {
    const event = {
      target: { name: 'comment', value: 'Love this a lot' },
    };
    const { wrapper } = setup();
    const comment = wrapper.find('#cmt');
    comment.simulate('change', event);
    expect(wrapper.instance().state.comment).toBe('Love this a lot');
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
    '  <form id="reviewForm" />' +
    '  <button id="button" />' +
    '</div>';
    wrapper.setState({
      title: 'amazing',
      comment: 'Love this a lot'
    });

    wrapper.instance().onSubmit(event);
    expect(props.reviewRecipe.mock.calls.length).toEqual(1);
  });
});

describe('Test for Review Form', () => {
  it('should render component', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot()
  });
});
