const promise = require('bluebird');
const options = {promiseLib: promise};

const pgp = require('pg-promise')(options);
const pgp = require('pg-promise')(options);
const connectionString = 'postgres://localhost:5432/recipes';
const db = pgp(connectionString);

module.exports = {
  getAllRecipes: getAllRecipes,
  getSingleRecipe: getSingleRecipe,
  createRecipe: createRecipe,
  updateRecipe: updateRecipe,
  deleteRecipe: deleteRecipe
};
