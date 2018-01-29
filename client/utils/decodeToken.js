import jwt from 'jsonwebtoken';

const decodeToken = () => {
  const userToken = localStorage.getItem('jwToken');
  if (userToken) {
    return jwt.verify(userToken, process.env.SECRET_KEY, ((error) => {
      if (!error) {
        return true;
      }
      localStorage.removeItem('jwToken');
      return false;
    }));
  }
  return false;
};

export default decodeToken;
