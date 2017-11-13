import models from '../models';

const Recipe = models.Recipe;
const Favorite = models.Favorite;

const favorite = {

  /** Adds a Recipe to favorites and stores in the Favorites table
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  faveRecipe(req, res) {
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
        Favorite.findOne({
          where: {
            userId: req.decoded.id,
            recipeId: reqid,
          },
        })
          .then((fave) => {
            if (fave) {
              fave.destroy()
                .then(() => {
                  res.status(200).json({
                    code: 200,
                    status: 'Successful',
                    message: `Recipe Id: ${fave.recipeId} has been removed from Favorites`,
                  });
                })
                .catch(error => res.status(400).send(error));
            } else {
              Favorite.create({
                userId: req.decoded.id,
                recipeId: recipe.id,
              })
                .then((favorited) => {
                  res.status(200).json({
                    code: 200,
                    status: 'Successful',
                    favorites: favorited,
                  });
                })
                .catch(error => res.status(400).send(error));
            }
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

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
            favorites: faveRecipes,
          });
        }
      })
        .catch(error => res.status(400).send(error.toString()));
    } else {
      res.status(403).json({
        code: 403,
        status: 'Unsuccessful',
        message: 'Cannot Access Another User\'s Favorites',
      });
    }
  },
};

export default favorite;
