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

  updatePassword: {
    oldPassword: "abcdefg",
    newPassword: "testpassword2",
    newPassword_confirmation: "testpassword2"
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

  passwordResponse:{
    status: 'Successful',
    message: 'Your password has been updated',
    user: {
      id: 3,
      firstName: 'Jane',
      email: 'jane@yahoo.com',
      password: 'mshdbhf1b2334mnfvbmvbmdvb',
      image: '',
      bio: ''
    }
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
  },

  userServerError: {
    message: 'Internal Server Error'
  }
};

export default data;
