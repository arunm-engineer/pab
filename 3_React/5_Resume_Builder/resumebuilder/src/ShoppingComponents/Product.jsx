import React from 'react';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import { makeStyles, Card, CardMedia, CardContent, Typography, CardActions } from '@material-ui/core';


function Product(props) {
    const useStyles = makeStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3rem"
        },
        card: {
            width: "70vw",
            height: "85vh",
            display: "flex",
            alignItems: "center"
        },
        cardMedia: {
            width: "60vw",
            height: "60vh",
            margin: "auto"
        },

    })

    const classes = useStyles();
    const { Product, Cart } = props;
    return (
        <div className={classes.root}>
            {
                Product.map(product => {
                    return (
                        <Card className={classes.card}>
                                <CardMedia
                                className={classes.cardMedia}
                                image={product.image}
                                />
                                <CardContent>
                                    <Typography 
                                    variant="h3">{product.title}</Typography>
                                    <Typography variant="body1" color="textSecondary">{product.description}</Typography>
                                    <h3>Rs. {product.price}</h3>
                                    <CardActions>
                                        <Button variant="outlined" color="primary">View Product</Button>
                                        <Button variant="outlined" color="secondary"
                                        onClick={() => props.addItem(product)}>Add to Cart</Button>
                                    </CardActions>
                                </CardContent>
                        </Card>
                    )
                })
            }
        </div>
    )
}


const mapToStateProps = (store) => {
    return store;
}

const mapDispatchToProps = (dispatch)  => {
    return {
        addItem: (item) => {
            return dispatch({type: "add_item", payload: item});
        }
    }
}

export default connect(mapToStateProps, mapDispatchToProps)(Product);