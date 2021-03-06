import Validator from 'validatorjs';

import { Recipe, Review, User } from '../models';
import validations from '../shared/validations';
import { isNum, paginationData } from '../shared/helper';

/**
 *
 * @class Reviews
 */
class Reviews {
  /** Creates new Review for a Recipe and stores in the Reviews table
   *
  * @param {Object} request - request object
  *
  * @param {Object} response - response object
  *
  * @returns {Object} response object
  */
  static reviewRecipe(request, response) {
    if (!isNum(request.params.recipeId, response, 'Recipe')) {
      const findRecipeId = parseInt(request.params.recipeId, 10);
      Recipe.findById(findRecipeId)
        .then((recipe) => {
          if (recipe) {
            const validator = new Validator(
              request.body,
              validations.reviewRules
            );
            if (validator.passes()) {
              Review.create({
                title: request.body.title,
                comment: request.body.comment,
                recipeId: findRecipeId,
                userId: request.decoded.id,
              })
                .then((review) => {
                  const {
                    id, title, comment, recipeId, createdAt,
                  } = review;
                  const createdReview = {
                    id, title, comment, recipeId, createdAt,
                  };

                  User.findOne({
                    where: {
                      id: review.userId,
                    },
                    attributes: ['id', 'firstName', 'surname', 'image'],
                  })
                    .then((user) => {
                      createdReview.User = user;
                      response.status(201).json({
                        status: 'Successful',
                        review: createdReview,
                      });
                    });
                });
            } else {
              response.status(422).json({
                status: 'Unsuccessful',
                message: 'Invalid data input',
                errors: validator.errors.all(),
              });
            }
          } else {
            response.status(404).json({
              status: 'Unsuccessful',
              message: 'Recipe Not Found',
            });
          }
        })
        .catch(() => response.status(500).json({
          message: 'Internal Server Error'
        }));
    }
  }

  /** Gets all the Reviews for a Recipe
   *
  * @param {Object} request - request object
  *
  * @param {Object} response - response object
  *
  * @returns {Object} response object
  */
  static getAll(request, response) {
    if (!isNum(request.params.recipeId, response, 'Recipe')) {
      const recipeId = parseInt(request.params.recipeId, 10);
      Review.findAndCountAll({
        where: {
          recipeId,
        },
        include: [{
          model: User,
          attributes: ['id', 'firstName', 'surname', 'image'],
        }],
        order: [
          ['createdAt', 'DESC'],
        ],
        limit: request.query.limit,
        offset: request.query.offset,
      })
        .then(({ rows, count }) => {
          if (count === 0) {
            response.status(200).json({
              status: 'Successful',
              message: 'No Reviews Posted Yet',
              reviews: []
            });
          } else {
            response.status(200).json({
              status: 'Successful',
              reviews: rows,
              pagination: paginationData(
                count,
                request.query.limit,
                request.query.offset,
              )
            });
          }
        })
        .catch(() => response.status(500).json({
          message: 'Internal Server Error'
        }));
    }
  }

  /** Deletes the user's review
   *
  * @param {Object} request - request object
  *
  * @param {Object} response - response object
  *
  * @returns {Object} response object
  */
  static delete(request, response) {
    if (!isNum(request.params.reviewId, response, 'Review')) {
      const reviewId = parseInt(request.params.reviewId, 10);
      Review.findOne({
        where: {
          id: reviewId,
        },
      })
        .then((reviewFound) => {
          if (!reviewFound) {
            response.status(404).json({
              status: 'Unsuccessful',
              message: 'Review Not Found',
            });
          } else if (reviewFound.userId === request.decoded.id) {
            reviewFound.destroy()
              .then(() => {
                response.status(200).json({
                  status: 'Successful',
                  message: 'Review has been removed',
                });
              });
          } else {
            response.status(403).json({
              status: 'Unsuccessful',
              message: 'You are Not Authorized to Remove This Review',
            });
          }
        })
        .catch(() => response.status(500).json({
          message: 'Internal Server Error'
        }));
    }
  }
}

export default Reviews;
