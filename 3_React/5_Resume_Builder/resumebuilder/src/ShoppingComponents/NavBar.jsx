import React from 'react';
import { makeStyles, AppBar, Toolbar } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

function NavBar(props) {
    const useStyles = makeStyles({
        toolbar: {
            display: "flex",
            width: "90%",
            justifyContent: "space-between",
            margin: "auto"
        },
        cartIconBox: {
            display: "flex",
            flexDirection: "column",
        }
    })

    const classes = useStyles();
    const { Cart } = props;

    const numberOfItems = (items) => {
        let quantitySumOfItems = 0;
        items.forEach(item => quantitySumOfItems += Number(item.quantity));
        return quantitySumOfItems;
    }

    return (
        <AppBar>
            <Toolbar className={classes.toolbar}>
                <h2>Redux Shopping</h2>
                <div className={classes.cartIconBox}>
                    <div style={{textAlign: "center"}}>{numberOfItems(Cart.items)}</div>
                    <Link to='/cart'
                    style={{textDecoration:"none", color: "inherit"}}>
                        <ShoppingCartIcon></ShoppingCartIcon>
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    )
}

const mapToStateProps = (store) => {
    return store;
}

export default connect(mapToStateProps)(NavBar);
