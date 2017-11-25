import jwt from 'jsonwebtoken';
import { User } from '../models';

const confirmAuth = {
  authenticate(req, res, next) {
    const reqAuthorization = req.headers.authorization;
    const token = req.body.token || req.query.token || 
    reqAuthorization.split(' ')[1] || req.header('x-token');
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status: 'Unsuccessful',
            message: 'Invalid token',
          });
        }
        User.findOne({
          where: { id: decoded.id },
          attributes: ['id', 'email'],
        }).then((user) => {
          if (!user) {
            return res.status(404).json({ error: 'User Not Found' });
          }
          req.currentUser = user;
          req.decoded = decoded;
          next();
        })
          .catch(error => res.status(500).send(error));
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
