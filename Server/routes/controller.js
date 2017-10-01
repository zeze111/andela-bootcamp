
global.recipes = [
  { id: 1, title: 'Chicken Speingrolls', details: 'wash chicken, roll in dough and fry', upvotes: 20 },
  { id: 2, title: 'Jollof Rice', details: 'wash rice, boil tomatoes with spice, mix together', upvotes: 10 },
  { id: 3, title: 'Baked Alaska', details: 'bake meringue, fill the inside, torch meringue', upvotes: 18 },
  { id: 4, title: 'Stir Fry Shrimp', details: 'Fry up vegetables, add shrimps, mix together', upvotes: 7 }];

global.reviews = [];



class Task {


  static getAllRecipes(request, response) {
    let popularRecipes = [];
    if (request.query.sort) {
      for (let i = 0; i < global.recipes.length; i++) {
        if (global.recipes[i].upvotes > 10) {
          popularRecipes.push(global.recipes[i]);
        }
      }
      return response.status(200).json({
        status: 'Success', message: { Recipes: popularRecipes.sort() }
      });
    }
    response.status(200).json({
      status: 'Success', message: { Recipes: global.recipes }
    })

  }

  static submitRecipe(request, response) {
    if (!request.body.title || !request.body.details) {
      return response.status(400).json({
        status: 'Unsuccessful', message: 'Missing data input'
      });
    }
    request.body.upvotes = 0;
    global.recipes.push(request.body);
    return response.status(201).json({
      status: 'Success', message: 'Submitted Recipe'
    })

  }

  static updateRecipe(request, response) {
    for (let i = 0; i < global.recipes.length; i++) {
      if (global.recipes[i].id === parseInt(request.params.recipeId, 10)) {
        global.recipes[i].title = request.body.title;
        global.recipes[i].details = request.body.details;
        return response.status(200).json({
          status: 'Success', message: 'Updated Recipe'
        });
      }
    }
    return response.status(404).json({
      status: 'Unsuccesful', message: 'Recipe Not Found'
    })

  }

  static reviewRecipe(request, response) {
    for (let i = 0; i < global.recipes.length; i++) {
      if (global.recipes[i].id === parseInt(request.params.recipeId, 10)) {
        let rev = { id: global.recipes[i].id, title: global.recipes[i].title, review: request.body.review };
        global.reviews.push(rev);
        return response.status(201).json({
          status: 'Submitted', message: { Reviews: global.reviews }
        });
      }
    }
    response.status(404).json({
      status: 'Not Found', message: 'Recipe not found'
    })

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

  }
}

export default Task;

