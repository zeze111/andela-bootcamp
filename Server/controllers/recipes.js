import Validator from 'validatorjs';
import Sequelize from 'sequelize';
import { Recipe, Rating } from '../models';
import validations from '../shared/validations';


const recipes = {

  /** Creates new Recipe and stores in the Recipes table
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  addRecipe(req, res) {
    const validator = new Validator(req.body, validations.recipeRules);
    if (validator.passes()) {
      Recipe.findOne({
        where: {
          userId: req.decoded.id,
          name: req.body.name,
        },
      })
        .then((userRecipe) => {
          if (userRecipe) {
            return res.status(409).json({
              status: 'Unsuccessful',
              message: 'Cannot Create A Recipe With the Same Name',
            });
          }
          Recipe.create({
            name: req.body.name.trim(),
            description: req.body.description.trim(),
            prepTime: req.body.prepTime.trim(),
            type: req.body.type,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            image: req.body.image,
            userId: req.decoded.id,
          })
            .then((recipe) => {
              return res.status(201).json({
                status: 'Success',
                recipeId: recipe.dataValues.id,
                recipe,
              });
            }) // if unsuccessful
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    } else {
      return res.status(406).json({
        status: 'Unsuccessful',
        message: 'Invalid data input',
        errors: validator.errors.all(),
      });
    }
  },

  /** Retrieves Popular Recipes / all Recipes in the database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  getAllRecipes(req, res) {
    // returns a list of popular recipes, req has a '?' in it's header paramater
    if (req.query.sort) {
      return Rating.findAll({
        where: {
          vote: 1,
        },
        attributes: ['recipeId', [Sequelize.fn('count', Sequelize.col('vote')), 'Upvotes']],
        include: [{
          model: Recipe,
          attributes: ['name', 'type', 'prepTime'],
        }],
        order: [
          ['vote', 'DESC'],
        ],
        group: ['recipeId', 'vote', 'Recipe.id'],
        limit: 5,
      })
        .then((popularRecipes) => {
          if (popularRecipes.length === 0) { // checks if list is empty
            res.status(422).json({
              status: 'Unprocessable',
              message: 'There are no Popular Recipes',
            });
          } else {
            res.status(200).json({
              status: 'Successful',
              drecipes: popularRecipes,
            });
          }
        })
        .catch((error) => { res.status(400).send(error); });
    } else if (req.query.page) {
      if (isNaN(req.query.page)) {
        return res.status(406).json({
          status: 'Unsuccessful',
          message: 'Page Must Be A Number',
        });
      }

      const limits = 3; // number of records per page
      let offsets = 0;
      return Recipe.findAndCountAll()
        .then((data) => {
          const page = (req.query.page <= 1) ? 1 : parseInt(req.query.page, 10); // page number
          const pages = Math.ceil(data.count / limits);
          offsets = limits * (page - 1);
          Recipe.findAll({
            attributes: ['name', 'description', 'prepTime', 'type'],
            limit: limits,
            offset: offsets,
          }).then((pagedRecipes) => {
            if (page > pages) {
              res.status(404).json({
                status: 'Unsuccessful',
                message: 'Page Not Found',
              });
            }
            if (pagedRecipes.length === 0) { // checks if the table is empty
              res.status(422).json({
                status: 'Unprocessable',
                message: 'Currently No Recipes',
              });
            } else {
              res.status(200).json({
                status: 'Successful',
                recipes: pagedRecipes,
                pageSize: limits,
                totalCount: data.count,
                currentPage: page,
                pageCount: pages,
              });
            }
          })
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }

    return Recipe.findAll({
      attributes: ['name', 'description', 'prepTime', 'type'],
      limit: 6,
    }).then((allRecipes) => {
      if (allRecipes.length === 0) { // checks if the table is empty
        res.status(422).json({
          status: 'Unprocessable',
          message: 'Currently No Recipes',
        });
      } else {
        res.status(200).json({
          status: 'Successful',
          recipes: allRecipes,
        });
      }
    })
      .catch(error => res.status(400).send(error));
  },

  /** Updates a recipe according to User's input
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  updateRecipe(req, res) {
    if (isNaN(req.params.recipeId)) {
      res.status(406).json({
        status: 'Unsuccessful',
        message: 'Recipe ID Must Be A Number',
      });
    } else {
      const recipeid = parseInt(req.params.recipeId, 10);
      Recipe.findById(recipeid)
        .then((recipe) => {
          if (!recipe) {
            res.status(404).json({
              status: 'Unsuccessful',
              message: 'Recipe Not Found',
            }); // check if recipe belongs to user
          } else if (recipe.userId === req.decoded.id) {
            if (req.body.name || req.body.description || req.body.prepTime || req.body.image
              || req.body.type || req.body.ingredients || req.body.instructions) {
              const validator = new Validator(req.body, validations.updateRecipeRules);
              if (validator.passes()) {
                recipe.update({
                  name: req.body.name || recipe.name,
                  description: req.body.description || recipe.description,
                  prepTime: req.body.prepTime || recipe.prepTime,
                  type: req.body.type || recipe.type,
                  ingredients: req.body.ingredients || recipe.ingredients,
                  instructions: req.body.instructions || recipe.instructions,
                  image: req.body.image || recipe.image,
                })
                  .then((updatedRecipe) => {
                    res.status(200).json({
                      code: 200,
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
                  })
                  .catch(error => res.status(400).send(error));
              } else {
                res.status(406).json({
                  status: 'Unsuccessful',
                  message: 'Invalid data input',
                  errors: validator.errors.all(),
                });
              }
            } else {
              res.status(406).json({
                status: 'Unsuccessful',
                message: 'Must input data',
              });
            }
          } else {
            res.status(403).json({
              status: 'Unsuccessful',
              message: 'You are Not Aauthorized to Update This Recipe',
            });
          }
        })
        .catch(error => res.status(400).send(error));
    }
  },

  /** Deletes a Recipe from the database table
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  deleteRecipe(req, res) {
    if (isNaN(req.params.recipeId)) {
      res.status(406).json({
        status: 'Unsuccessful',
        message: 'Recipe ID Must Be A Number',
      });
    } else {
      const recipeid = parseInt(req.params.recipeId, 10);
      Recipe.findById(recipeid)
        .then((recipe) => {
          if (!recipe) {
            res.status(404).json({
              status: 'Unsuccessful',
              message: 'Recipe Not Found',
            });
          } else if (recipe.userId === req.decoded.id) {
            recipe.destroy()
              .then(() => {
                res.status(200).json({
                  status: 'Successful',
                  message: `${recipe.name} has been deleted`,
                });
              })
              .catch(error => res.status(400).send(error));
          } else {
            res.status(403).json({
              status: 'Unsuccessful',
              message: 'You are Not Aauthorized to Delete This Recipe',
            });
          }
        })
        .catch(error => res.status(400).send(error));
    }
  },

  getRecipe(req, res) {
    if (isNaN(req.params.recipeId)) {
      res.status(406).json({
        status: 'Unsuccessful',
        message: 'Recipe ID Must Be A Number',
      });
    } else {
      const reqid = parseInt(req.params.recipeId, 10);
      Recipe.findOne({
        where: { id: reqid },
      })
        .then((recipe) => {
          if (!recipe) {
            return res.status(404).json({
              status: 'Unsuccessful',
              message: 'Recipe Not Found',
            });
          }
          res.status(200).json({
            status: 'Successful',
            recipe,
          });
        })
        .catch(error => res.status(400).send(error.toString()));
    }
  },

  getUserRecipes(req, res) {
    if (isNaN(req.params.userId)) {
      res.status(406).json({
        status: 'Unsuccessful',
        message: 'User ID Must Be A Number',
      });
    } else {
      const reqid = parseInt(req.params.userId, 10);
      Recipe.findAll({
        where: { userId: reqid },
      })
        .then((userRecipes) => {
          if (userRecipes.length === 0) { // checks if list is empty
            res.status(422).json({
              status: 'Unprocessable',
              message: 'You currently have no recipes',
            });
          } else {
            res.status(200).json({
              status: 'Successful',
              recipes: userRecipes,
            });
          }
        })
        .catch(error => res.status(400).send(error.toString()));
    }
  },
};

export default recipes;
