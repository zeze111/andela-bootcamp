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
