import jwt from 'jsonwebtoken';

import { User } from '../models';

const confirmAuth = {
  authenticate(req, res, next) {
    const token = req.body.token || req.query.token || req.header('x-token');
    if (token) {
      return jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
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
    }
    return res.status(401).json({
      status: 'Unsuccessful',
      message: 'Please sign up to perform this action',
    });
  },
};
export default confirmAuth;
