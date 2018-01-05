import express from 'express';

import recipe from '../controllers/recipes';
import review from '../controllers/reviews';
import rating from '../controllers/ratings';
import favorite from '../controllers/favorites';
import confirmAuth from '../middleware/index';

const router = express.Router();

router.post('/', confirmAuth.authenticate, recipe.addRecipe);
router.get('/', recipe.getAllRecipes);
router.get('/:recipeId', recipe.getRecipe);
router.delete('/:recipeId', confirmAuth.authenticate, recipe.deleteRecipe);
router.put('/:recipeId', confirmAuth.authenticate, recipe.updateRecipe);
router.post('/:recipeId/favorite', confirmAuth.authenticate, favorite.faveRecipe);
router.delete('/:recipeId/recipe', confirmAuth.authenticate, favorite.deleteFavorite);
router.post('/:recipeId/upvote', confirmAuth.authenticate, rating.upvote);
router.post('/:recipeId/downvote', confirmAuth.authenticate, rating.downvote);
/* router.post('/:recipeId/reviews', confirmAuth.authenticate, review.reviewRecipe);

// router.get('api/v1/recipes?sort=upvotes&order=des', handleCrudRecipe.allRecipes);
// router.get('/?page=number', handleCrudRecipe.allRecipes);
router.get('/?search=string', recipe.searchecipe);

 */

export default router;
