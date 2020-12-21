import React from 'react';
import './App.css';
import {
  BrowserRouter as Router
} from "react-router-dom";

import {createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import reducer from './store'

import {Wrapper} from "./Wrapper";

const store = createStore(reducer, applyMiddleware(thunk));

function App() {

  return (
      <Provider store={store}>
        <Router>
          <Wrapper />
        </Router>
      </Provider>
  );
}

export default App;
