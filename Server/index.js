import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import HandleUser from './controllers/handleUsers';
import HandleRecipe from './controllers/handleRecipes';

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
app.post('/api/v1/recipes', HandleRecipe.newRecipe);
//app.post('/api/v1/recipes/:recipeId/reviews', Task.reviewRecipe)

app.get('/api/v1/recipes', HandleRecipe.allRecipes);
app.get('/api/v1/users/:<userId>/recipes', HandleRecipe.faveRecipes);
//app.get('api/v1/recipes?sort=upvotes&order=des', HandleRecipe.allRecipes);

app.delete('/api/v1/recipes/:<recipeId>', HandleRecipe.deleteRecipe);
 //app.put('/api/v1/recipes/:<recipeId>', Task.updateRecipe);
    

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

app.listen(port);

export default app;
