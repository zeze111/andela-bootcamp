const data = {
  reviewData: {
    title: 'Lovely!',
    comment: 'I absolutely love this recipe'
  },

  reviewResponse: {
    status: 'Successful',
    review: {
      id: '12',
      title: 'Lovely!',
      comment: 'I absolutely love this recipe',
      recipeId: 2,
      createdAt: '14:00pm',
      User: {
        id: 56,
        firstName: 'Dara',
        surname: 'Somebody',
        image: 'Some url'
      }
    }
  },

  allReviewsResponse: {
    status: 'Successful',
    reviews: [{
      id: '12',
      title: 'Lovely!',
      comment: 'I absolutely love this recipe',
      recipeId: 2,
      createdAt: '14:00pm',
      User: {
        id: 56,
        firstName: 'Dara',
        surname: 'Somebody',
        image: 'Some url'
      }
    }]
  },

  deleteReviewResponse: {
    status: 'Successful',
    message: 'Review has been removed',
  },

  reviewError: {
    status: 'Unsuccessful',
    message: 'Recipe Not Found'
  }
};

export default data;
