import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useParams } from 'react-router-dom';
import CartPage from './CartPage';
import HomePage from './HomePage';
import ProductPage from './ProductPage';
import NavBar from './NavBar';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

function Ecommerce(props) {
    const useStyles = makeStyles({
        contentPage: {
            marginTop: "7rem"
        }
    })

    const { Product } = props;
    const classes = useStyles();

    return (
        <Router>
            <NavBar></NavBar>
            <div className={classes.contentPage}>
                    <Switch>
                        <Route path='/cart' component={CartPage}></Route>
                        <Route path='/product/:id'><MapProductComponent Product={Product}/></Route>
                        <Route path='/product' component={ProductPage}></Route>
                        <Route path='/' component={HomePage}></Route>
                    </Switch>
            </div>
        </Router>
    )
}

function MapProductComponent(props) {
    const { id } = useParams();
    const { Product } = props;
    console.log(props);

    const productDetails = Product[id];
    if (productDetails) return <ProductPage ProductDetails={productDetails}/>
    else return <Redirect to='/' />
}

const mapStateToProps = store => {
    return store;
}

const mapDispatchToProps = (dispatch)  => {
    return {
        addItem: (item) => {
            return dispatch({type: "add_item", selectedItem: item});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ecommerce);