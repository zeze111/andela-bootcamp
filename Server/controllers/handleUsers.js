import Validator from 'validatorjs';
import jwt from 'jsonwebtoken';
import models from '../models';

require('dotenv').config();

const User = models.User;

const userRules = {
  firstName: 'required|between:2,35',
  surname: 'required|between:2,50',
  email: 'required|email',
  password: 'required|confirmed|min:6',
  password_confirmation: 'required',
};

const handleUser = {

  /** Creates new User and stores in the User table
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  newUser(req, res) {
    const validator = new Validator(req.body, userRules);
    if (validator.passes()) {
      User.findOne({
        where: { email: req.body.email },
      })
        .then((user) => {
          if (!user) {
            User.create({
              firstName: req.body.firstName,
              surname: req.body.surname,
              email: req.body.email.toLowerCase(),
              password: req.body.password,
              password_confirmation: req.body.password_confirmation,
            }).then((userCreated) => {
              const payload = { id: userCreated.id };
              const token = jwt.sign(
                payload, process.env.SECRET_KEY,
                { expiresIn: 60 * 60 * 48 },
              );
              return res.status(201).json({
                status: 'Success',
                data: {
                  userName: `${userCreated.firstName} ${userCreated.surname}`,
                  token,
                },
              });
            });
          } else {
            res.status(400).json({
              status: 'Unsuccessful', message: 'Email already exist',
            })
              .catch(error => res.status(400).send(error));
          }
        }) // if unsuccessful
        .catch(error => res.status(400).send(error));
    } else {
      res.status(400).json({
        status: 'Unsuccessful',
        message: 'Invalid data input',
        errors: validator.errors.all(),
      });
    }
  },

  /** Authenticate and signs in user
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  userSignIn(req, res) {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    if (userEmail && userPassword) {
      User.findOne({
        where: { email: userEmail },
      })
        .then((user) => {
          if (user) {
            if (user.comparePassword(req.body.password, user)) {
              return res.status(200).json({
                status: 'Success',
                message: 'You are now signed in',
              });
            }
            res.status(401).json({
              status: 'Unsuccessful',
              message: 'Sign in failed, Wrong password',
            });
          } else {
            return res.status(401).json({
              status: 'Unsuccessful',
              message: 'User not found',
            });
          }
        }) // if unsuccessful
        .catch(error => res.status(400).send(error));
    } else {
      res.status(400).json({
        status: 'Unsuccessful',
        message: 'Missing data input',
      });
    }
  },

  clearTable(req, res) { // at end of tests
    if (process.env.NODE_ENV === 'test') { // if in test environment
      User.truncate({
        cascade: true,
        restartIdentity: true,
      }).then(() =>
        res.status(204).send({}));
    } else {
      res.status(200).json({
        message: 'Not allowed',
      });
    }
  },
};

export default handleUser;
