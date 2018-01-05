import { combineReducers } from 'redux';

import recipeReducer from './reducers/recipeReducer';
import auth from './reducers/auth';
import favoriteReducer from './reducers/favoriteRecuder';
import flashMessages from './reducers/flashMessages';

export default combineReducers({
  recipeReducer,
  auth,
  favoriteReducer,
  flashMessages,
});
