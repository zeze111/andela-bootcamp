const data = {
  signUpresponse: {
    success: true,
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
  // userProfileResponse: {
  //   user: {
  //     userId: 10,
  //     firstName: 'Jane',
  //     surname: 'Doe',
  //     email: 'jane@yahoo.com',
  //     password: 'abcdefg',
  //     image: '',
  //     bio: ''
  //   }
  // },
  signInResponse: {
    success: true,
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
  }
};

export default data;
