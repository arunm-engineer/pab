import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Cart from './Cart';
import Home from './Home';
import Product from './Product';
import { Provider } from 'react-redux';
import store from '../ShoppingStore';
import NavBar from './NavBar';
import { makeStyles } from '@material-ui/core';

export default function Ecommerce() {

    const useStyles = makeStyles({
        contentPage: {
            marginTop: "7rem"
        }
    })

    const classes = useStyles();

    return (
        <Provider store={store}>
            <NavBar></NavBar>
            <div className={classes.contentPage}>
                <Router>
                    <Switch>
                        <Route path='/cart' component={Cart}></Route>
                        <Route path='/product' component={Product}></Route>
                        <Route path='/' component={Home}></Route>
                    </Switch>
                </Router>
            </div>
        </Provider>
    )
}
