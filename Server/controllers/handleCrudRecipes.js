import Validator from 'validatorjs';
import Sequelize from 'sequelize';
import models from '../models';
import validations from '../shared/validations';

const Recipe = models.Recipe;
const Rating = models.Rating;
const Op = Sequelize.Op;

const handleCrudRecipe = {

  /** Creates new Recipe and stores in the Recipes table
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  newRecipe(req, res) {
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
            return res.status(400).json({
              code: 400,
              status: 'Unsuccessful',
              message: 'Cannot Create A Recipe Twice',
            });
          }
          Recipe.create({
            name: req.body.name,
            description: req.body.description,
            prepTime: req.body.prepTime,
            type: req.body.type,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            userId: req.decoded.id,
          })
            .then((recipeCreated) => {
              return res.status(201).json({
                code: 201,
                status: 'Success',
                recipeId: recipeCreated.dataValues.id,
                data: {
                  recipe: `${recipeCreated.type}: ${recipeCreated.name} ${recipeCreated.prepTime}`,
                },
              });
            }) // if unsuccessful
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    } else {
      return res.status(400).json({
        code: 400,
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
  allRecipes(req, res) {
    // returns a list of popular recipes, req has a '?' in it's header paramater
    if (req.query.sort) {
      Rating.findAll({
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
          if (popularRecipes.length === 0) {
            res.status(200).json({ // checks if list is empty
              code: 200,
              status: 'Successful',
              message: 'There are no Popular Recipes',
            });
          } else {
            res.status(200).json({
              code: 200,
              status: 'Successful',
              data: popularRecipes,
            });
          }
        })
        .catch((error) => { res.status(400).send(error); });
    } else if (req.query.page) {
      const limits = 3;   // number of records per page
      let offsets = 0;
      Recipe.findAndCountAll()
        .then((data) => {
          const page = parseInt(req.query.page, 10);      // page number
          const pages = Math.ceil(data.count / limits);
          offsets = limits * (page - 1);
          Recipe.findAll({
            attributes: ['name', 'description', 'prepTime', 'type'],
            limit: limits,
            offset: offsets,
          }).then((pagedRecipes) => {
            if (page > pages) {
              res.status(404).json({
                code: 404,
                status: 'Unsuccessful',
                message: 'Page Not Found',
              });
            }
            if (pagedRecipes.length === 0) { // checks if the table is empty
              res.status(200).json({
                code: 200,
                status: 'Successful',
                message: 'Currently No Recipes',
              });
            } else {
              res.status(200).json({
                code: 200,
                status: 'Successful',
                data: pagedRecipes,
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
      } else {
        Recipe.findAll({
          attributes: ['name', 'description', 'prepTime', 'type'],
        }).then((allRecipes) => {
          if (allRecipes.length === 0) { // checks if the table is empty
            res.status(200).json({
              code: 200,
              status: 'Successful',
              message: 'Currently No Recipes',
            });
          } else {
            res.status(200).json({
              code: 200,
              status: 'Successful',
              data: allRecipes,
            });
          }
        })
        .catch(error => res.status(400).send(error));
      }
    }
  },

  /** Updates a recipe according to User's input
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  updateRecipe(req, res) {
    const recipeid = parseInt(req.params.recipeId, 10);
    Recipe.findById(recipeid)
      .then((recipe) => {
        if (!recipe) {
          res.status(404).json({
            code: 404,
            status: 'Unsuccessful',
            message: 'Recipe Not Found',
          }); // check if recipe belongs to user
        } else if (recipe.userId === req.decoded.id) {
          if (req.body.name || req.body.description || req.body.prepTime
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
              })
                .then((updatedRecipe) => {
                  res.status(200).json({
                    code: 200,
                    status: 'Successful',
                    data: `${recipe.name} has been updated`,
                  });
                })
                .catch(error => res.status(400).send(error));
            } else {
              res.status(400).json({
                code: 400,
                status: 'Unsuccessful',
                message: 'Invalid data input',
                errors: validator.errors.all(),
              });
            }
          } else {
            res.status(400).json({
              code: 400,
              status: 'Unsuccessful',
              message: 'Must input data',
            });
          }
        } else {
          res.status(401).json({
            code: 401,
            status: 'Unsuccessful',
            message: 'You are Unauthorized',
          });
        }
      })
      .catch(error => res.status(400).send(error));
  },

  /** Deletes a Recipe from the database table
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  deleteRecipe(req, res) {
    const recipeid = parseInt(req.params.recipeId, 10);
    Recipe.findById(recipeid)
      .then((recipe) => {
        if (!recipe) {
          res.status(404).json({
            code: 404,
            status: 'Unsuccessful',
            message: 'Recipe Not Found',
          });
        } else if (recipe.userId === req.decoded.id) {
          recipe.destroy()
            .then((deletedRecipe) => {
              res.status(200).json({
                code: 200,
                status: 'Successful',
                data: `${recipe.name} has been deleted`,
              });
            })
            .catch(error => res.status(400).send(error));
        } else {
          res.status(401).json({
            code: 401,
            status: 'Unsuccessful',
            message: 'You are Unauthorized',
          });
        }
      })
      .catch(error => res.status(400).send(error));
  },

};

export default handleCrudRecipe;
