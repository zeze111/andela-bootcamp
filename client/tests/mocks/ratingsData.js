const data = {
  upvoteResponse: {
    status: 'Successful',
    vote: {
      id: 4,
      vote: 1,
      recipeId: 2,
      userId: 3
    }
  },

  downvoteResponse: {
    status: 'Successful',
    message: 'You Have Downvoted this Recipe'
  },

  allUpvotesResponse: {
    status: 'Successful',
    votes: { count: 0,
      rows: []
    }
  },

  allDownvotesResponse: {
    status: 'Successful',
    votes: { count: 1,
      rows: [{
        id: 4,
        vote: 0,
        recipeId: 2,
        userId: 3
      }]
    }
  },

  votingError: {
    status: 'Unsuccessful',
    message: 'Recipe Not Found'
  },

  ratingServerError: {
    message: 'Internal Server Error'
  }
};

export default data;
