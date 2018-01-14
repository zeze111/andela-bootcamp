import Validator from 'validatorjs';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import validations from '../shared/validations';

require('dotenv').config();

const whitespace = /\s/;

/** Creates a user token
  * @param {Object} payload - payload object
  * @returns {string} - return a decoded string
  */
function createToken(payload) {
  const token = jwt.sign(
    payload, process.env.SECRET_KEY,
    { expiresIn: 60 * 60 * 48 },
  );
  return token;
}

const users = {

  /** Creates new User and storesin the User table
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @returns {Object} response object
  */
  createUser(request, response) {
    const validator = new Validator(request.body, validations.userRules);
    if (validator.passes()) {
      User.findOne({
        where: { email: request.body.email },
      })
        .then((foundUser) => {
          if (!foundUser) {
            if (whitespace.test(request.body.password)) {
              return response.status(403).json({
                status: 'Unsuccessful',
                message: 'No Spaces Allowed In Password',
              });
            }
            User.create({
              firstName: request.body.firstName.trim(),
              surname: request.body.surname.trim(),
              email: request.body.email.toLowerCase().trim(),
              password: request.body.password,
              password_confirmation: request.body.password_confirmation,
              image: request.body.image,
              bio: request.body.bio,
            }).then((userCreated) => {
              const user = {
                id: userCreated.id,
                firstName: userCreated.firstName,
                email: userCreated.email,
              };
              const payload = { id: userCreated.id };
              const token = createToken(payload);
              return response.status(201).json({
                status: 'Success',
                userId: userCreated.dataValues.id,
                user,
                token,
              });
            });
          } else {
            return response.status(409).json({
              status: 'Unsuccessful',
              message: 'Email already exist',
            });
          }
        })
        .catch(error => response.status(500).send(error));
    } else {
      const errors = validator.errors.all();
      return response.status(406).json({
        status: 'Unsuccessful',
        message: 'Invalid data input',
        errors,
      });
    }
  },

  /** Authenticate and signs in user
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @returns {Object} response object
  */
  signIn(request, response) {
    const userEmail = request.body.email;
    const userPassword = request.body.password;
    if (userEmail && userPassword) {
      User.findOne({
        where: { email: userEmail },
      })
        .then((user) => {
          if (user) {
            if (user.comparePassword(request.body.password, user)) {
              const payload = { id: user.id };
              const token = createToken(payload);
              return response.status(200).json({
                status: 'Success',
                message: 'You are now signed in',
                token,
                user,
              });
            }
            return response.status(409).json({
              status: 'Unsuccessful',
              message: 'Sign in failed, Wrong password',
            });
          }
          if (!user) {
            return response.status(404).json({
              status: 'Unsuccessful',
              message: 'User not found',
            });
          }
        }) // if unsuccessful
        .catch(error => response.status(500).send(error));
    } else {
      return response.status(406).json({
        status: 'Unsuccessful',
        message: 'Missing data input',
      });
    }
  },

  /** Updates a User's details
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @returns {Object} response object
  */
  updateUser(request, response) {
    if (Number.isNaN(request.params.userId)) {
      response.status(406).json({
        status: 'Unsuccessful',
        message: 'User ID Must Be A Number',
      });
    } else {
      const userid = parseInt(request.params.userId, 10);
      User.findById(userid)
        .then((userFound) => {
          if (!userFound) {
            response.status(404).json({
              status: 'Unsuccessful',
              message: 'User Not Found',
            });
          } else if (userFound.id === request.decoded.id) {
            if (request.body.firstName || request.body.surname || request.body.email ||
                request.body.password || request.body.image || request.body.bio) {
              userFound.update({
                firstName: request.body.firstName || userFound.firstName,
                surname: request.body.surname || userFound.surname,
                email: request.body.email || userFound.email,
                password: request.body.password || userFound.password,
                password_confirmation: request.body.password || userFound.password_confirmation,
                image: request.body.image || userFound.image,
                bio: request.body.bio || userFound.bio,
              })
                .then((updatedUser) => {
                  response.status(200).json({
                    status: 'Successful',
                    message: 'Your account has been updated',
                    user: {
                      firstName: updatedUser.firstName,
                      surname: updatedUser.surname,
                      email: updatedUser.email,
                      password: updatedUser.password,
                      password_confirmation: updatedUser.password,
                      image: updatedUser.image,
                      bio: request.body.bio,
                    },
                  });
                })
                .catch(error => response.status(400).send(error));
            } else {
              response.status(406).json({
                status: 'Unsuccessful',
                message: 'Must input data',
              });
            }
          } else {
            response.status(403).json({
              status: 'Unsuccessful',
              message: 'You are Not Aauthorized to Update This User',
            });
          }
        })
        .catch(error => response.status(500).send(error));
    }
  },

  /** Gets a User's details
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @returns {Object} response object
  */
  getUser(request, response) {
    if (Number.isNaN(request.params.userId)) {
      response.status(406).json({
        status: 'Unsuccessful',
        message: 'User ID Must Be A Number',
      });
    } else {
      const userid = parseInt(request.params.userId, 10);
      User.findById(userid)
        .then((userFound) => {
          if (!userFound) {
            response.status(404).json({
              status: 'Unsuccessful',
              message: 'User Not Found',
            });
          } else {
            response.status(200).json({
              status: 'Successful',
              user: userFound,
            });
          }
        })
        .catch(error => response.status(500).send(error));
    }
  },
};

export default users;
