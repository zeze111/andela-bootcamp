import handleUsers from '../controllers/handleUsers';

export default app => {
  app.get('/', (req, res) =>
    res.status(202).send({ message: 'Please enter HTTP Request', }));
  app.post('/api/v1/users/signup', handleUsers.newUser);
  app.post('/api/v1/users/signin', handleUsers.userSignIn);
 //app.put('/api/v1/recipes/:recipeId', Task.updateRecipe);
  //app.post('/api/v1/recipes', Task.submitRecipe);
  //app.post('/api/v1/recipes/:recipeId/reviews', Task.reviewRecipe);
  //app.delete('/api/v1/recipes/:recipeId', Task.deleteRecipe);
  //app.get('/api/v2/recipes?sort=upvotes&order=des', Task.getAllRecipes);
}
