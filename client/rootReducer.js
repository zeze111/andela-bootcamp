import { combineReducers } from 'redux';

import recipeReducer from './reducers/recipeReducer';
import auth from './reducers/auth';
import favoriteReducer from './reducers/favoriteRecuder';
import ratingsReducer from './reducers/ratingsReducer';
import reviewReducer from './reducers/reviewReducer';

export default combineReducers({
  recipeReducer,
  auth,
  favoriteReducer,
  ratingsReducer,
  reviewReducer,
});
