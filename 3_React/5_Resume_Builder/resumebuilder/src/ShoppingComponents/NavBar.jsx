import React from 'react';
import { makeStyles, AppBar, Toolbar } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { connect } from 'react-redux';

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
    console.log(Cart);

    return (
        <AppBar>
            <Toolbar className={classes.toolbar}>
                <h2>Redux Shopping</h2>
                <div className={classes.cartIconBox}>
                    <div style={{textAlign: "center"}}>{Cart.items.length}</div>
                    <ShoppingCartIcon></ShoppingCartIcon>
                </div>
            </Toolbar>
        </AppBar>
    )
}

const mapToStateProps = (store) => {
    return store;
}

export default connect(mapToStateProps)(NavBar);
