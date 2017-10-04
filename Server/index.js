import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import HandleUser from './controllers/handleUsers';
import HandleRecipe from './controllers/handleRecipes';
import auth from './auth'

const app = express();

require('dotenv').config();
//
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(bodyParser.json({ type: 'application/json', }));
app.use(auth.initialize());

app.get('/', (req, res) =>
res.status(202).send({ message: 'Please enter HTTP Request', }));

app.all(auth.authenticate())
.post('/api/v1/users/signup', HandleUser.newUser);
app.all(auth.authenticate())
.post('/api/v1/users/signin', HandleUser.userSignIn);
app.all(auth.authenticate())
.post('/api/v1/recipes', HandleRecipe.newRecipe);
app.all(auth.authenticate())
.post('/api/v1/recipes/:recipeId/reviews', HandleRecipe.reviewRecipe);

app.all(auth.authenticate())
.get('/api/v1/users/:userId/recipes', HandleRecipe.faveRecipes);

app.all(auth.authenticate())
.delete('/api/v1/recipes/:recipeId', HandleRecipe.deleteRecipe);
app.all(auth.authenticate())
.put('/api/v1/recipes/:recipeId', HandleRecipe.updateRecipe);

app.get('/api/v1/recipes', HandleRecipe.allRecipes);
app.get('api/v1/recipes?sort=upvotes&order=des', HandleRecipe.allRecipes);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

app.listen(port);

export default app;
