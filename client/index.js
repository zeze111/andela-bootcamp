import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import App from './components/app'

const store = createStore(
  (state = {}) => state,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
 
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('app')
); 
