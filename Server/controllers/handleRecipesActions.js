import Validator from 'validatorjs';
import models from '../models';

const User = models.User;
const Recipe = models.Recipe;
const Favorite = models.Favorite;
const Review = models.Review;
const Rating = models.Rating;

const recipeRules = {
  comment: 'required|min:10',
};

const handleRecipe = {

  /** Retrieves all Recipes a user has favorited
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  faveRecipes(req, res) {
    const reqid = parseInt(req.params.userId, 10);
    if (reqid === req.decoded.id) {
      Favorite.findAll({
        where: {
          id: reqid,
        },
        include: [{
          model: Recipe,
          attributes: ['name', 'description'],
        }],
      }).then((faveRecipes) => {
        if (faveRecipes.length === 0) {
          res.status(200).json({
            code: 200,
            status: 'Successful',
            message: 'You Currently Have No Favorite Recipes',
          });
        } else {
          res.status(200).json({
            code: 200,
            status: 'Successful',
            data: faveRecipes,
          });
        }
      })
        .catch(error => res.status(400).send(error.toString()));
    } else {
      res.status(401).json({
        code: 401,
        status: 'Unsuccessful',
        message: 'You are Unauthorized',
      });
    }
  },

  /** Creates new Recipe and stores in the Recipes table
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  reviewRecipe(req, res) {
    const recipeid = parseInt(req.params.recipeId, 10);
    Recipe.findById(recipeid)
      .then((recipe) => {
        if (recipe) {
          const validator = new Validator(req.body, recipeRules);
          if (validator.passes()) {
            Review.create({
              comment: req.body.comment,
              recipeId: recipeid,
              userId: req.decoded.id,
            })
              .then((review) => {
                res.status(200).json({
                  code: 200,
                  status: 'Successful',
                  data: review,
                });
              })
              .catch(error => res.status(400).send(error));
          } else {
            res.status(400).json({
              code: 400,
              status: 'Unsuccessful',
              message: 'Invalid data input',
              errors: validator.errors.all(),
            });
          }
        } else {
          res.status(404).json({
            code: 404,
            status: 'Unsuccessful',
            message: 'Recipe Not Found',
          });
        }
      })
      .catch(error => res.status(400).send(error));
  },

  /** Creates new Recipe and stores in the Recipes table
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  upvote(req, res) {
    const reqid = parseInt(req.params.recipeId, 10);
    Recipe.findOne({
      where: { id: reqid },
    })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({
          code: 404,
          status: 'Unsuccessful',
          message: 'Recipe Not Found',
        });
      } else {
        Rating.findOne({
          where: {
            userId: req.decoded.id,
            recipeId: reqid
          }
        })
        .then((votes) => {
          if (votes) {
            if (votes.vote === 0) {
              votes.update({
                vote: 1,
              })
              .then((upvote) => {
                res.status(200).json({
                  code: 200,
                  status: 'Successful',
                  data: upvote,
                })
                .catch(error => res.status(400).send(error));
              })
              .catch(error => res.status(400).send(error));
            } else if (votes.vote === 1) {
            votes.destroy()
            .then((novote) => {
              res.status(200).json({
                code: 200,
                status: 'Successful',
                message: 'No Votes Recorded'
              });
            })
          }
         } else {
            Rating.create({
              vote: 1,
              userId: req.decoded.id,
              recipeId: recipe.id,
            })
            .then((rating) => {
              res.status(200).json({
                code: 200,
                status: 'Successful',
                data: rating,
              })
            })
            .catch(error => res.status(400).send(error));
          }
        })
      }
    })
  },

  /** Creates new Recipe and stores in the Recipes table
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  downvote(req, res) {
    const reqid = parseInt(req.params.recipeId, 10);
    Recipe.findOne({
      where: { id: reqid },
    })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({
          code: 404,
          status: 'Unsuccessful',
          message: 'Recipe Not Found',
        });
      } else {
        Rating.findOne({
          where: {
            userId: req.decoded.id,
            recipeId: reqid
          }
        })
        .then((votes) => {
          if (votes) {
            if (votes.vote === 1) {
              votes.update({
                vote: 0,
              })
              .then((downvote) => {
                res.status(200).json({
                  code: 200,
                  status: 'Successful',
                  data: downvote,
                })
                .catch(error => res.status(400).send(error));
              })
              .catch(error => res.status(400).send(error));
            } else if (votes.vote === 0) {
            votes.destroy()
            .then((novote) => {
              res.status(200).json({
                code: 200,
                status: 'Successful',
                message: 'No Votes Recorded'
              });
            })
          }
         } else {
            Rating.create({
              vote: 0,
              userId: req.decoded.id,
              recipeId: recipe.id,
            })
            .then((rating) => {
              res.status(200).json({
                code: 200,
                status: 'Successful',
                data: rating,
              })
            })
            .catch(error => res.status(400).send(error));
          }
        })
      }
    })
  },

  /** Creates new Recipe and stores in the Recipes table
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  getRecipe(req, res) {
    const reqid = parseInt(req.params.recipeId, 10);
    Recipe.findOne({
      where: { id: reqid },
    })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).json({
            code: 404,
            status: 'Unsuccessful',
            message: 'Recipe Not Found',
          });
        }
        res.status(200).json({
          code: 200,
          status: 'Successful',
          data: recipe,
        });
      });
  },

};

export default handleRecipe;
