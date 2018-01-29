import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './homepage/Homepage';
import SignupPage from './signup/Signuppage';
import NavigationBar from './navBar/NavigationBar';
import Footer from './Footer';
import AddRecipePage from './addRecipe/AddRecipePage';
import UpdateRecipePage from './updateRecipe/UpdateRecipePage';
import RecipeDetails from './recipe/RecipeDetails';
import Profile from './user/Profile';
import AllRecipes from './allRecipes/AllRecipes'
import '../assets/init';

/**
 *
 *
 * @const App
 * @returns {any} routes
 */
const App = () => (
  <Router>
    <div id="wrap">
      <NavigationBar />
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/addRecipe" component={AddRecipePage} />
        <Route path="/user" component={Profile} />
        <Route path="/updateRecipe/:recipeId" component={UpdateRecipePage} />
        <Route path="/userRecipe/:recipeId" component={RecipeDetails} />
        <Route path="/recipe/:recipeId" component={RecipeDetails} />
        <Route path="/allRecipes" component={AllRecipes} />
      </Switch>
      <Footer />
    </div>
  </Router>
);
export default App;
