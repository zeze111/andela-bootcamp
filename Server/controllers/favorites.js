import { Recipe, Favorite, User } from '../models';
import { paginationData, isNum } from '../shared/helper';

/**
 *
 * @class Favorites
 */
class Favorites {
  /** Adds a Recipe to favorites and stores in the Favorites table
   *
  * @param {Object} request - request object
  *
  * @param {Object} response - response object
  *
  * @returns {Object} response object
  */
  static favoriteRecipe(request, response) {
    if (!isNum(request.params.recipeId, response, 'Recipe')) {
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
        });

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
              recipeId,
            })
              .then((favorited) => {
                response.status(201).json({
                  status: 'Successful',
                  message: 'Recipe has been added to your Favorites',
                  favorite: favorited,
                });
              });
          }
        })
        .catch(error => response.status(500).send(error));
    }
  }

  /** Deletes a Recipe from favorites list
   *
  * @param {Object} request - request object
  *
  * @param {Object} response - response object
  *
  * @returns {Object} response object
  */
  static delete(request, response) {
    if (!isNum(request.params.recipeId, response, 'Recipe')) {
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
          }
        })
        .catch(error => response.status(500).send(error));
    }
  }

  /** Retrieves all Recipes a user has favorited
   *
  * @param {Object} request - request object
  *
  * @param {Object} response - Response object
  *
  * @returns {Object} Response object
  */
  static getAll(request, response) {
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
        attributes: ['id', 'name', 'type', 'preparationTime'],
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
  }
}

export default Favorites;
