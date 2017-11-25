import { combineReducers } from 'redux';

import addRecipe from './reducers/addRecipe';
import auth from './reducers/auth';
import flashMessages from './reducers/flashMessages';

export default combineReducers({
  addRecipe,
  auth,
  flashMessages,
});
