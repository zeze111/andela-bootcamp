import jwt from 'jsonwebtoken';
import isEmpty from 'lodash/isEmpty';

const token = localStorage.getItem('jwtToken');
// let decoded;

const decodeToken = () => {
  if (!isEmpty(token)) {
    jwt.verify(token, process.env.SECRET_KEY, ((error, decoded) => {
      if (decoded) {
        return true;
      }
      return false;
    }));
  }
};

export default decodeToken;
