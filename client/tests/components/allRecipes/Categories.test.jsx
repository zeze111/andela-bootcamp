import React from 'react';

import Categories from '../../../components/allRecipes/Categories';
import store from '../../../store';

const props = {
  onSelectAllRecipes: jest.fn(() => Promise.resolve()),
  onSelectCategory: jest.fn(() => Promise.resolve()),
  dropdown: 'Main'
};

const setup = () => {
  const wrapper = shallow(<Categories {...props} store={store} />);
  return { wrapper }
}

describe('onSelectAllRecipes', () => {
  it('select all dropdown category', () => {
    const { wrapper } = setup();
    const event = 'all';
    const button = wrapper.find('#all-button')

    button.simulate('click', event);
  });
});

describe('onSelectCategory', () => {
  it('select main dropdown category', () => {
    const { wrapper } = setup();
    const event = 'Main';
    const button = wrapper.find('#main-button')

    button.simulate('click', event);
  });
});

describe('onSelectCategory', () => {
  it('select appetizer dropdown category', () => {
    const { wrapper } = setup();
    const event = 'Appetizer';
    const button = wrapper.find('#app-button')

    button.simulate('click', event);
  });
});

describe('onSelectCategory', () => {
  it('select drinks dropdown category', () => {
    const { wrapper } = setup();
    const event = 'Drinks';
    const button = wrapper.find('#drink-button')

    button.simulate('click', event);
  });
});

describe('onSelectCategory', () => {
  it('select dessert dropdown category', () => {
    const { wrapper } = setup();
    const event = 'Dessert';
    const button = wrapper.find('#dess-button')

    button.simulate('click', event);
  });
});

describe('Test for Categories', () => {
  it('should render component', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot()
  });
});
