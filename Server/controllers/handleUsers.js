import Validator from 'validatorjs';
import jwt from 'jsonwebtoken';
import models from '../models';
import validations from '../shared/validations';

require('dotenv').config();

const User = models.User;

function createToken(payload) {
  const token = jwt.sign(
    payload, process.env.SECRET_KEY,
    { expiresIn: 60 * 60 * 48 },
  );
  return token;
}

const handleUser = {

  /** Creates new User and stores in the User table
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  newUser(req, res) {
    const validator = new Validator(req.body, validations.userRules);
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
              const token = createToken(payload);
              return res.status(201).json({
                status: 'Success',
                userId: userCreated.dataValues.id,
                data: {
                  userName: `${userCreated.firstName} ${userCreated.surname}`,
                },
                token,
              });
            });
          } else {
            return res.status(400).json({
              status: 'Unsuccessful', message: 'Email already exist',
            });
          }
        }) // if unsuccessful
        .catch(error => res.status(400).send(error));
    } else {
      const errors = validator.errors.all();
      return res.status(400).json({
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
              const payload = { id: user.id };
              const token = createToken(payload);
              return res.status(200).json({
                status: 'Success',
                message: 'You are now signed in',
                token,
              });
            }
            return res.status(400).json({
              status: 'Unsuccessful',
              message: 'Sign in failed, Wrong password',
            });
          }
          if (!user) {
            return res.status(400).json({
              status: 'Unsuccessful',
              message: 'User not found',
            });
          }
        }) // if unsuccessful
        .catch(error => res.status(400).send(error));
    } else {
      return res.status(400).json({
        status: 'Unsuccessful',
        message: 'Missing data input',
      });
    }
  },
};

export default handleUser;
