import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './homepage/Homepage'
import SignupPage from './signup/Signuppage'
import NavigationBar from './NavigationBar';
<<<<<<< HEAD:client/components/App.jsx
import Footer from './Footer';
import FlashMessageList from './flash/FlashMessageList';
=======
import Footer from './footer';
import FlashMessageList from './flash/flashMessageList';
import '../assets/init';
>>>>>>> 6d8ac17797c1b40d749c3c6eb2dc4070335c6716:client/components/app.js

class App extends Component {
  render() {
    return (
      <Router>
        <div id='wrap'>
          <NavigationBar/>
          <FlashMessageList/>
            <Switch>
              <Route path='/' exact component={Homepage} />
              <Route path='/signup' component={SignupPage} />
            </Switch>
            <Footer/>
          </div>
    </Router>
    );
  }
}
 export default App;
