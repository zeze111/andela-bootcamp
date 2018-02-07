import jwt from 'jsonwebtoken';

import { User } from '../models';

const confirmAuth = {
  authenticate(request, response, next) {
    const token = request.body.token ||
    request.query.token || request.header('x-token');
    if (token) {
      return jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return response.status(401).json({
            status: 'Unsuccessful',
            message: 'Invalid token',
          });
        }
        User.findOne({
          where: { id: decoded.id },
          attributes: ['id', 'email'],
        }).then((user) => {
          if (!user) {
            return response.status(404).json({ error: 'User Not Found' });
          }
          request.currentUser = user;
          request.decoded = decoded;
          next();
        })
          .catch(error => response.status(500).send(error));
      });
    }
    return response.status(401).json({
      status: 'Unsuccessful',
      message: 'Please sign up to perform this action',
    });
  },
};
export default confirmAuth;
