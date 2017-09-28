
global.recipes = [
  { id: 1, title: 'Chicken Speingrolls', details: 'wash chicken, roll in dough and fry', upvotes: 20 },
  { id: 2, title: 'Jollof Rice', details: 'wash rice, boil tomatoes with spice, mix together', upvotes: 10 },
  { id: 3, title: 'Baked Alaska', details: 'bake meringue, fill the inside, torch meringue', upvotes: 18 },
  { id: 4, title: 'Stir Fry Shrimp', details: 'Fry up vegetables, add shrimps, mix together', upvotes: 7 }];

global.reviews = [];

class Values {


  static getAllRecipes(request, response) {
    response.status(200).json({
      status: 'Success', message: response.json({ Recipes: global.recipes })
    })
      .catch(function (err) {
        return next(err);
      });
  }

  static getReviews(request, response) {
    response.status(200).json({
      status: 'Success', message: response.json({ Reviews: global.reviews })
    })
      .catch(function (err) {
        return next(err);
      });
  }

  static getPopularRecipes(request, response) {
    response.status(200).json({
      status: 'Success', message: request.query.sort(global.recipes.upvotes)
    })
      .catch(function (err) {
        return next(err);
      });
  }

  static submitRecipe(request, response) {
    if (!request.body.title) {
      response.status(404).json({
        status: 'Not Found', message: 'title missing'
      });
    }
    request.body.upvotes = 0;
    global.recipes.push(request.body);
    response.status(200).json({
      status: 'Success', message: 'Submitted Recipe'
    })
      .catch(function (err) {
        return next(err);
      });
  }

  static updateRecipe(request, response) {
    for (let i = 0; i < global.recipes.length; i++) {
      if (global.recipes[i].id === parseInt(request.params.recipeId, 10)) {
        global.recipes[i].title = request.body.title;
        global.recipes[i].details = request.body.details;
        response.status(200).json({
          status: 'Success', message: 'updated Recipe'
        });
      }
    }
    response.status(404).json({
      status: 'Not Found', message: 'Recipe not found'
    })
      .catch(function (err) {
        return next(err);
      });
  }

  static reviewRecipe(request, response) {
    for (let i = 0; i < global.recipes.length; i++) {
      if (global.recipes[i].id === parseInt(request.params.recipeId, 10)) {
        let rev = { id: global.recipes[i].id, title: global.recipes[i].title, review: request.body.review };
        global.reviews.push(rev);
        response.status(201).json({
          status: 'Submitted', message: 'Review has been added'
        });
      }
    }
    response.status(404).json({
      status: 'Not Found', message: 'Recipe not found'
    })
      .catch(function (err) {
        return next(err);
      });
  }

  static deleteRecipe(request, response) {
    for (let i = 0; i < global.recipes.length; i++) {
      if (global.recipes[i].id === parseInt(request.params.recipeId, 10)) {
        global.recipes.splice(i, 1);
        response.status(200).json({
          status: 'Success', message: 'Recipe has been deleted'
        });
      }
    }
    response.status(404).json({
      status: 'Not Found', message: 'Recipe not found'
    })
      .catch(function (err) {
        return next(err);
      });
  }
}

export default Values;
