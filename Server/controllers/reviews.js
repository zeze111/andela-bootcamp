import Validator from 'validatorjs';
import { Recipe, Review, User } from '../models';
import validations from '../shared/validations';


const reviews = {

  /** Creates new Recipe and stores in the Recipes table
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  reviewRecipe(req, res) {
    if (Number.isNaN(req.params.recipeId)) {
      res.status(406).json({
        status: 'Unsuccessful',
        message: 'Recipe ID Must Be A Number',
      });
    } else {
      const recipeid = parseInt(req.params.recipeId, 10);
      Recipe.findById(recipeid)
        .then((recipe) => {
          if (recipe) {
            const validator = new Validator(req.body, validations.reviewRules);
            if (validator.passes()) {
              Review.create({
                title: req.body.title,
                comment: req.body.comment,
                recipeId: recipeid,
                userId: req.decoded.id,
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
                      res.status(201).json({
                        status: 'Successful',
                        review: createdReview,
                      });
                    })
                    .catch(error => res.status(400).send(error));
                })
                .catch(error => res.status(400).send(error));
            } else {
              res.status(406).json({
                status: 'Unsuccessful',
                message: 'Invalid data input',
                errors: validator.errors.all(),
              });
            }
          } else {
            res.status(404).json({
              status: 'Unsuccessful',
              message: 'Recipe Not Found',
            });
          }
        })
        .catch(error => res.status(400).send(error));
    }
  },

  getReviews(req, res) {
    if (Number.isNaN(req.params.recipeId)) {
      res.status(406).json({
        status: 'Unsuccessful',
        message: 'Recipe ID Must Be A Number',
      });
    } else {
      const recipeid = parseInt(req.params.recipeId, 10);
      Review.findAll({
        where: {
          recipeId: recipeid,
        },
        include: [{
          model: User,
          attributes: ['id', 'firstName', 'surname', 'image'],
        }],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
        .then((reviewsFound) => {
          if (reviewsFound.length === 0) {
            res.status(200).json({
              status: 'Successful',
              message: 'No Reviews Posted Yet',
            });
          } else {
            res.status(200).json({
              status: 'Successful',
              reviews: reviewsFound,
            });
          }
        });
    }
  },

  deletReview(req, res) {
    if (Number.isNaN(req.params.reviewId)) {
      res.status(406).json({
        status: 'Unsuccessful',
        message: 'Review ID Must Be A Number',
      });
    } else {
      const reviewid = parseInt(req.params.reviewId, 10);
      Review.findOne({
        where: {
          id: reviewid,
        },
      })
        .then((reviewFound) => {
          if (!reviewFound) {
            res.status(404).json({
              status: 'Unsuccessful',
              message: 'Review Not Found',
            });
          } else if (reviewFound.userId === req.decoded.id) {
            reviewFound.destroy()
              .then(() => {
                res.status(200).json({
                  status: 'Successful',
                  message: 'Review has been removed',
                });
              })
              .catch(error => res.status(400).send(error));
          } else {
            res.status(403).json({
              status: 'Unsuccessful',
              message: 'You are Not Aauthorized to Remove This Review',
            });
          }
        })
        .catch(error => res.status(400).send(error));
    }
  },
};

export default reviews;
