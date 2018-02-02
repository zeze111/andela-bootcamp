import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Homepage from './homepage/Homepage';
import SignupPage from './signup/Signuppage';
import NavigationBar from './navBar/NavigationBar';
import Footer from './Footer';
import AddRecipePage from './addRecipe/AddRecipePage';
import UpdateRecipePage from './updateRecipe/UpdateRecipePage';
import RecipeDetails from './recipe/RecipeDetails';
import Profile from './user/Profile';
import AllRecipes from './allRecipes/AllRecipes';
import ConfirmAuth from './confirmAuth';
import '../assets/init';

/**
 * @const App
 *
 * @returns {any} routes
 */
const App = () => (
  <Router>
    <div id="wrap">
      <NavigationBar />
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/add-recipe" component={ConfirmAuth(AddRecipePage)} />
        <Route path="/profile" component={ConfirmAuth(Profile)} />
        <Route path="/user/:index" component={ConfirmAuth(Profile)} />
        <Route path="/update-recipe/:recipeId" component={ConfirmAuth(UpdateRecipePage)} />
        <Route path="/user-recipes/:recipeId" component={ConfirmAuth(RecipeDetails)} />
        <Route path="/recipe/:recipeId" component={RecipeDetails} />
        <Route path="/all-recipes" component={AllRecipes} />
      </Switch>
      <Footer />
    </div>
  </Router>
);
export default App;
