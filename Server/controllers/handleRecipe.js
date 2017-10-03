import {
  Recipes,
  Users,
  AboutRecipe,
} from '../models'

/** Creates new Recipe and stores in the Recipes table */

exports.newRecipe = (req, res) => {
  const recName = req.body.name;
  const recDescription = req.nody.description || null;
  const recTime = req.body.prepTime;
  const recType = req.body.type;
  const recIngredients = req.body.ingredients;
  const recInstructions = req.body.instructions;
  if (recName && recTime && recType && recIngredients && recInstructions) {
    Recipes.create({ //if parameters were sent
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

exports.allRecipes = (req, res) => {
  Recipes.all({}).then((allRecipes) => {
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
};

exports.faveRecipes = (req, res) => {
  const userid = parseInt(req.param.userId, 10);
  AboutRecipe.all({
    where: {
      users: userid,
      favorite: true,
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

exports.deleteRecipe = (req, res) => {
  const recipeid = parseInt(req.param.userId, 10);
  Recipes.findById({
    recipeid
  }).then((recipe) => {
    if (!recipe) {
      res.status(404).json({
        status: 'Unsuccessful', message: 'Recipe Not Found'
      });
    } else {
      Recipes.destroy()
        .then((deletedRecipe) => {
          res.status(200).json({
            status: 'Successful', data: faveRecipes
          });
        })
    };
  })
    .catch(error => res.status(400).send(error));
};
