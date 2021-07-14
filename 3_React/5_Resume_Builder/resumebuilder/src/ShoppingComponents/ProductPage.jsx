import React from 'react';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import { makeStyles, Card, CardMedia, CardContent, Typography, CardActions } from '@material-ui/core';

function ProductPage(props) {
    const useStyles = makeStyles({
        card: {
            width: "70vw",
            height: "70vh",
            display: "flex",
            alignItems: "center",
            margin: "auto"
        },
        cardMedia: {
            width: "35vw",
            height: "60vh",
            paddingLeft: "5rem",
            paddingRight: "5rem",
        },

    })

    const classes = useStyles();
    const { ProductDetails, addItem } = props;
    console.log(props);
    
    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.cardMedia}
                image={ProductDetails.image}
            />
            <CardContent>
                <Typography
                    variant="h3">{ProductDetails.title}</Typography>
                <Typography variant="body1" color="textSecondary">{ProductDetails.description}</Typography>
                <h3>Rs. {ProductDetails.price}</h3>
                <CardActions>
                    <Button variant="outlined" color="secondary"
                        onClick={() => addItem(ProductDetails)}
                        >Add to Cart</Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

const mapStateToProps = (store, ownProps) => {
    const { ProductDetails } = ownProps;
    return { store, ProductDetails };
}

const mapDispatchToProps = (dispatch)  => {
    return {
        addItem: (item) => {
            return dispatch({type: "add_item", selectedItem: item});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);