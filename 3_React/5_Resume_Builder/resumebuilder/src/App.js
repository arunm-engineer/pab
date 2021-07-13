import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Provider } from "react-redux";
import store from './store';
import Ball from './components/Ball';
import Bat from './components/Bat';
import Todo from './Todo/components/Todo';
import todoStore from './Todo/todoStore';
import User from './components/User';
import Ecommerce from './ShoppingComponents/Ecommerce';

function App() {
  return (

    <Ecommerce />

    // Redux example
    // 4.
    // <Provider store={store}>
    //   <div className="App">
    //     <Ball></Ball>
    //     <Bat></Bat>
    //     <User></User>
    //   </div>
    // </Provider>


    // Todo App
    // <Provider store={todoStore}>
    //     <Todo />
    // </Provider>
  );
}

export default App;
