import React from 'react';

import connectedUpdateRecipeForm, {UpdateRecipeForm} from '../../../components/updateRecipe/UpdateRecipeForm';
import store from '../../../store';

const props = {
  updateRecipe: jest.fn(() => Promise.resolve()),
  recipe: {
    id: 3,
    name: 'something'
  }
}

const setup = () => {
  const wrapper = shallow(<UpdateRecipeForm {...props} store={store} />);
  return { wrapper }
}

describe('component will receive props', () => {
  it('should call get recipes function', () => {
    const spy = sinon.spy(UpdateRecipeForm.prototype, 'componentWillReceiveProps');
  });
});

describe('onChange', () => {
  it('should change event', () => {
    const event = {
      target: { name: 'name', value: 'Rice and stew' },
    };
    const { wrapper } = setup();
    const recipeName = wrapper.find('#uname');
    recipeName.simulate('change', event);
    expect(wrapper.instance().state.name).toBe('Rice and stew');
  });
});

describe('onSelectChange', () => {
  it('should change event for type select field', () => {
    const event = {
      target: { value: 'Main' },
    };
    const { wrapper } = setup();
    const type = wrapper.find('#utype');
    type.simulate('change', event);
    expect(wrapper.instance().state.type).toBe('Main');
  });
});

describe('onSubmit', () => {
  it('be called when form is submitted', () => {
    const { wrapper } = setup();
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      name: 'Rice and stew',
      ingredients: 'rice, tomatoes, pepper, onions',
      instructions: 'Boil the rice',
      imageFile: { name: 'pic.jpg' },
      preparationTime: '12 minutes',
      type: 'Main',
      errors: {},
      isLoading: false
    });

    wrapper.instance().onSubmit(event);
    expect(props.updateRecipe.mock.calls.length).toEqual(1);
  });
});

describe('onSubmit', () => {
  it('return validation error when form is submitted', () => {
    const { wrapper } = setup();
    const event = {
      preventDefault: jest.fn(),
    };

    wrapper.setState({
      name: 'R'
    });
    wrapper.instance().onSubmit(event);
    expect(props.updateRecipe.mock.calls.length).toEqual(1);
  });
});

describe('onSubmit', () => {
  it('return an error when form is submitted', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    props.updateRecipe = jest.fn(() => Promise.reject());
    const wrapper = shallow(<UpdateRecipeForm {...props} store={store} />);

    wrapper.setState({
      name: 'Rice and stew',
      ingredients: 'rice, tomatoes, pepper, onions',
      instructions: 'Boil the rice',
      imageFile: { name: 'pic.jpg' },
      preparationTime: '12 minutes',
      type: 'Main',
      errors: {},
      isLoading: false
    });
    wrapper.instance().onSubmit(event);
    expect(props.updateRecipe.mock.calls.length).toEqual(1);
  });
});

describe('Connect Update Recipe component', () => {
  it('should render component successfully', () => {
    const store = mockStore({
        recipeReducer: {
          recipes: []
        }
    })

    const wrapper = shallow(<UpdateRecipeForm {...props} store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('Test for Update Recipe Form', () => {
  it('should render component', () => {

    const wrapper = setup();
    expect(wrapper).toMatchSnapshot()
  });
});
