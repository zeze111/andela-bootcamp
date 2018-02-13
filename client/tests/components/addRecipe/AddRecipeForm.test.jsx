import React from 'react';

import AddRecipeForm from '../../../components/addRecipe/AddRecipeForm';
import store from '../../../store';
import { addRecipeRequest } from '../../../actions/recipeActions';

let props = {
  addRecipeRequest: jest.fn(() => Promise.resolve())
};

const setup = () => {
  const wrapper = shallow(<AddRecipeForm {...props} store={store} />);
  return { wrapper }
}

describe('onChange', () => {
  it('should change event', () => {
    const event = {
      target: { name: 'name', value: 'Rice and stew' },
    };
    const { wrapper } = setup();
    const recipeName = wrapper.find('#name');
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
    const type = wrapper.find('#type');
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
    expect(props.addRecipeRequest.mock.calls.length).toEqual(1);
  });
});

describe('onSubmit', () => {
  it('return validation error when form is submitted', () => {
    const { wrapper } = setup();
    const event = {
      preventDefault: jest.fn(),
    };

    wrapper.setState({
      name: 'Rice and stew',
      ingredients: 'rice, tomatoes, pepper, onions',
      instructions: 'Boil the rice',
      imageFile: { name: 'pic.jpg' },
      preparationTime: '12 minutes'
    });
    wrapper.instance().onSubmit(event);
    expect(props.addRecipeRequest.mock.calls.length).toEqual(1);
  });
});

describe('onSubmit', () => {
  it('return an error when form is submitted', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    props.addRecipeRequest = jest.fn(() => Promise.reject());
    const wrapper = shallow(<AddRecipeForm {...props} store={store} />);

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
    expect(props.addRecipeRequest.mock.calls.length).toEqual(1);
  });
});


// describe('upLoadImage', () => {
//   it('be called when recipe image is selected', () => {
//     const { wrapper } = setup();
//     wrapper.setState({
//       imageSrc: 'pic.jpg',
//     });
//     const file = {
//       target: {
//         files: ['one', 'two']
//       }
//     };

//     reader = {
//       onload: jest.fn()
//     }
//     wrapper.instance().uploadImage(reader);
//     expect(wrapper.instance().state.imageSrc).toBe('pic.jpg');
//   });
// });

describe('Test for Add Recipe Form', () => {
  it('should render component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot()
  });
});
