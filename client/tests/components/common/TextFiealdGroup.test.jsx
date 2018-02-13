import React from 'react';

import {
  TextFieldGroup,
  TextFieldGroup2,
  TextFieldGroup3,
  LinkFieldGroup,
  LinkFieldGroup2
} from '../../../components/common/TextFieldGroup';

const props = {
  value: '',
  onChange: jest.fn(),
  id: '',
  type: '',
  name: '',
  label: '',
  error: [],
  icon: '',
  to: '',
  href: '',
  dataTool: '',
  item: '',
}

describe('Test for TextFieldGroup', () => {
  it('should render component', () => {
    const wrapper = shallow(<TextFieldGroup {...props}/> );
    expect(wrapper).toMatchSnapshot()
  });
});

describe('Test for TextFieldGroup2', () => {
  it('should render component', () => {
    const wrapper = shallow(<TextFieldGroup2 {...props}/> );
    expect(wrapper).toMatchSnapshot()
  });
});

describe('Test for TextFieldGroup', () => {
  it('should render component', () => {
    const wrapper = shallow(<TextFieldGroup3 {...props}/> );
    expect(wrapper).toMatchSnapshot()
  });
});

describe('Test for LinkFieldGroup', () => {
  it('should render component', () => {
    const wrapper = shallow(<LinkFieldGroup {...props}/> );
    expect(wrapper).toMatchSnapshot()
  });
});

describe('Test for LinkFieldGroup2', () => {
  it('should render component', () => {
    const wrapper = shallow(<LinkFieldGroup2 {...props}/> );
    expect(wrapper).toMatchSnapshot()
  });
});
