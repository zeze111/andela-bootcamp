import jwt from 'jsonwebtoken';


const checkToken = {
  authenticate(request, response, next) {
    const token = request.body.token ||
    request.query.token || request.header('x-token');

    if (token) {
      return jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          next();
        }
        request.decoded = decoded;
        next();
      });
    }
    next();
  }
};

export default checkToken;
