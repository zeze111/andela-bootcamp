const data = {
  signUpresponse: {
    status: 'Successful',
    message: 'Welcome User',
    user: {
      id: 3,
      firstName: 'Jane',
      email: 'jane@yahoo.com',
    },
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZml' +
      'yc3ROYW1lIjoiSmFuZSIsImlhdCI6MTUxNzc1MjIwMH0.X1VpXqy' +
      '8rFvn56e6waBx6BAcjowkXryTbrXCNR3Z0DY'
  },

  signUpData: {
    firstName: 'Jane',
    surname: 'Doe',
    email: 'jane@yahoo.com',
    password: 'abcdefg',
    password_confirmation: 'abcdefg',
  },

  updateResponse:{
    status: 'Successful',
    message: 'Your account has been updated',
    user: {
      id: 3,
      firstName: 'Jane',
      email: 'jane@yahoo.com',
      image: '',
      bio: ''
    },
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZml' +
      'yc3ROYW1lIjoiSmFuZSIsImlhdCI6MTUxNzc1MjIwMH0.X1VpXqy' +
      '8rFvn56e6waBx6BAcjowkXryTbrXCNR3Z0DY'
  },

  userProfileResponse: {
    status: 'Successful',
    user: {
      userId: 3,
      firstName: 'Jane',
      surname: 'Doe',
      email: 'jane@yahoo.com',
      password: 'abcdefg',
      image: '',
      bio: ''
    }
  },

  signInResponse: {
    status: 'Successful',
    message: 'You are now signed in',
    user: {
      id: 3,
      firstName: 'Jane',
      surname: 'Doe',
      email: 'jane@yahoo.com',
      password: 'abcdefg',
      image: '',
      bio: ''
    },
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZml' +
      'yc3ROYW1lIjoiSmFuZSIsImlhdCI6MTUxNzc1MjIwMH0.X1VpXqy' +
      '8rFvn56e6waBx6BAcjowkXryTbrXCNR3Z0DY'
  },

  signInData: {
    email: 'jane@yahoo.com',
    password: 'abcdefg'
  },

  userError: {
    status: 'Unsuccessful',
    message: 'User Not Found',
  },

  userValidateError: {
    status: 'Unsuccessful',
    message: 'Must input data',
  }
};

export default data;
