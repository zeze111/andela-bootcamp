import express from 'express';

import user from '../controllers/users';
import recipe from '../controllers/recipes';
import favorite from '../controllers/favorites';
import confirmAuth from '../middleware/index';

const router = express.Router();

router.get('/:userId/recipes', confirmAuth.authenticate, recipe.getUserRecipes);
router.get('/:userId/favorites', confirmAuth.authenticate, favorite.getFaveRecipes);

router.post('/signup', user.createUser);
router.post('/signin', user.signIn);

export default router;
