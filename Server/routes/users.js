import express from 'express';

import user from '../controllers/users';
import recipe from '../controllers/recipes';
import favorite from '../controllers/favorites';
import confirmAuth from '../middleware/index';

const router = express.Router();

router.get(
  '/recipes',
  confirmAuth.authenticate,
  recipe.getUserRecipes
);

router.get(
  '/favorites',
  confirmAuth.authenticate,
  favorite.getAll
);

router.get(
  '/:userId',
  confirmAuth.authenticate,
  user.getDetails
);

router.post(
  '/signup',
  user.signUp
);

router.post(
  '/signin',
  user.signIn
);

router.put(
  '/',
  confirmAuth.authenticate,
  user.update
);

router.delete(
  '/favorites/:recipeId',
  confirmAuth.authenticate,
  favorite.delete
);

export default router;
