'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

global.recipes = [{ id: 1, title: 'Chicken Speingrolls', details: 'wash chicken, roll in dough and fry', upvotes: 20 }, { id: 2, title: 'Jollof Rice', details: 'wash rice, boil tomatoes with spice, mix together', upvotes: 10 }, { id: 3, title: 'Baked Alaska', details: 'bake meringue, fill the inside, torch meringue', upvotes: 18 }, { id: 4, title: 'Stir Fry Shrimp', details: 'Fry up vegetables, add shrimps, mix together', upvotes: 7 }];

global.reviews = [];

var Values = function () {
  function Values() {
    _classCallCheck(this, Values);
  }

  _createClass(Values, null, [{
    key: 'getAllRecipes',
    value: function getAllRecipes(request, response) {
      response.status(200).json({
        status: 'Success', message: response.json({ Recipes: global.recipes })
      }).catch(function (error) {
        return res.status(404).json(error);
      });
    }
  }, {
    key: 'getPopularRecipes',
    value: function getPopularRecipes(request, response) {
      for (i = 0; i < global.recipe.length; i++) {
        if (global.recipes[i].upvotes > 10) {
          response.status(200).json({
            status: 'Success', message: request.query.sort({ Recipessss: global.recipes[i] })
          }).catch(function (error) {
            return res.status(404).json(error);
          });
        }
      }
    }
  }, {
    key: 'submitRecipe',
    value: function submitRecipe(request, response) {
      if (!request.body.title) {
        response.status(400).json({
          status: 'Unsuccessful', message: 'Missing data input'
        });
      }
      request.body.upvotes = 0;
      global.recipes.push(request.body);
      response.status(201).json({
        status: 'Success', message: 'Submitted Recipe'
      }).catch(function (error) {
        return res.status(404).json(error);
      });
    }
  }, {
    key: 'updateRecipe',
    value: function updateRecipe(request, response) {
      for (var _i = 0; _i < global.recipes.length; _i++) {
        if (global.recipes[_i].id === parseInt(request.params.recipeId, 10)) {
          global.recipes[_i].title = request.body.title;
          global.recipes[_i].details = request.body.details;
          response.status(200).json({
            status: 'Success', message: 'Updated Recipe'
          });
        }
      }
      response.status(404).json({
        status: 'Unsuccesful', message: 'Recipe Not Found'
      }).catch(function (error) {
        return res.status(404).json(error);
      });
    }
  }, {
    key: 'reviewRecipe',
    value: function reviewRecipe(request, response) {
      for (var _i2 = 0; _i2 < global.recipes.length; _i2++) {
        if (global.recipes[_i2].id === parseInt(request.params.recipeId, 10)) {
          var rev = { id: global.recipes[_i2].id, title: global.recipes[_i2].title, review: request.body.review };
          global.reviews.push(rev);
          response.status(201).json({
            status: 'Submitted', message: response.json({ Reviews: global.reviews })
          });
        }
      }
      response.status(404).json({
        status: 'Not Found', message: 'Recipe not found'
      }).catch(function (error) {
        return res.status(404).json(error);
      });
    }
  }, {
    key: 'deleteRecipe',
    value: function deleteRecipe(request, response) {
      for (var _i3 = 0; _i3 < global.recipes.length; _i3++) {
        if (global.recipes[_i3].id === parseInt(request.params.recipeId, 10)) {
          global.recipes.splice(_i3, 1);
          response.status(200).json({
            status: 'Success', message: 'Recipe Deleted'
          });
        }
      }
      response.status(404).json({
        status: 'Unsuccessful', message: 'Recipe Not Found'
      }).catch(function (error) {
        return res.status(404).json(error);
      });
    }
  }]);

  return Values;
}();

var app = (0, _express2.default)();

require('dotenv').config();

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use(_bodyParser2.default.json({ type: 'application/json' }));

app.get('/', function (req, res) {
  return res.status(202).send({ message: 'Please enter:  /api/v1/recipes, /api/v1/recipes/:recipeId, /api/v1/recipes, /api/v1/recipes/:recipeId/reviews, /api/v1/recipes/:recipeId, /api/v2/recipes?sort=upvotes&order=des' });
});

app.get('/api/v1/recipes', Values.getAllRecipes);
app.put('/api/v1/recipes/:recipeId', Values.updateRecipe);
app.post('/api/v1/recipes', Values.submitRecipe);
app.post('/api/v1/recipes/:recipeId/reviews', Values.reviewRecipe);
app.delete('/api/v1/recipes/:recipeId', Values.deleteRecipe);
app.get('/api/v2/recipes?sort=upvotes&order=des', Values.getPopularRecipes);

var port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

var server = _http2.default.createServer(app);
server.listen(port);

module.exports = app;
