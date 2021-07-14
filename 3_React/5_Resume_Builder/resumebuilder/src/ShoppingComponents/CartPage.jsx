import React, { useState } from 'react'
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles, Card, CardMedia, CardContent, Typography, CardActions, Container, TextField } from '@material-ui/core';

function CartPage(props) {
    const useStyles = makeStyles({
        root: {
            display: "flex",
            justifyContent: "space-between"
        },
        card: {
            width: "60vw",
            height: "70vh",
            display: "flex",
            alignItems: "center",
        },
        cardMedia: {
            width: "35vw",
            height: "60vh",
            paddingLeft: "5rem",
            paddingRight: "5rem",
        },
        couponsContainer: {
            height: "7vh",
            display: "flex",
            justifyContent: "space-around",
        },
        quantityContainer: {
            width: "8vw",
        },
        couponInput: {
            width: "10vw",
            height: "6vh"
        },
        priceContainer: {
            width: "20vw",
            height: "20vh",
            position: "fixed",
            top: "7rem",
            right: "5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
        }
    })

    const [coupon, setCoupon] = useState("");
    const classes = useStyles();
    const { Cart, removeItem, itemQuantityVariation, applyCoupon } = props;
    console.log(props);

    

    return (
        <Container className={classes.root}>
            <div className={classes.cartItemsContainer}>
                {
                    (Cart.items.length===0) ? <Typography color="textSecondary" variant="h2">Oops!! Your <ShoppingCartIcon fontSize="large"></ShoppingCartIcon> is Empty</Typography>
                    : Cart.items.map(item => {
                        return (
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={item.image}
                                />
                                <CardContent>
                                    <Typography
                                        variant="h3">{item.title}</Typography>
                                    <Typography variant="body1" color="textSecondary">{item.description}</Typography>
                                    <Typography variant="h5">Rs. {item.price}</Typography>
                                    <CardActions>
                                        <Button variant="outlined" color="secondary"
                                            onClick={() => {removeItem(item)}}
                                            style={{paddingTop: "0.9rem", paddingBottom: "0.9rem"}}
                                        >Remove Item</Button>
                                        <TextField
                                            className={classes.quantityContainer}
                                            label="Quantity"
                                            type="number"
                                            variant="outlined"
                                            InputProps={{ inputProps: { min: 0, max: 10, value: `${Number(item.quantity)}` } }}
                                            onChange={(e) => {itemQuantityVariation(item, e.target.value)}}
                                        />
                                    </CardActions>
                                </CardContent>
                            </Card>
                        )
                    })
                }
            </div>
            <Card className={classes.priceContainer}>
                <Typography
                variant="h4"
                color="textSecondary"
                style={{textAlign: "center"}}>Rs. {Cart.totalPrice}</Typography>
                <div className={classes.couponsContainer}>
                    <TextField className={classes.couponInput} id="standard-basic" label="Coupon Code"
                    InputProps={{inputProps: {value: `${coupon}`}}}
                    onChange={(e) => setCoupon(e.target.value)} />
                    <Button 
                    style={{ height: "100%", width: "6vw" }} 
                    variant="contained" 
                    color="primary"
                    onClick={() => {
                        applyCoupon(coupon);
                        setCoupon("");
                        }}>Apply</Button>
                </div>
            </Card>
        </Container>
    )
}

const mapToStateProps = (store) => {
    return store;
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (item) => {
            return dispatch({ type: "remove_item", selectedItem: item });
        },
        addItem: (item) => {
            return dispatch({ type: "add_item", selectedItem: item });
        },
        itemQuantityVariation: (item, value) => {
            return dispatch({ type: "quantity_variation", selectedItem: item, value });
        },
        applyCoupon: (coupon) => {
            return dispatch({ type: "apply_coupon", coupon });
        }
    }
}

export default connect(mapToStateProps, mapDispatchToProps)(CartPage);