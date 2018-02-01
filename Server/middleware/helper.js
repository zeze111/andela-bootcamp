import { Recipe } from '../models';

const findRecipe = (request, response, next) => {
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
      next();
    });
};

export default findRecipe;
