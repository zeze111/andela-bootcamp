import { Recipe, Favorite, User } from '../models';

const favorites = {

  /** Adds a Recipe to favorites and stores in the Favorites table
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @returns {Object} response object
  */
  faveRecipe(request, response) {
    if (Number.isNaN(request.params.recipeId)) {
      response.status(406).json({
        status: 'Unsuccessful',
        message: 'Recipe Id Must Be A Number',
      });
    } else {
      const recipeid = parseInt(request.params.recipeId, 10);
      Recipe.findOne({
        where: { id: recipeid },
      })
        .then((recipe) => {
          if (!recipe) {
            return response.status(404).json({
              status: 'Unsuccessful',
              message: 'Recipe Not Found',
            });
          }
          Favorite.findOne({
            where: {
              userId: request.decoded.id,
              recipeId: recipeid,
            },
          })
            .then((fave) => {
              if (fave) {
                fave.destroy()
                  .then(() => {
                    response.status(200).json({
                      status: 'Successful',
                      message: 'Recipe has been removed from your Favorites',
                    });
                  })
                  .catch(error => response.status(400).send(error));
              } else {
                Favorite.create({
                  userId: request.decoded.id,
                  recipeId: recipe.id,
                })
                  .then((favorited) => {
                    response.status(201).json({
                      status: 'Successful',
                      message: 'Recipe has been added to your Favorites',
                      favorite: favorited,
                    });
                  })
                  .catch(error => response.status(500).send(error));
              }
            })
            .catch(error => response.status(500).send(error));
        })
        .catch(error => response.status(500).send(error));
    }
  },

  /** Deletes a Recipe from favorites list
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @returns {Object} response object
  */
  deleteFavorite(request, response) {
    if (Number.isNaN(request.params.recipeId)) {
      response.status(406).json({
        status: 'Unsuccessful',
        message: 'Recipe Id Must Be A Number',
      });
    } else {
      const recipeid = parseInt(request.params.recipeId, 10);
      Favorite.findOne({
        where: {
          userId: request.decoded.id,
          recipeId: recipeid,
        },
      })
        .then((fave) => {
          if (!fave) {
            response.status(404).json({
              status: 'Unsuccessful',
              message: 'Favorite Not Found',
            });
          } else if (fave.userId === request.decoded.id) {
            fave.destroy()
              .then(() => {
                response.status(200).json({
                  status: 'Successful',
                  message: 'Recipe has been removed from your Favorites',
                });
              })
              .catch(error => response.status(400).send(error));
          } else {
            response.status(403).json({
              status: 'Unsuccessful',
              message: 'You are Not Aauthorized to Remove This Recipe from Favorite',
            });
          }
        })
        .catch(error => response.status(500).send(error));
    }
  },

  /** Retrieves all Recipes a user has favorited
  * @param {Object} request - request object
  * @param {Object} response - Response object
  * @returns {Object} Response object
  */
  getFaveRecipes(request, response) {
    if (Number.isNaN(request.params.userId)) {
      response.status(406).json({
        status: 'Unsuccessful',
        message: 'User Id Must Be A Number',
      });
    } else {
      const userid = parseInt(request.params.userId, 10);
      if (userid === request.decoded.id) {
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
                response.status(200).json({
                  status: 'Successful',
                  message: 'You Currently Have No Favorite Recipes',
                  favorites: []
                });
              } else {
                response.status(200).json({
                  status: 'Successful',
                  favorites: faveRecipes,
                });
              }
            });
        })
          .catch(error => response.status(400).send(error));
      } else {
        response.status(403).json({
          status: 'Unsuccessful',
          message: 'Cannot Access Another User\'s Favorites',
        });
      }
    }
  },
};

export default favorites;
