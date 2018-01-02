import Validator from 'validatorjs';
import models from '../models';
import validations from '../shared/validations';

const { Recipe, Review } = models;

const reviews = {

  /** Creates new Recipe and stores in the Recipes table
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  reviewRecipe(req, res) {
    if (isNaN(req.params.recipeId)) {
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
                .then((comment) => {
                  res.status(201).json({
                    status: 'Successful',
                    review: comment,
                  });
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
};

export default reviews;
