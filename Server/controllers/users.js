import Validator from 'validatorjs';

import { User } from '../models';
import { createToken, isNum } from '../shared/helper';
import validations from '../shared/validations';

require('dotenv').config();

/**
 *
 * @class Users
 */
class Users {
  /** Creates new User and storesin the User table
   *
  * @param {Object} request - request object
  *
  * @param {Object} response - response object
  *
  * @returns {Object} response object
  */
  static signUp(request, response) {
    const validator = new Validator(request.body, validations.userRules);
    if (validator.passes()) {
      User.findOne({
        where: { email: request.body.email },
      })
        .then((foundUser) => {
          if (!foundUser) {
            User.create({
              firstName: request.body.firstName.trim(),
              surname: request.body.surname.trim(),
              email: request.body.email.toLowerCase().trim(),
              password: request.body.password,
              image: request.body.image,
              bio: request.body.bio,
            }).then((userCreated) => {
              const user = {
                id: userCreated.id,
                firstName: userCreated.firstName,
                email: userCreated.email,
              };

              const payload = {
                id: userCreated.id,
                firstName: userCreated.firstName
              };
              const token = createToken(payload);
              return response.status(201).json({
                status: 'Success',
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
      return response.status(422).json({
        status: 'Unsuccessful',
        message: 'Invalid data input',
        errors,
      });
    }
  }

  /** Authenticate and signs in user
   *
  * @param {Object} request - request object
  *
  * @param {Object} response - response object
  *
  * @returns {Object} response object
  */
  static signIn(request, response) {
    const { email, password } = request.body;
    if (email && password) {
      User.findOne({
        where: { email },
      })
        .then((user) => {
          if (user) {
            if (user.comparePassword(password, user)) {
              const payload = { id: user.id, firstName: user.firstName };
              const token = createToken(payload);
              return response.status(200).json({
                status: 'Success',
                message: 'You are now signed in',
                token,
                user,
              });
            }
            return response.status(401).json({
              status: 'Unsuccessful',
              message: 'Sign in failed, Wrong email/password',
            });
          }
          return response.status(401).json({
            status: 'Unsuccessful',
            message: 'Invalid Credentials, you are unauthorized',
          });
        })
        .catch(error => response.status(500).send(error));
    } else {
      return response.status(422).json({
        status: 'Unsuccessful',
        message: 'Missing data input',
      });
    }
  }

  /** Updates a User's details
   *
  * @param {Object} request - request object
  *
  * @param {Object} response - response object
  *
  * @returns {Object} response object
  */
  static update(request, response) {
    User.findById(request.decoded.id)
      .then((userFound) => {
        if (userFound) {
          const {
            firstName,
            surname,
            email,
            password,
            image,
            bio
          } = request.body;

          if (firstName || surname || email ||
            password || image || bio) {
            const validator = new Validator(
              request.body,
              validations.updateUserRules
            );
            if (validator.passes()) {
              userFound.update({
                firstName: firstName || userFound.firstName,
                surname: surname || userFound.surname,
                email: userFound.email,
                password: password || userFound.password,
                image: image || userFound.image,
                bio: bio || userFound.bio,
              })
                .then((updatedUser) => {
                  const payload = {
                    id: updatedUser.id,
                    firstName: updatedUser.firstName
                  };
                  const token = createToken(payload);

                  response.status(200).json({
                    status: 'Successful',
                    message: 'Your account has been updated',
                    token,
                    user: {
                      firstName: updatedUser.firstName,
                      surname: updatedUser.surname,
                      email: updatedUser.email,
                      image: updatedUser.image,
                      bio: request.body.bio,
                    },
                  });
                });
            } else {
              const errors = validator.errors.all();
              return response.status(422).json({
                status: 'Unsuccessful',
                message: 'Invalid data input',
                errors,
              });
            }
          } else {
            response.status(422).json({
              status: 'Unsuccessful',
              message: 'Must input data',
            });
          }
        }
      })
      .catch(error => response.status(500).send(error));
  }

  /** Gets a User's details
   * 
  * @param {Object} request - request object
  *
  * @param {Object} response - response object
  *
  * @returns {Object} response object
  */
  static getDetails(request, response) {
    if (!isNum(request.params.userId, response, 'User')) {
      const userId = parseInt(request.params.userId, 10);
      User.findById(userId)
        .then((userFound) => {
          if (!userFound) {
            return response.status(404).json({
              status: 'Unsuccessful',
              message: 'User Not Found',
            });
          }
          return response.status(200).json({
            status: 'Successful',
            user: userFound,
          });
        })
        .catch(error => response.status(500).send(error));
    }
  }
}

export default Users;
