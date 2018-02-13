import React from 'react';

import UpvotedContent from '../../../components/homepage/UpvotedContent';
import store from '../../../store';

const props = {
  recipe: {
    recipeId: 1,
    upvotes: 20,
    Recipe: {
      name: 'some name'
    }
  }
};

describe('Test for Upvoted Content', () => {
  it('should render component', () => {
    const wrapper = shallow(<UpvotedContent {...props} store={store}/> );
    expect(wrapper).toMatchSnapshot()
  });
});
