import jwt from 'jsonwebtoken';

const decodeToken = () => {
  const userToken = localStorage.getItem('jwtToken');
  if (userToken) {
    return jwt.verify(userToken, process.env.SECRET_KEY, ((error) => {
      console.log('error 1', error);
      if (!error) {
        console.log('some value');
        return true;
      }
      console.log('error', error);
      localStorage.removeItem('jwtToken');
      return false;
    }));
  }
  console.log(false);
};

export default decodeToken;
