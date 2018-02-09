import Validator from 'validatorjs';
import Sequelize from 'sequelize';

import { Recipe, Rating, User, Favorite } from '../models';
import validations from '../shared/validations';
import { paginationData, isNum } from '../shared/helper';

/**
 *
 * @class Recipes
 */
class Recipes {
  /** Creates new Recipe and stores in the Recipes table
   *
  * @param {Object} request - request object
  *
  * @param {Object} response - response object
  *
  * @returns {Object} response object
  */
  static create(request, response) {
    const validator = new Validator(request.body, validations.recipeRules);
    if (validator.passes()) {
      Recipe.findOne({
        where: {
          userId: request.decoded.id,
          name: request.body.name.toLowerCase(),
        },
      })
        .then((userRecipe) => {
          if (userRecipe) {
            return response.status(409).json({
              status: 'Unsuccessful',
              message: 'Cannot Create A Recipe With the Same Name',
            });
          }

          const {
            name,
            description,
            preparationTime,
            type,
            ingredients,
            instructions,
            image
          } = request.body;

          Recipe.create({
            name: name.toLowerCase().trim(),
            description: description.trim(),
            preparationTime: preparationTime.trim(),
            type,
            ingredients,
            instructions,
            image,
            userId: request.decoded.id,
          })
            .then(recipe => response.status(201).json({
              status: 'Success',
              message: `${recipe.name} has been added`,
              recipe,
            }));
        })
        .catch(() => response.status(500).json({
          message: 'Internal Server Error'
        }));
    } else {
      return response.status(422).json({
        status: 'Unsuccessful',
        message: 'Invalid data input',
        errors: validator.errors.all(),
      });
    }
  }

  /** Retrieves Popular Recipes /
   * paginated all Recipes / and all recipes
   *
  * @param {Object} request - request object
  *
  * @param {Object} response - response object
  *
  * @returns {Object} response object
  */
  static getAll(request, response) {
    if (request.query.sort) {
      return Rating.findAll({
        where: {
          vote: 1,
        },
        attributes: [
          'recipeId',
          [Sequelize.fn('count', Sequelize.col('vote')), 'upvotes']
        ],
        include: [{
          model: Recipe,
          attributes: ['name', 'type', 'preparationTime', 'image', 'views'],
        }],
        order: [
          [Sequelize.literal('upvotes'), 'DESC'],
        ],
        group: ['recipeId', 'vote', 'Recipe.id'],
        limit: 5,
      })
        .then((popularRecipes) => {
          if (popularRecipes.length === 0) {
            return response.status(200).json({
              status: 'Successful',
              message: 'There Are Currently No Popular Recipes',
              recipes: []
            });
          }
          return response.status(200).json({
            status: 'Successful',
            recipes: popularRecipes,
          });
        });
    } else if (request.query.limit && request.query.offset) {
      return Recipe.findAndCountAll({
        attributes: [
          'id',
          'name',
          'description',
          'preparationTime',
          'type',
          'ingredients',
          'image',
          'views'
        ],
        order: [
          ['createdAt', 'DESC'],
        ],
        limit: request.query.limit,
        offset: request.query.offset,
      })
        .then(({ rows, count }) => response.status(200).json({
          status: 'Successful',
          recipes: rows,
          pagination: paginationData(
            count,
            request.query.limit,
            request.query.offset
          )

        }));
    }

    return Recipe.findAll({
      attributes: [
        'id',
        'name',
        'description',
        'preparationTime',
        'type',
        'ingredients',
        'image',
        'views'
      ],
      order: [
        ['createdAt', 'DESC'],
      ],
    }).then((allRecipes) => {
      if (allRecipes.length === 0) {
        return response.status(200).json({
          status: 'Successful',
          message: 'There Are Currently No Recipes',
        });
      }
      return response.status(200).json({
        status: 'Successful',
        recipes: allRecipes,
      });
    })
      .catch(() => response.status(500).json({
        message: 'Internal Server Error'
      }));
  }

  /** Retrieves the most favorited recipes
   *
  * @param {Object} request - request object
  *
  * @param {Object} response - response object
  *
  * @returns {Object} response object
  */
  static getMostFavorited(request, response) {
    return Recipe.findAll({
      where: {
        favorites: { $gt: 0 }
      },
      order: [
        ['favorites', 'DESC']
      ],
      limit: 5
    })
      .then((popularRecipes) => {
        if (popularRecipes.length === 0) {
          return response.status(200).json({
            status: 'Successful',
            message: 'There Are Currently No Popular Recipes',
            recipes: []
          });
        }
        return response.status(200).json({
          status: 'Successful',
          recipes: popularRecipes,
        });
      })
      .catch(() => response.status(500).json({
        message: 'Internal Server Error'
      }));
  }

  /** Updates a recipe according to User's input
   *
  * @param {Object} request - request object
  *
  * @param {Object} response - response object
  *
  * @returns {Object} response object
  */
  static update(request, response) {
    if (!isNum(request.params.recipeId, response, 'Recipe')) {
      const recipeId = parseInt(request.params.recipeId, 10);
      Recipe.findById(recipeId)
        .then((recipe) => {
          if (!recipe) {
            response.status(404).json({
              status: 'Unsuccessful',
              message: 'Recipe Not Found',
            });
          } else if (recipe.userId === request.decoded.id) {
            const {
              name,
              description,
              preparationTime,
              image,
              type,
              ingredients,
              instructions
            } = request.body;
            if (name || description || preparationTime || image
              || type || ingredients || instructions) {
              const validator = new Validator(
                request.body,
                validations.updateRecipeRules
              );
              if (validator.passes()) {
                recipe.update({
                  name: name || recipe.name,
                  description: description || recipe.description,
                  preparationTime: preparationTime || recipe.preparationTime,
                  type: type || recipe.type,
                  ingredients: ingredients || recipe.ingredients,
                  instructions: instructions || recipe.instructions,
                  image: image || recipe.image,
                })
                  .then((updatedRecipe) => {
                    response.status(200).json({
                      status: 'Successful',
                      message: `${updatedRecipe.name} hace been updated`,
                      recipe: {
                        name: updatedRecipe.name,
                        description: updatedRecipe.description,
                        preparationTime: updatedRecipe.preparationTime,
                        type: updatedRecipe.type,
                        ingredients: updatedRecipe.ingredients,
                        instructions: updatedRecipe.instructions,
                        image: updatedRecipe.image,
                      },
                    });
                  });
              } else {
                response.status(422).json({
                  status: 'Unsuccessful',
                  message: 'Invalid data input',
                  errors: validator.errors.all(),
                });
              }
            } else {
              response.status(400).json({
                status: 'Unsuccessful',
                message: 'Must input data',
              });
            }
          } else {
            response.status(403).json({
              status: 'Unsuccessful',
              message: 'You are Not Authorized to Update This Recipe',
            });
          }
        })
        .catch(() => response.status(500).json({
          message: 'Internal Server Error'
        }));
    }
  }

  /** Deletes a Recipe from the database table
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
      Recipe.findById(recipeId)
        .then((recipe) => {
          if (!recipe) {
            response.status(404).json({
              status: 'Unsuccessful',
              message: 'Recipe Not Found',
            });
          } else if (recipe.userId === request.decoded.id) {
            recipe.destroy()
              .then(() => {
                response.status(200).json({
                  status: 'Successful',
                  message: `${recipe.name} has been deleted`,
                });
              })
              .catch(error => response.status(400).send(error));
          } else {
            response.status(403).json({
              status: 'Unsuccessful',
              message: 'You are Not Authorized to Delete This Recipe',
            });
          }
        })
        .catch(() => response.status(500).json({
          message: 'Internal Server Error'
        }));
    }
  }

  /** Gets a Recipe from the database table
   *
  * @param {Object} request - request object
  *
  * @param {Object} response - response object
  *
  * @returns {Object} response object
  */
  static getDetails(request, response) {
    if (!isNum(request.params.recipeId, response, 'Recipe')) {
      const recipeId = parseInt(request.params.recipeId, 10);
      let fave;
      Recipe.findOne({
        where: { id: recipeId },
        include: [{
          model: User,
          attributes: ['firstName', 'surname'],
        }],
      })
        .then((recipe) => {
          if (!recipe) {
            return response.status(404).json({
              status: 'Unsuccessful',
              message: 'Recipe Not Found',
            });
          }

          if (request.decoded) {
            if (request.decoded.id === recipe.userId &&
              recipe.check === false) {
              recipe.updateAttributes({
                check: true,
                views: recipe.views + 1
              });
            } else if (request.decoded.id !== recipe.userId) {
              recipe.updateAttributes({
                views: recipe.views + 1
              });
            }

            return Favorite.findOne({
              where: {
                recipeId,
                userId: request.decoded.id
              }
            }).then((found) => {
              if (found) {
                fave = true;
              } else {
                fave = false;
              }

              return response.status(200).json({
                status: 'Successful',
                recipe,
                fave
              });
            });
          }
          recipe.increment('views').then(() => {
            recipe.reload();
            return response.status(200).json({
              status: 'Successful',
              recipe
            });
          });
        })
        .catch(error => response.status(500).json({
          message: error.message
        }));
    }
  }

  /** Gets all the Recipes a User has submitted
   *
  * @param {Object} request - request object
  *
  * @param {Object} response - response object
  *
  * @returns {Object} response object
  */
  static getUserRecipes(request, response) {
    Recipe.findAndCountAll({
      where: { userId: request.decoded.id },
      order: [
        ['createdAt', 'DESC'],
      ],
      limit: request.query.limit,
      offset: request.query.offset,
    })
      .then(({ rows, count }) => {
        if (count === 0) {
          response.status(200).json({
            status: 'Successful',
            message: 'You Currently Have No Recipes',
            recipes: []
          });
        } else {
          response.status(200).json({
            status: 'Successful',
            recipes: rows,
            pagination: paginationData(
              count,
              request.query.limit,
              request.query.offset,
            )
          });
        }
      })
      .catch(() => response.status(500).json({
        message: 'Internal Server Error'
      }));
  }

  /** Search for a recipe by user's input
   *
  * @param {Object} request - request object
  *
  * @param {Object} response - response object
  *
  * @returns {Object} response object
  */
  static search(request, response) {
    Recipe.findAndCountAll({
      where: {
        $or: [{
          name: {
            $ilike: `%${request.params.search}%`,
          },
        },
        {
          ingredients: {
            $ilike: `%${request.params.search}%`,
          },
        }],
      },
      limit: request.query.limit,
      offset: request.query.offset,
    })
      .then(({ rows, count }) => {
        if (count === 0) {
          return response.status(200).json({
            status: 'Unsuccessful',
            message: 'Recipe(s) Not Found',
            recipes: []
          });
        }
        return response.status(200).json({
          status: 'Successful',
          recipes: rows,
          pagination: paginationData(
            count,
            request.query.limit,
            request.query.offset,
          )
        });
      })
      .catch(() => response.status(500).json({
        message: 'Internal Server Error'
      }));
  }

  /** Search for a recipe by category
   *
  * @param {Object} request - request object
  *
  * @param {Object} response - response object
  *
  * @returns {Object} response object
  */
  static getCategory(request, response) {
    Recipe.findAndCountAll({
      where: {
        type: request.params.type
      },
      order: [
        ['createdAt', 'DESC'],
      ],
      limit: request.query.limit,
      offset: request.query.offset,
    })
      .then(({ rows, count }) => {
        if (count === 0) {
          return response.status(200).json({
            status: 'Successful',
            message: 'No Recipes In That Category Yet',
            recipes: []
          });
        }
        return response.status(200).json({
          status: 'Successful',
          recipes: rows,
          pagination: paginationData(
            count,
            request.query.limit,
            request.query.offset,
          )
        });
      })
      .catch(() => response.status(500).json({
        message: 'Internal Server Error'
      }));
  }
}

export default Recipes;
