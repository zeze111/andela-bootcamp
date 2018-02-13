import React from 'react';

import connectedUpdateRecipePage, {UpdateRecipePage} from '../../../components/updateRecipe/UpdateRecipePage';
import store from '../../../store';

const props = {
  updateRecipe: jest.fn(() => Promise.resolve()),
  getARecipe: jest.fn(() => Promise.resolve()),
  match: {
    params: {
      recipeId: 3
    }
  },
  recipe: {
    id: 3,
    name: 'something'
  }
}

const setup = () => {
  const wrapper = shallow(<UpdateRecipePage {...props} store={store} />);
  return { wrapper }
}

describe('component will mount', () => {
  it('should call get recipes function', () => {
    const spy = sinon.spy(UpdateRecipePage.prototype, 'componentDidMount');
  });
});

describe('Connect Update Recipe component', () => {
  it('should render component successfully', () => {
    const store = mockStore({
        recipeReducer: {
          recipes: []
        }
    })

    const wrapper = shallow(<UpdateRecipePage {...props} store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('Test for Update Recipe page', () => {
  it('should render component', () => {

    const wrapper = setup();
    expect(wrapper).toMatchSnapshot()
  });
});
