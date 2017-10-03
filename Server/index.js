import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import HandleUser from './controllers/handleUsers';

const app = express();

require('dotenv').config();
//routes 
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(bodyParser.json({ type: 'application/json', }));

app.get('/', (req, res) =>
res.status(202).send({ message: 'Please enter HTTP Request', }));
app.post('/api/v1/users/signup', HandleUser.newUser);
app.post('/api/v1/users/signin', HandleUser.userSignIn);
 //app.put('/api/v1/recipes/:recipeId', Task.updateRecipe);
  //app.post('/api/v1/recipes', Task.submitRecipe);
  //app.post('/api/v1/recipes/:recipeId/reviews', Task.reviewRecipe);
  //app.delete('/api/v1/recipes/:recipeId', Task.deleteRecipe);
  //app.get('/api/v2/recipes?sort=upvotes&order=des', Task.getAllRecipes);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

app.listen(port);

export default app;
