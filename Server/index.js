import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import handleUser from './controllers/handleUsers';
import handleRecipe from './controllers/handleRecipes';
import handleCrudRecipe from './controllers/handleCrudRecipes';
import confirmAuth from './middleware/index';

const app = express();

require('dotenv').config();
//
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', (req, res) =>
  res.status(202).send({ message: 'Please enter HTTP Request' }));

app.post('/api/v1/users/signup', handleUser.newUser);
app.post('/api/v1/users/signin', handleUser.userSignIn);
app.post('/api/v1/recipes', confirmAuth.authenticate, handleCrudRecipe.newRecipe);
app.post('/api/v1/recipes/:recipeId/reviews', confirmAuth.authenticate, handleRecipe.reviewRecipe);

app.get('/api/v1/recipes', handleCrudRecipe.allRecipes);
app.get('/api/v1/users/:userId/recipes', confirmAuth.authenticate, handleRecipe.faveRecipes);
// app.get('api/v1/recipes?sort=upvotes&order=des', handleCrudRecipe.allRecipes);

app.delete('/api/v1/recipes/:recipeId', confirmAuth.authenticate, handleCrudRecipe.deleteRecipe);
app.put('/api/v1/recipes/:recipeId', confirmAuth.authenticate, handleCrudRecipe.updateRecipe);


const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

app.listen(port);

export default app;
