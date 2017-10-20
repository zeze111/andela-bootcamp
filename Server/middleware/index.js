import jwt from 'jsonwebtoken';

const confirmAuth = {
  authenticate(req, res, next) {
    const token = req.body.token || req.query.token || req.header('x-token');
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status: 'Unsuccessful',
            message: 'Invalid token',
          });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(401).json({
        status: 'Unsuccessful',
        message: 'Unauthorised User',
      });
    }
  },
};
export default confirmAuth;
