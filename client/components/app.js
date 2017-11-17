import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import homepage from './homepage/homepage'
import signupPage from './signup/signuppage'
import NavigationBar from './NavigationBar';
import Footer from './footer';
import FlashMessageList from './flash/flashMessageList';
import '../assets/init';

class App extends Component {
  render() {
    return (
      <Router>
        <div id='wrap'>
          <NavigationBar/>
          <FlashMessageList/>
            <Switch>
              <Route path='/' exact component={homepage} />
              <Route path='/signup' component={signupPage} />
            </Switch>
            <Footer/>
          </div>
    </Router>
    );
  }
}
 export default App;
