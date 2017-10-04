import jwt from "jwt-simple";
import models from '../models';
import config from '../config/config'

exports.token = () => {
  const User = models.User;
  app.post("/token", (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      User.findOne({ where: { email: email } })
        .then((user) => {
          if (User.isPassword(user.password, password)) {
            const payload = { id: user.id };
            res.json({
              token: jwt.encode(payload, config.jwtSecret)
            });
          } else {
            res.sendStatus(401);
          }
        })
        .catch(error => res.status(400).send(error));
    } else {
      res.sendStatus(401);
    }
  });
};
