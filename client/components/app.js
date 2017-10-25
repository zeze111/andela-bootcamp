import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import homepage from './homepage'
import signupPage from './signup/signuppage'
import NavigationBar from './NavigationBar';

class App extends Component {
  render() {
    return (
      <Router>
        <div id='wrap'>
          <NavigationBar/>
            <Switch>
              <Route path='/' exact component={homepage} />
              <Route path='/signup' component={signupPage} />
            </Switch>
          </div>
    </Router>
    );
  }
}
 export default App;
