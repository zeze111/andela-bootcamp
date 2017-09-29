import http from 'http';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

global.recipes = [
  { id: 1, title: 'Chicken Speingrolls', details: 'wash chicken, roll in dough and fry', upvotes: 20 },
  { id: 2, title: 'Jollof Rice', details: 'wash rice, boil tomatoes with spice, mix together', upvotes: 10 },
  { id: 3, title: 'Baked Alaska', details: 'bake meringue, fill the inside, torch meringue', upvotes: 18 },
  { id: 4, title: 'Stir Fry Shrimp', details: 'Fry up vegetables, add shrimps, mix together', upvotes: 7 }];

global.reviews = [];



class Values {


  static getAllRecipes(request, response) {
    let popularRecipes = [];
    if (request.query.sort) {
      for (let i = 0; i < global.recipes.length; i++) {
        if (global.recipes[i].upvotes > 10) {
          popularRecipes.push(global.recipes[i]);
        }
      }
      response.status(200).json({
        status: 'Success', message: response.json({ Recipes: popularRecipes.sort() })
      });
    }
    response.status(200).json({
      status: 'Success', message: response.json({ Recipes: global.recipes })
    })
      .catch(error => res.status(404).json(error));
  }

  static submitRecipe(request, response) {
    if (!request.body.title || !request.body.details) {
      response.status(400).json({
        status: 'Unsuccessful', message: 'Missing data input'
      });
    }
    request.body.upvotes = 0;
    global.recipes.push(request.body);
    response.status(201).json({
      status: 'Success', message: 'Submitted Recipe'
    })
      .catch(error => res.status(404).json(error));
  }

  static updateRecipe(request, response) {
    for (let i = 0; i < global.recipes.length; i++) {
      if (global.recipes[i].id === parseInt(request.params.recipeId, 10)) {
        global.recipes[i].title = request.body.title;
        global.recipes[i].details = request.body.details;
        response.status(200).json({
          status: 'Success', message: 'Updated Recipe'
        });
      }
    }
    response.status(404).json({
      status: 'Unsuccesful', message: 'Recipe Not Found'
    })
      .catch(error => res.status(404).json(error));
  }

  static reviewRecipe(request, response) {
    for (let i = 0; i < global.recipes.length; i++) {
      if (global.recipes[i].id === parseInt(request.params.recipeId, 10)) {
        let rev = { id: global.recipes[i].id, title: global.recipes[i].title, review: request.body.review };
        global.reviews.push(rev);
        response.status(201).json({
          status: 'Submitted', message: response.json({ Reviews: global.reviews })
        });
      }
    }
    response.status(404).json({
      status: 'Not Found', message: 'Recipe not found'
    })
      .catch(error => res.status(404).json(error));
  }

  static deleteRecipe(request, response) {
    for (let i = 0; i < global.recipes.length; i++) {
      if (global.recipes[i].id === parseInt(request.params.recipeId, 10)) {
        global.recipes.splice(i, 1);
        response.status(200).json({
          status: 'Success', message: 'Recipe Deleted'
        });
      }
    }
    response.status(404).json({
      status: 'Unsuccessful', message: 'Recipe Not Found'
    })
      .catch(error => res.status(404).json(error));
  }
}

export default Values;

const app = express();

require('dotenv').config();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false, }));

app.use(bodyParser.json({ type: 'application/json', }));

app.get('/', (req, res) =>
	res.status(202).send({ message: 'Please enter: ', }));


app.get('/api/v1/recipes', Values.getAllRecipes);
app.put('/api/v1/recipes/:recipeId', Values.updateRecipe);
app.post('/api/v1/recipes', Values.submitRecipe);
app.post('/api/v1/recipes/:recipeId/reviews', Values.reviewRecipe);
app.delete('/api/v1/recipes/:recipeId', Values.deleteRecipe);
app.get('/api/v2/recipes?sort=upvotes&order=des', Values.getPopularRecipes);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

module.exports = app;
