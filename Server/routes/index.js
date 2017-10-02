import handleRecipe from './handleRecipe';

export default app => {
  app.get('/', (req, res) =>
    res.status(202).send({ message: 'Welcome to More-Recipes, Please enter HTTP Request', }));
  app.get('/api/v1/recipes', Task.getAllRecipes);
  app.put('/api/v1/recipes/:recipeId', Task.updateRecipe);
  app.post('/api/v1/recipes', Task.submitRecipe);
  app.post('/api/v1/recipes/:recipeId/reviews', Task.reviewRecipe);
  app.delete('/api/v1/recipes/:recipeId', Task.deleteRecipe);
  app.get('/api/v2/recipes?sort=upvotes&order=des', Task.getAllRecipes);
}
