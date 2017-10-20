import Validator from 'validatorjs';
import models from '../models';

const User = models.User;
const Recipe = models.Recipe;
const Rating = models.Rating;

const recipeRules = {
  name: 'required|between:2,90',
  description: 'between:2,140',
  prepTime: 'required|min:5',
  type: 'required',
  ingredients: 'required|min:15',
  instructions: 'required|min:10',
};

const updateRecipeRules = {
  name: 'between:2,90',
  description: 'between:3,140',
  prepTime: 'between:2,90',
  type: 'between:4,90',
  ingredients: 'between:5,1200',
  instructions: 'between:10,1200',
};

const handleCrudRecipe = {

  /** Creates new Recipe and stores in the Recipes table
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  newRecipe(req, res) {
    const validator = new Validator(req.body, recipeRules);
    if (validator.passes()) {
      Recipe.findOne({
        where: { userId: req.decoded.id },
      })
        .then((userRecipe) => {
          if (userRecipe) {
            if (userRecipe.name === req.body.name || userRecipe.ingredients === req.body.ingredients) {
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
                    recipeName: `${recipeCreated.type}: ${recipeCreated.name} ${recipeCreated.description}`,
                  },
                });
              }) // if unsuccessful
              .catch(error => res.status(400).send(error));

          } else {
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
                    recipeName: `${recipeCreated.type}: ${recipeCreated.name} ${recipeCreated.description}`,
                  },
                });
              }) // if unsuccessful
              .catch(error => res.status(400).send(error));
          }
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
    // returns a list of popular recipes req has a '?' in it's header paramater
    if (req.query.sort) {
      const sqlQuery = 'SELECT "Recipes"."name", COUNT ("Ratings"."vote") FROM "Recipes" INNER JOIN "Ratings" ON "Recipes"."id" = "Ratings"."recipeId" AND "Ratings"."vote" = 1 GROUP BY "Recipes"."name", "Ratings"."vote" ORDER BY "Ratings"."vote" desc LIMIT 20';
      models.sequelize.query(
        sqlQuery,
        { type: models.sequelize.QueryTypes.SELECT },
      )
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
    } else {
      Recipe.findAll({}).then((allRecipes) => {
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
  },

  /** Updates a recipe according to User's input
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  updateRecipe(req, res) {
    console.log(req.body);
    const recipeid = parseInt(req.params.recipeId, 10);
    Recipe.findById(recipeid)
      .then((recipe) => {
        if (!recipe) {
          res.status(404).json({
            code: 404,
            status: 'Unsuccessful',
            message: 'Recipe Not Found',
          });
        } else if (req.body.name || req.body.description || req.body.prepTime
          || req.body.type || req.body.ingredients || req.body.instructions) {
          const validator = new Validator(req.body, updateRecipeRules);
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
        } else {
          recipe.destroy()
            .then((deletedRecipe) => {
              res.status(200).json({
                code: 200,
                status: 'Successful',
                data: `${recipe.name} has been deleted`,
              });
            })
            .catch(error => res.status(400).send(error));
        }
      })
      .catch(error => res.status(400).send(error));
  },

};

export default handleCrudRecipe;
