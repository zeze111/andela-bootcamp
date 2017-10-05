import models from '../models';
import Validator from 'validatorjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

require('dotenv').config();

const User = models.User;

const userRules = {
  firstName: 'required|between:2,35',
  surname: 'required|between:2,50',
  email: 'required|email'
};

const handleUser = {

  newUser(req, res){
    const validator = new Validator(req.body, userRules);
    if (validator.passes()) {
      const userFName = req.body.firstName;
      const userSurname = req.body.surname;
      const userEmail = req.body.email.toLowerCase();
      const userPassword = req.body.password;
      if (userFName && userSurname && userEmail && userPassword) {
        User.findOne({
          where: { email: userEmail }
        })
          .then((user) => {
            if (!user) {
              User.create({
                firstName: userFName,
                surname: userSurname,
                email: userEmail,
                password: userPassword,
              }).then((userCreated) => {
                res.status(201).json({
                  status: 'Success',
                  data: {
                    userName: `${userCreated.firstName} ${userCreated.surname}`,
                  },
                })
              });
            } else {
              res.status(400).json({
                status: 'Unsuccessful', message: 'Email already exist'
              });
            }
          }) //if unsuccessful
          .catch(error => res.status(400).send(error));
      } else {
        res.status(400).json({
          status: 'Unsuccessful', message: 'Missing data input'
        });
      }
    } else {
      res.status(400).json({
        status: 'Unsuccessful',
        message: 'Invalid data input',
        errors: validator.errors.all()
      });
    }
  },

  userSignIn(req, res){
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    if (userEmail && userPassword) {
      User.findOne({
        where: { email: userEmail }
      })
        .then((user) => {
          if (user) {
            if (user.comparePassword(req.body.password, user)) {
              const payload = { id: user.id };

              const token = jwt.sign(payload, process.env.SECRET_KEY,
                { expiresIn: 60 * 60 * 48 });

              return res.status(200).json({
                status: 'Success',
                message: 'You are now signed in',
                token
              });
            } else {
              res.status(401).json({
                status: 'Unsuccessful', message: 'Sign in failed, Wrong password'
              });
            }
          } else {
            res.status(401).json({
              status: 'Unsuccessful', message: 'User not found'
            });
          }
        }) //if unsuccessful
        .catch(error => res.status(400).send(error));
    } else {
      res.status(400).json({
        status: 'Unsuccessful', message: 'Missing data input'
      });
    }
  }
}

export default handleUser;
