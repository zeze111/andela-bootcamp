import Validator from 'validatorjs';
import Sequelize from 'sequelize';

import { Recipe, Rating, User } from '../models';
import validations from '../shared/validations';
import { paginationData } from '../shared/helper';

const recipes = {

  /** Creates new Recipe and stores in the Recipes table
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @returns {Object} response object
  */
  create(request, response) {
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

          Recipe.create({
            name: request.body.name.toLowerCase().trim(),
            description: request.body.description.trim(),
            prepTime: request.body.prepTime.trim(),
            type: request.body.type,
            ingredients: request.body.ingredients,
            instructions: request.body.instructions,
            image: request.body.image,
            userId: request.decoded.id,
          })
            .then(recipe => response.status(201).json({
              status: 'Success',
              recipe,
            }));
        });
    } else {
      return response.status(422).json({
        status: 'Unsuccessful',
        message: 'Invalid data input',
        errors: validator.errors.all(),
      });
    }
  },

  /** Retrieves Popular Recipes /
   * paginated all Recipes /
   * searched recipes by search input /
   * by searched categories in the database
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @returns {Object} response object
  */
  getAll(request, response) {
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
          attributes: ['name', 'type', 'prepTime', 'image'],
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
      if (Number.isNaN(request.query.page)) {
        return response.status(406).json({
          status: 'Unsuccessful',
          message: 'Page Must Be A Number',
        });
      }

      return Recipe.findAndCountAll({
        attributes: [
          'id',
          'name',
          'description',
          'prepTime',
          'type',
          'ingredients',
          'image'
        ],
        order: [
          ['createdAt', 'DESC'],
        ],
        limit: request.query.limit,
        offset: request.query.offset,
      })
        .then(({ rows, count }) => response.status(200).json({
          status: 'Successful',
          rows,
          pagination: paginationData(
            count,
            request.query.limit,
            request.query.offset
          )

        }));
    } else if (request.query.type) {
      return Recipe.findAll({
        where: {
          type: {
            $ilike: `%${request.query.type}%`,
          },
        },
        order: [
          ['createdAt', 'DESC'],
        ],
      })
        .then((recipesFound) => {
          if (recipesFound.length === 0) {
            return response.status(200).json({
              status: 'Successful',
              message: 'No Recipes In That Category Yet',
              recipes: []
            });
          }
          return response.status(200).json({
            status: 'Successful',
            recipes: recipesFound,
          });
        });
    } else if (request.query.search) {
      return Recipe.findAll({
        where: {
          $or: [{
            name: {
              $ilike: `%${request.query.search}%`,
            },
          },
          {
            ingredients: {
              $ilike: `%${request.query.search}%`,
            },
          }],
        },
      })
        .then((searchFound) => {
          if (searchFound.length === 0) {
            return response.status(200).json({
              status: 'Unsuccessful',
              message: 'Recipe(s) Not Found',
              recipes: []
            });
          }
          return response.status(200).json({
            status: 'Successful',
            recipes: searchFound,
          });
        });
    }

    return Recipe.findAll({
      attributes: [
        'id',
        'name',
        'description',
        'prepTime',
        'type',
        'ingredients',
        'image'
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
      .catch(error => response.status(500).send(error));
  },

  /** Updates a recipe according to User's input
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @returns {Object} response object
  */
  update(request, response) {
    if (Number.isNaN(request.params.recipeId)) {
      response.status(406).json({
        status: 'Unsuccessful',
        message: 'Recipe ID Must Be A Number',
      });
    } else {
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
              prepTime,
              image,
              type,
              ingredients,
              instructions
            } = request.body;
            if (name || description || prepTime || image
              || type || ingredients || instructions) {
              const validator = new Validator(
                request.body,
                validations.updateRecipeRules
              );
              if (validator.passes()) {
                recipe.update({
                  name: name || recipe.name,
                  description: description || recipe.description,
                  prepTime: prepTime || recipe.prepTime,
                  type: type || recipe.type,
                  ingredients: ingredients || recipe.ingredients,
                  instructions: instructions || recipe.instructions,
                  image: image || recipe.image,
                })
                  .then((updatedRecipe) => {
                    response.status(200).json({
                      status: 'Successful',
                      recipe: {
                        name: updatedRecipe.name,
                        description: updatedRecipe.description,
                        prepTime: updatedRecipe.prepTime,
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
        .catch(error => response.status(500).send(error));
    }
  },

  /** Deletes a Recipe from the database table
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @returns {Object} response object
  */
  delete(request, response) {
    if (Number.isNaN(request.params.recipeId)) {
      response.status(406).json({
        status: 'Unsuccessful',
        message: 'Recipe ID Must Be A Number',
      });
    } else {
      const recipeId = parseInt(request.params.I, 10);
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
                response.status(204).json({
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
        .catch(error => response.status(500).send(error));
    }
  },

  /** Gets a Recipe from the database table
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @returns {Object} response object
  */
  getDetails(request, response) {
    if (Number.isNaN(request.params.recipeId)) {
      response.status(406).json({
        status: 'Unsuccessful',
        message: 'Recipe ID Must Be A Number',
      });
    } else {
      const recipeId = parseInt(request.params.recipeId, 10);
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
          response.status(200).json({
            status: 'Successful',
            recipe,
          });
        })
        .catch(error => response.status(500).send(error));
    }
  },

  /** Gets all the Recipes a User has submitted
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @returns {Object} response object
  */
  getUserRecipes(request, response) {
    Recipe.findAll({
      where: { userId: request.decoded.id },
      order: [
        ['createdAt', 'DESC'],
      ],
    })
      .then((userRecipes) => {
        if (userRecipes.length === 0) { // checks if list is empty
          response.status(200).json({
            status: 'Successsful',
            message: 'You Currently Have No Recipes',
            recipes: []
          });
        } else {
          response.status(200).json({
            status: 'Successful',
            recipes: userRecipes,
          });
        }
      })
      .catch(error => response.status(500).send(error));
  },

};

export default recipes;
