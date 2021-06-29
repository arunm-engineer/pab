import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

// General:
// Route path must be a subpath of URL path to match
ReactDOM.render(
  <Router>
    <App />

    {/* Testing with plane routes */}
    {/* <Route exact path="/loginoo" component={Feed}></Route>
    <Route path="/loginoo/rum" component={Login}></Route>
    <Route path="/loginoo/some" component={Some}></Route>
    <Route path="/loginoo/rum/some" component={Signup}></Route> */}
  </Router>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
