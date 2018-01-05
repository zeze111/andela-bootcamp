import { Recipe, Favorite, User } from '../models';

const favorites = {

  /** Adds a Recipe to favorites and stores in the Favorites table
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  faveRecipe(req, res) {
    if (Number.isNaN(req.params.recipeId)) {
      res.status(406).json({
        status: 'Unsuccessful',
        message: 'Recipe Id Must Be A Number',
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
                      message: 'Recipe has been removed from your Favorites',
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
                      message: 'Recipe has been added to your Favorites',
                      favorite: favorited,
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

  deleteFavorite(req, res) {
    if (Number.isNaN(req.params.recipeId)) {
      res.status(406).json({
        status: 'Unsuccessful',
        message: 'Recipe Id Must Be A Number',
      });
    } else {
      const recipeid = parseInt(req.params.recipeId, 10);
      Favorite.findOne({
        where: {
          userId: req.decoded.id,
          recipeId: recipeid,
        },
      })
        .then((fave) => {
          if (!fave) {
            res.status(404).json({
              status: 'Unsuccessful',
              message: 'Favorite Not Found',
            });
          } else if (fave.userId === req.decoded.id) {
            fave.destroy()
              .then(() => {
                res.status(200).json({
                  code: 200,
                  status: 'Successful',
                  message: 'Recipe has been removed from your Favorites',
                });
              })
              .catch(error => res.status(400).send(error));
          } else {
            res.status(403).json({
              status: 'Unsuccessful',
              message: 'You are Not Aauthorized to Remove This Recipe from Favorite',
            });
          }
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
    if (Number.isNaN(req.params.userId)) {
      res.status(406).json({
        status: 'Unsuccessful',
        message: 'User Id Must Be A Number',
      });
    } else {
      const userid = parseInt(req.params.userId, 10);
      if (userid === req.decoded.id) {
        Favorite.findAll({
          where: {
            userId: userid,
          },
          attributes: [['id', 'faveId'], 'recipeId'],
        }).then((faves) => {
          const recipeIds = [];
          faves.map((data) => {
            recipeIds.push(data.dataValues.recipeId);
          });

          Recipe.findAll({
            where: {
              id: recipeIds,
            },
            attributes: ['id', 'name', 'type', 'prepTime'],
            include: [{
              model: User,
              attributes: ['firstName', 'surname'],
            }],
          })
            .then((faveRecipes) => {
              if (faveRecipes.length === 0) {
                res.status(200).json({
                  status: 'Successful',
                  message: 'You Currently Have No Favorite Recipes',
                });
              } else {
                res.status(200).json({
                  status: 'Successful',
                  favorites: faveRecipes,
                });
              }
            });
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
