import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Provider } from "react-redux";
import store from './store';
import Ball from './components/Ball';
import Bat from './components/Bat';

function App() {
  return (
    // 4.
    <Provider store={store}>
      <div className="App">
        <Ball></Ball>
        <Bat></Bat>
      </div>
    </Provider>

  );
}

export default App;
