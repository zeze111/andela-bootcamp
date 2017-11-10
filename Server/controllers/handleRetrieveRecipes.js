import models from '../models';

const User = models.User;
const Recipe = models.Recipe;
const Favorite = models.Favorite;
const Review = models.Review;
const Rating = models.Rating;

const handleRetrieve = {

  /** Retrieves all Recipes a user has favorited
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  getFaveRecipes(req, res) {
    const reqid = parseInt(req.params.userId, 10);
    if (reqid === req.decoded.id) {
      Favorite.findAll({
        where: {
          userId: reqid,
        },
        include: [{
          model: Recipe,
          attributes: ['name', 'type', 'prepTime'],
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
    })
    .catch(error => res.status(400).send(error.toString()));
  },

  getUserRecipes(req, res) {
    const reqid = parseInt(req.params.userId, 10);
    Recipe.findAll({
      where: { userId: reqid },
    })
    .then((userRecipes) => {
      if (userRecipes.length === 0) {
        res.status(200).json({ // checks if list is empty
          code: 200,
          status: 'Successful',
          message: 'You Have NOt Posted Any Recipe',
        });
      } else {
        res.status(200).json({
          code: 200,
          status: 'Successful',
          data: userRecipes,
        });
      }
    })
    .catch(error => res.status(400).send(error.toString()));
  }

};

export default handleRetrieve;
