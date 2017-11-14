import models from '../models';

const Recipe = models.Recipe;
const Favorite = models.Favorite;

const favorites = {

  /** Adds a Recipe to favorites and stores in the Favorites table
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  faveRecipe(req, res) {
    if (isNaN(req.params.recipeId)) {
      res.status(406).json({
        status: 'Unsuccessful',
        message: 'Page Must Be A Number',
      });
    } else {
      const recipeid = parseInt(req.params.recipeId, 10);
      Recipe.findOne({
        where: { id: recipeid },
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
              recipeId: recipeid,
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
                    res.status(201).json({
                      code: 201,
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
    }
  },

  /** Retrieves all Recipes a user has favorited
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  getFaveRecipes(req, res) {
    if (isNaN(req.params.userId)) {
      res.status(406).json({
        status: 'Unsuccessful',
        message: 'Page Must Be A Number',
      });
    } else {
      const userid = parseInt(req.params.userId, 10);
      if (userid === req.decoded.id) {
        Favorite.findAll({
          where: {
            userId: userid,
          },
          include: [{
            model: Recipe,
            attributes: ['name', 'type', 'prepTime'],
          }],
        }).then((faveRecipes) => {
          if (faveRecipes.length === 0) {
            res.status(422).json({
              status: 'Unprocessable',
              message: 'You Currently Have No Favorite Recipes',
            });
          } else {
            res.status(200).json({
              status: 'Successful',
              favorites: faveRecipes,
            });
          }
        })
          .catch(error => res.status(400).send(error.toString()));
      } else {
        res.status(403).json({
          status: 'Unsuccessful',
          message: 'Cannot Access Another User\'s Favorites',
        });
      }
    }
  },
};

export default favorites;
