import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import users from './controllers/users';
import recipes from './controllers/recipes';
import reviews from './controllers/reviews';
import ratings from './controllers/ratings';
import favorites from './controllers/favorites';
import confirmAuth from './middleware/index';

require('dotenv').config();

const app = express();
const jsonKey = process.env.SECRET_KEY;

//
app.set('JsonSecret', jsonKey);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));


app.get('/', (req, res) =>
  res.status(202).send({ message: 'Please enter HTTP Request' }));

app.post('/api/v1/users/signup', users.createUser);
app.post('/api/v1/users/signin', users.signIn);
app.post('/api/v1/recipes', confirmAuth.authenticate, recipes.addRecipe);
app.post('/api/v1/recipes/:recipeId/reviews', confirmAuth.authenticate, reviews.reviewRecipe);
app.post('/api/v1/recipes/:recipeId/favorite', confirmAuth.authenticate, favorites.faveRecipe);
app.post('/api/v1/recipes/:recipeId/upvote', confirmAuth.authenticate, ratings.upvote);
app.post('/api/v1/recipes/:recipeId/downvote', confirmAuth.authenticate, ratings.downvote);

app.get('/api/v1/recipes', recipes.getAllRecipes);
app.get('/api/v1/user/:userId/favorites', confirmAuth.authenticate, favorites.getFaveRecipes);
app.get('/api/v1/user/:userId/recipes', confirmAuth.authenticate, recipes.getUserRecipes);
app.get('/api/v1/recipes/:recipeId', recipes.getRecipe);
// app.get('api/v1/recipes?sort=upvotes&order=des', handleCrudRecipe.allRecipes);
// app.get('/api/v1/recipes/?page=number', handleCrudRecipe.allRecipes);

app.delete('/api/v1/recipes/:recipeId', confirmAuth.authenticate, recipes.deleteRecipe);
app.put('/api/v1/recipes/:recipeId', confirmAuth.authenticate, recipes.updateRecipe);


const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

app.listen(port);

export default app;
