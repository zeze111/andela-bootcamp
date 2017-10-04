import models from '../models'

const User = models.User;
const Recipe = models.Recipe;
const Favorite = models.Favorite;
const Review = models.Review;
const Rating = models.Rating;

class HandleRecipe {

  /** Creates new Recipe and stores in the Recipes table */
  static newRecipe = (req, res) => {
    const recName = req.body.name;
    const recDescription = req.body.description || null;
    const recTime = req.body.prepTime;
    const recType = req.body.type;
    const recIngredients = req.body.ingredients;
    const recInstructions = req.body.instructions;
    if (recName && recTime && recType && recIngredients && recInstructions) {
      Recipe.create({ //if parameters were sent
        name: recName,
        description: recDescription,
        prepTime: recTime,
        type: recType,
        ingredients: recIngredients,
        instructions: recInstructions,
      })
        .then((recipeCreated) => {
          res.status(201).json({
            status: 'Success',
            data: {
              RecipeName: `${recipeCreated.name}`,
            },
          });
        }) //if unsuccessful
        .catch(error => res.status(400).send(error));
    } else {
      response.status(400).json({
        status: 'Unsuccessful', message: 'Missing Data Input'
      });
    }
  };

  static allRecipes = (req, res) => {
    if (req.query.sort) {
      models.sequelize.query("SELECT `Recipes`.`name`, COUNT (`Ratings`.`rate`) AS `votes` FROM `Recipes` INNER JOIN `Ratings` ON `Recipes`.`id` = `Ratings`.`recipeId` GROUP BY `Recipes`.`name` ORDER BY `votes` LIMIT 20",
      { type: models.sequelize.QueryTypes.SELECT })
        .then((popularRecipes) => {
          if (popularRecipes.length === 0) {
            res.status(200).json({
              status: 'Successful', message: 'There are no Popular Recipes'
            });
          } else {
            res.status(200).json({
              status: 'Successful', data: popularRecipes
            });
          }
        })
        .catch(error => { res.status(400).send(error) });
    } else {
      Recipe.findAll({}).then((allRecipes) => {
        if (allRecipes.length === 0) {
          res.status(200).json({
            status: 'Successful', message: 'Currently No Recipes'
          });
        } else {
          res.status(200).json({
            status: 'Successful', data: allRecipes
          });
        }
      })
        .catch(error => res.status(400).send(error));
    }
  };

  static faveRecipes = (req, res) => {
    const reqid = parseInt(req.params.userId, 10);
    Favorite.findAll({
      where: {
        userId: reqid,
      },
      include: [{
        model: Recipes,
        attributes: ['name', 'description'],
      }],
    }).then((faveRecipes) => {
      if (faveRecipes.length === 0) {
        res.status(200).json({
          status: 'Successful', message: 'You Currently Have No Favorite Recipes'
        });
      } else {
        res.status(200).json({
          status: 'Successful', data: faveRecipes
        });
      }
    })
      .catch(error => res.status(400).send(error));
  };

  static popularRecipes = (req, res) => {
    if (request.query.sort) {
      Recipe.findAll({
        attributes: ['name', 'description'[sequelize.fn('COUNT', sequelize.col('rate')), 'votes']],
        include: [{
          model: Rating,
          where: {
            id: Recipe.id,
            rate: 1
          }
        }],
        order: ['votes', 'DESC']
      })
        .then((popularRecipes) => {
          if (popularRecipes.length === 0) {
            res.status(200).json({
              status: 'Successful', message: 'There are no Popular Recipes'
            });
          } else {
            res.status(200).json({
              status: 'Successful', data: popularRecipes
            });
          }
        })
        .catch(error => res.status(400).send(error));
    }
    models.sequelize.query("SELECT `Recipes`.`name`, COUNT (`Ratings`.`rate`) AS `votes` FROM `Recipes` INNER JOIN `Ratings` ON `Recipes`.`id` = `Ratings`.`recipeId` GROUP BY `Recipes`.`name` ORDER BY `votes` LIMIT 20",
    { type: models.sequelize.QueryTypes.SELECT })
  }

  static updateRecipe = (req, res) => {
    const recipeid = parseInt(req.params.recipeId, 10);
    Recipe.findById(recipeid)
      .then((recipe) => {
        if (!recipe) {
          res.status(404).json({
            status: 'Unsuccessful', message: 'Recipe Not Found'
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
                status: 'Successful', data: `${recipe.name} has been updated`
              });
            });
        }
      })
      .catch(error => res.status(400).send(error));
  }

  static deleteRecipe = (req, res) => {
    const recipeid = parseInt(req.params.userId, 10);
    Recipe.findById(recipeid)
      .then((recipe) => {
        if (!recipe) {
          res.status(404).json({
            status: 'Unsuccessful', message: 'Recipe Not Found'
          });
        } else {
          recipe.destroy()
            .then((deletedRecipe) => {
              res.status(200).json({
                status: 'Successful', data: `${recipe.name} has been deleted`
              });
            });
        };
      })
      .catch(error => res.status(400).send(error));
  };

  static reviewRecipe = (req, res) => {
    const recipeid = parseInt(req.param.userId, 10);
    Recipe.findById(recipeid)
      .then((recipe) => {
        if (!recipe) {
          res.status(404).json({
            status: 'Unsuccessful', message: 'Recipe Not Found'
          });
        } else {
          Review.create({
            comment: req.body.comment,
          }).then((review) => {
            res.status(200).json({
              status: 'Successful', data: review
            });
          });
        }
      })
      .catch(error => res.status(400).send(error));
  }

}

export default HandleRecipe
