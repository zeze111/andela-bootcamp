import Validator from 'validatorjs';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import validations from '../shared/validations';

require('dotenv').config();

const whitespace = /\s/;

function createToken(payload) {
  const token = jwt.sign(
    payload, process.env.SECRET_KEY,
    { expiresIn: 60 * 60 * 48 },
  );
  return token;
}

const users = {

  /** Creates new User and stores in the User table
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  createUser(req, res) {
    const validator = new Validator(req.body, validations.userRules);
    if (validator.passes()) {
      User.findOne({
        where: { email: req.body.email },
      })
        .then((foundUser) => {
          if (!foundUser) {
            if (whitespace.test(req.body.password)) {
              return res.status(403).json({
                status: 'Unsuccessful',
                message: 'No Spaces Allowed In Password',
              });
            }
            User.create({
              firstName: req.body.firstName.trim(),
              surname: req.body.surname.trim(),
              email: req.body.email.toLowerCase().trim(),
              password: req.body.password,
              password_confirmation: req.body.password_confirmation,
              image: req.body.image,
            }).then((userCreated) => {
              const user = {
                id: userCreated.id,
                firstName: userCreated.firstName,
                email: userCreated.email,
              };
              const payload = { id: userCreated.id };
              const token = createToken(payload);
              return res.status(201).json({
                status: 'Success',
                userId: userCreated.dataValues.id,
                user,
                token,
              });
            });
          } else {
            return res.status(409).json({
              status: 'Unsuccessful',
              message: 'Email already exist',
            });
          }
        }) // if unsuccessful
        .catch(error => res.status(400).send(error));
    } else {
      const errors = validator.errors.all();
      return res.status(406).json({
        status: 'Unsuccessful',
        message: 'Invalid data input',
        errors,
      });
    }
  },

  /** Authenticate and signs in user
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  signIn(req, res) {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    if (userEmail && userPassword) {
      User.findOne({
        where: { email: userEmail },
      })
        .then((user) => {
          if (user) {
            if (user.comparePassword(req.body.password, user)) {
              const payload = { id: user.id };
              const token = createToken(payload);
              return res.status(200).json({
                status: 'Success',
                message: 'You are now signed in',
                token,
                user,
              });
            }
            return res.status(409).json({
              status: 'Unsuccessful',
              message: 'Sign in failed, Wrong password',
            });
          }
          if (!user) {
            return res.status(404).json({
              status: 'Unsuccessful',
              message: 'User not found',
            });
          }
        }) // if unsuccessful
        .catch(error => res.status(400).send(error));
    } else {
      return res.status(406).json({
        status: 'Unsuccessful',
        message: 'Missing data input',
      });
    }
  },
};

export default users;
