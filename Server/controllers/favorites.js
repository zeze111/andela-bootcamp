import { Recipe, Favorite, User } from '../models';
import { paginationData } from '../shared/helper';

const favorites = {

  /** Adds a Recipe to favorites and stores in the Favorites table
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @returns {Object} response object
  */
  favoriteRecipe(request, response) {
    if (isNaN(request.params.recipeId)) {
      response.status(406).json({
        status: 'Unsuccessful',
        message: 'Recipe Id Must Be A Number',
      });
    } else {
      const recipeId = parseInt(request.params.recipeId, 10);
      Recipe.findOne({
        where: { id: recipeId },
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
              recipeId,
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
                  });
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
                  });
              }
            });
        })
        .catch(error => response.status(500).send(error));
    }
  },

  /** Deletes a Recipe from favorites list
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @returns {Object} response object
  */
  delete(request, response) {
    if (isNaN(request.params.recipeId)) {
      response.status(406).json({
        status: 'Unsuccessful',
        message: 'Recipe Id Must Be A Number',
      });
    } else {
      const recipeId = parseInt(request.params.recipeId, 10);
      Favorite.findOne({
        where: {
          userId: request.decoded.id,
          recipeId,
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
              });
          } else {
            response.status(403).json({
              status: 'Unsuccessful',
              message: 'You are Not Authorized to Remove This Recipe from Favorite',
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
  getAll(request, response) {
    Favorite.findAll({
      where: {
        userId: request.decoded.id,
      },
      attributes: [['id', 'faveId'], 'recipeId'],
    }).then((faves) => {
      const recipeIds = [];
      faves.map(data =>
        recipeIds.push(data.dataValues.recipeId));

      Recipe.findAndCountAll({
        where: {
          id: recipeIds,
        },
        attributes: ['id', 'name', 'type', 'prepTime'],
        include: [{
          model: User,
          attributes: ['firstName', 'surname'],
        }],
        limit: request.query.limit,
        offset: request.query.offset,
      })
        .then(({ rows, count }) => {
          if (count === 0) {
            response.status(200).json({
              status: 'Successful',
              message: 'You Currently Have No Favorite Recipes',
              favorites: []
            });
          } else {
            response.status(200).json({
              status: 'Successful',
              favorites: rows,
              pagination: paginationData(
                count,
                request.query.limit,
                request.query.offset,
              )
            });
          }
        });
    })
      .catch(error => response.status(500).send(error));
  },
};

export default favorites;
