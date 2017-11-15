import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';
import user from './controllers/users';
import recipe from './controllers/recipes';
import review from './controllers/reviews';
import rating from './controllers/ratings';
import favorite from './controllers/favorites';
import confirmAuth from './middleware/index';

require('dotenv').config();

const app = express();
const jsonKey = process.env.SECRET_KEY;
const compiler = webpack(webpackConfig);

//
app.set('JsonSecret', jsonKey);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ }));
app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
}));
app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
  res.status(202).sendFile(path.join(__dirname, '../client/index.html'));
});

app.post('/api/v1/users/signup', user.createUser);
app.post('/api/v1/users/signin', user.signIn);
/* app.post('/api/v1/recipes', confirmAuth.authenticate, recipe.addRecipe);
app.post('/api/v1/recipes/:recipeId/reviews', confirmAuth.authenticate, review.reviewRecipe);
app.post('/api/v1/recipes/:recipeId/favorite', confirmAuth.authenticate, favorite.faveRecipe);
app.post('/api/v1/recipes/:recipeId/upvote', confirmAuth.authenticate, rating.upvote);
app.post('/api/v1/recipes/:recipeId/downvote', confirmAuth.authenticate, rating.downvote);

app.get('/api/v1/recipes', recipe.getAllRecipes);
app.get('/api/v1/user/:userId/favorites', confirmAuth.authenticate, favorite.getFaveRecipes);
app.get('/api/v1/user/:userId/recipes', confirmAuth.authenticate, recipe.getUserRecipes);
app.get('/api/v1/recipes/:recipeId', recipe.getRecipe);
// app.get('api/v1/recipes?sort=upvotes&order=des', handleCrudRecipe.allRecipes);
// app.get('/api/v1/recipes/?page=number', handleCrudRecipe.allRecipes);

app.delete('/api/v1/recipes/:recipeId', confirmAuth.authenticate, recipe.deleteRecipe);
app.put('/api/v1/recipes/:recipeId', confirmAuth.authenticate, recipe.updateRecipe); */


const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

app.listen(port, () => {
  console.log(`App started on Port: ${port}`);
});

export default app;
