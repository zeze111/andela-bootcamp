import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './homepage/Homepage'
import SignupPage from './signup/Signuppage'
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import FlashMessageList from './flash/FlashMessageList';
import AddRecipePage from './addRecipe/AddRecipePage';
import UpdateRecipePage from './updateRecipe/UpdateRecipePage';
import RecipeDetails from './recipe/RecipeDetails';
import Profile from './user/Profile';
import Favorites from './user/Favorites';
import '../assets/init';


class App extends Component {
  render() {
    return (
      <Router>
        <div id='wrap'>
          <NavigationBar />
          <FlashMessageList />
          <Switch>
            <Route path='/' exact component={Homepage} />
            <Route path='/signup' component={SignupPage} />
            <Route path='/addRecipe' component={AddRecipePage} />
            <Route path='/user' component={Profile} />
            <Route path='/updateRecipe/:recipeId' component={UpdateRecipePage} />
            <Route path='/userRecipe/:recipeId' component={RecipeDetails}/>
            <Route path='/recipe/:recipeId' component={RecipeDetails}/>
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}
export default App;