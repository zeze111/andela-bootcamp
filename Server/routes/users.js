import express from 'express';

import user from '../controllers/users';
import recipe from '../controllers/recipes';
import favorite from '../controllers/favorites';
import confirmAuth from '../middleware/index';

const router = express.Router();

router.get('/:userId/recipes', confirmAuth.authenticate, recipe.getUserRecipes);
router.get('/:userId/favorites', confirmAuth.authenticate, favorite.getFaveRecipes);
router.get('/:userId/', confirmAuth.authenticate, user.getUser);

router.post('/signup', user.createUser);
router.post('/signin', user.signIn);
router.put('/:userId', confirmAuth.authenticate, user.updateUser);

export default router;
