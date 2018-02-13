import React from 'react';

import connectedProfile, {Profile} from '../../../components/user/Profile';
import Details from '../../../components/user/Details';
import store from '../../../store';

let props =  {
  getUserRecipes: jest.fn(() => Promise.resolve()),
  deleteRecipe: jest.fn(() => Promise.resolve()),
  getFavoriteRecipes: jest.fn(() => Promise.resolve()),
  deleteFavorite: jest.fn(() => Promise.resolve()),
  updateUser: jest.fn(() => Promise.resolve()),
  getUser: jest.fn(() => Promise.resolve()),
  changePassword: jest.fn(() => Promise.resolve()),
  recipes: [
    {
      id: 1,
      name: 'something'
    },
    {
      id: 2,
      name: 'something'
    },
  ],
  favorites: [
    {
      id: 1,
      name: 'something'
    },
    {
      id: 2,
      name: 'something'
    },
  ]
};

const setup = () => {
  const wrapper = shallow(<Profile {...props} store={store} />);
  return { wrapper }
};

describe('component will receive props', () => {
  it('should call get recipes function', () => {
    const spy = sinon.spy(Profile.prototype, 'componentWillReceiveProps');

    const nextProps = {
      getUserRecipes: jest.fn(() => Promise.resolve()),
      deleteRecipe: jest.fn(() => Promise.resolve()),
      getFavoriteRecipes: jest.fn(() => Promise.resolve()),
      deleteFavorite: jest.fn(() => Promise.resolve()),
      updateUser: jest.fn(() => Promise.resolve()),
      getUser: jest.fn(() => Promise.resolve()),
      changePassword: jest.fn(() => Promise.resolve()),
      message: '',
      userMessage: '',
      user: {},
      match: { params: { tab: 'some' } },
      recipes: [],
      pagination: {},
      pagination2: {},
      favorites: []
    };

    const wrapper = shallow(<Profile {...nextProps} />);
    wrapper.setProps({ prop: 15 });
    expect(spy.calledOnce).toEqual(true);
  });
});

describe('onChange', () => {
  it('should change event', () => {
    const event = {
      target: { name: 'email', value: 'Doe@yahoo.com' },
    };

    const { wrapper } = setup();
    expect(wrapper.instance().onChange(event));
    expect(wrapper.instance().state.email).toBe('Doe@yahoo.com');
  });
});

describe('onSubmit', () => {
  it('be called when form is submitted', () => {
    const { wrapper } = setup();
    const event = {
      preventDefault: jest.fn(),
    };

    wrapper.setState({
      surname: 'janedoe',
    });

    wrapper.instance().onSubmit(event);
    expect(props.updateUser.mock.calls.length).toEqual(1);
  });
});

describe('onSubmit', () => {
  it('return validation error when form is submitted', () => {
    const { wrapper } = setup();
    const event = {
      preventDefault: jest.fn(),
    };

    wrapper.setState({
      surname: 'j',
    });
    wrapper.instance().onSubmit(event);
    expect(props.updateUser.mock.calls.length).toEqual(1);
  });
});

describe('onSubmit', () => {
  it('return an error when form is submitted', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    props.updateUser = jest.fn(() => Promise.reject());
    const wrapper = shallow(<Profile {...props} store={store} />);

    wrapper.setState({
      surname: 'janedo'
    });
    wrapper.instance().onSubmit(event);
    expect(props.updateUser.mock.calls.length).toEqual(1);
  });
});

describe('onNextPage', () => {
  it('is called when next/previous page is called for user\'s recipes ', () => {
    const { wrapper } = setup();
    const event = 1;

    wrapper.instance().onNextPage(event);
  });
});

describe('onNextFavePage', () => {
  it('is called when next/previous page is called for user\'s favorites', () => {
    const { wrapper } = setup();
    const event = 1;

    wrapper.instance().onNextFavePage(event);
  });
});

describe('uploadImage', () => {
  it('is called when uploads an image', () => {
    const { wrapper } = setup();
    const event = {
      target: {
        files: ['pic.bg']
      }
    };

    wrapper.instance().uploadImage(event);
    // expect(wrapper.instance().uploadImage.mock.length).toEqual(1);
  });
});

describe('Test for Profile', () => {
  it('should render component', () => {
    document.body.innerHTML =
    '<div>' +
    '  <img class="materialboxed" />' +
    '  <button id="button" />' +
    '</div>';

    const wrapper = setup();
    expect(wrapper).toMatchSnapshot()
  });
});
