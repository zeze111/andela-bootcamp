import jwt from 'jsonwebtoken';

class confirmAuth {
  static authenticate = (req, res, next) => {
    const token = req.body.token || req.query.token || req.header['x-token'];
    if (token)
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return response.status(400).json({
            status: 'Unsuccessful', message: 'Authentification failed'
          });
        }
        req.decoded = decoded;
        next()
      })
  };
}
export default confirmAuth
