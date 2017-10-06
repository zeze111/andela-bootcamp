import Validator from 'validatorjs';
import models from '../models';

const User = models.User;
const Recipe = models.Recipe;
const Favorite = models.Favorite;
const Review = models.Review;
const Rating = models.Rating;


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
      // attributes: ['Recipe.name', 'Recipe.description'],
      // include: [Recipe],
    }).then((faveRecipes) => {
      if (faveRecipes.length === 0) {
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
    const recipeid = parseInt(req.params.recipesId, 10);
    Recipe.findById(recipeid)
      .then((recipe) => {
        if (recipe) {
          console.log(recipe.id);
          // const sqlQuery = `INSERT INTO "Reviews" ("id","comment","createdAt","updatedAt","userId", "recipeId") VALUES (${req.body.comment}, ${req.decoded.id}, ${recipe.id}`;
          // models.sequelize.query(sqlQuery).spread((results, metadata) => {})
          Review.create({
            comment: req.body.comment,
            recipeId: recipeid,
            userId: req.decoded.id,
          })
            .then((review) => {
              res.status(200).json({
                status: 'Successful', data: review,
              });
            })
            .catch(error => res.status(400).send(error));
        } else {
          res.status(400).json({
            status: 'Unsuccessful', message: 'Recipe Not Found',
          });
        }
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
