import Validator from 'validatorjs';
import models from '../models';

const User = models.User;
const Recipe = models.Recipe;
const Favorite = models.Favorite;
const Review = models.Review;
const Rating = models.Rating;

const reviewRules = {
  comment: 'required|min:15',
};

const handleRecipe = {

  /** Retrieves all Recipes a user has favorited
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  faveRecipes(req, res) {
    const reqid = parseInt(req.params.userId, 10);
    Favorite.findAll({
      where: {
        userId: reqid,
      },
      include: [{
        model: 'Recipes',
        attributes: ['name', 'description'],
      }],
    }).then((faveRecipes) => {
      if (faveRecipes.length === 0) {
        console.log(reqid);
        res.status(200).json({
          status: 'Successful', message: 'You Currently Have No Favorite Recipes',
        });
      } else {
        res.status(200).json({
          status: 'Successful', data: faveRecipes,
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
  reviewRecipe(req, res) {
    const validator = new Validator(req.body, reviewRules);
    const recipeid = parseInt(req.param.recipeId, 10);
    if (validator.passes()) {
      Recipe.findById(recipeid)
        .then((recipe) => {
          if (!recipe) {
            res.status(404).json({
              status: 'Unsuccessful', message: 'Recipe Not Found',
            });
          } else {
            Review.create({
              comment: req.body.comment,
              userId: req.decoded.id,
              recipeId: recipe.recipeId,
            }).then((review) => {
              res.status(200).json({
                status: 'Successful', data: review,
              });
            });
          }
        })
        .catch(error => res.status(400).send(error));
    } res.status(400).json({
      status: 'Unsuccessful',
      message: 'Invalid data input',
      errors: validator.errors.all(),
    });
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
          return res.status(401).json({
            status: 'Unsuccessful',
            message: 'Recipe not found',
          });
        }
        res.status(200).json({
          status: 'Successful', data: recipe,
        });
      });
  },

};

export default handleRecipe;
