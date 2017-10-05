import Validator from 'validatorjs';
import models from '../models';

const User = models.User;
const Recipe = models.Recipe;
const Rating = models.Rating;

const recipeRules = {
  name: 'required|between:2,90',
  description: 'required|between:2,140',
  prepTime: 'required|min:5',
  type: 'required',
  ingredients: 'required|min:15',
  instructions: 'required|min:10',
};

const handleCrudRecipes = {

  /** Creates new Recipe and stores in the Recipes table
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  newRecipe(req, res) {
    const validator = new Validator(req.body, recipeRules);
    if (validator.passes()) {
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
          res.status(201).json({
            status: 'Success',
            data: {
              recipeName: `${recipeCreated.name}`,
            },
          });
        }) // if unsuccessful
        .catch(error => res.status(400).send(error));
    } else {
      response.status(400).json({
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
      const sqlQuery = 'SELECT "Recipes"."name", COUNT ("Ratings"."vote") FROM "Recipes" INNER JOIN "Ratings" ON "Recipes"."id" = "Ratings"."recipeId" AND "Ratings"."vote" = 1 GROUP BY "Recipes"."name" ORDER BY "vote" LIMIT 20';
      models.sequelize.query(
        sqlQuery,
        { type: models.sequelize.QueryTypes.SELECT },
      )
        .then((popularRecipes) => {
          if (popularRecipes.length === 0) {
            res.status(200).json({ // checks if list is empty
              status: 'Successful', message: 'There are no Popular Recipes',
            });
          } else {
            res.status(200).json({
              status: 'Successful', data: popularRecipes,
            });
          }
        })
        .catch((error) => { res.status(400).send(error); });
    } else {
      Recipe.findAll({}).then((allRecipes) => {
        if (allRecipes.length === 0) { // checks if the table is empty
          res.status(200).json({
            status: 'Successful', message: 'Currently No Recipes',
          });
        } else {
          res.status(200).json({
            status: 'Successful', data: allRecipes,
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
    const recipeid = parseInt(req.params.recipeId, 10);
    Recipe.findById(recipeid)
      .then((recipe) => {
        if (!recipe) {
          res.status(404).json({
            status: 'Unsuccessful', message: 'Recipe Not Found',
          });
        } else {
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
                status: 'Successful', data: `${recipe.name} has been updated`,
              });
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
            status: 'Unsuccessful', message: 'Recipe Not Found',
          });
        } else {
          recipe.destroy()
            .then((deletedRecipe) => {
              res.status(200).json({
                status: 'Successful', data: `${recipe.name} has been deleted`,
              });
            });
        }
      })
      .catch(error => res.status(400).send(error));
  },
};

export default handleCrudRecipes;
