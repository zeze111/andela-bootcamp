import react, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationBar from './NavigationBar';

class App extends React.component {
  render() {
    return (
      <BrowserRouter>
          <NavigationBar>
            </NavigationBar>
      </BrowserRouter>
    );
  }
}
 export default App;
