import handleRecipe from '../controllers/handleRecipe';
import handleUsers from '../controllers/handleUsers'

export default app => {
  app.get('/', (req, res) =>
    res.status(202).send({ message: 'Welcome to More-Recipes, Please enter HTTP Request', }));
  app.get('/api/v1/recipes', handleRecipe.allRecipes);
  app.get('/api/v1/users/<userId>/recipes', handleRecipe.faveRecipes);

  //app.put('/api/v1/recipes/:recipeId', Task.updateRecipe);

  app.post('/api/v1/recipes', handleRecipe.createRecipe);
  app.post('/api/v1/users/signup', handleUsers.newUser);
  app.post(' /api/v1/users/signin', handleUsers.userSignIn);

  //app.post('/api/v1/recipes/:recipeId/reviews', Task.reviewRecipe);
  app.delete('/api/v1/recipes/:recipeId', handleRecipe.deleteRecipe);
  // app.get('/api/v2/recipes?sort=upvotes&order=des', Task.getAllRecipes);
}
