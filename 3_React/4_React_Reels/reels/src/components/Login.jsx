import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import { Container, Grid, makeStyles, TextField, Button, Card, CardMedia, Typography, Hidden, LinearProgress } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel'

export default function Login(props) {
    const useStyles = makeStyles({
        mainContainer: {
            height: "100vh",
            width: "80vw",
            // backgroundColor: "lightgreen",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto"
        },
    })
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        // Prevent default action of a submit button
        e.preventDefault();
        try {
            setLoader(true);
            await login(email, password);
            setLoader(false);

            // This case is handled when manually routing from the '/login' route
            props.history.push("/");
        } catch (error) {
            setLoader(false);
            setError(true);
            setEmail("");
            setPassword("");
        }
    }

    return (

        <div>
            <Grid container className={classes.mainContainer} spacing={4}>
                <Hidden xsDown smDown mdDown>
                    <Grid item xs={6} sm={6} md={6} lg={7}>
                        <div style={{ position: "relative" }}>
                            <CardMedia
                                image="https://www.instagram.com/static/images/homepage/home-phones.png/43cc71bb1b43.png"
                                style={{ backgroundSize: "contain", height: "86vh", position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}
                            >
                                <div style={{ height: "26rem", width: "15rem", marginLeft: "5.5rem" }}>
                                    <Carousel animation="fade" indicators={false} swipe={false} navButtonsAlwaysInvisible={true} autoPlay interval="5000">
                                        <img src="https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg" />
                                        <img src="https://www.instagram.com/static/images/homepage/screenshot2.jpg/6f03eb85463c.jpg" />
                                        <img src="https://www.instagram.com/static/images/homepage/screenshot4.jpg/842fe5699220.jpg" />
                                        <img src="https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg" />
                                    </Carousel>
                                </div>
                            </CardMedia>
                        </div>
                    </Grid>
                </Hidden>
                <Grid item xs={11} sm={8} md={6} lg={5}>
                    {loader ? <LinearProgress color="secondary" /> : null}
                    <Card variant="outlined"
                        style={{ padding: "1rem" }}>
                        <CardMedia
                            image="https://www.logo.wine/a/logo/Instagram/Instagram-Wordmark-Black-Logo.wine.svg"
                            style={{ backgroundSize: "contain", height: "8rem", }} />
                        <Grid container spacing={1}>
                            <Grid
                                item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    id="outlined-email-input"
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    value={email}
                                    fullWidth={true}
                                    size="small"
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                            </Grid>
                            <Grid
                                item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    value={password}
                                    fullWidth={true}
                                    size="small"
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                            </Grid>
                            <Grid
                                item xs={12} sm={12} md={12} lg={12}>
                                <Typography
                                    style={{ textAlign: "center" }}
                                    variant="body1"
                                    gutterBottom>
                                    <LinkButton content="Forgot Password?"
                                        routeLink="/signup"></LinkButton>
                                </Typography>
                            </Grid>
                            <Grid
                                item xs={12} sm={12} md={12} lg={12}>
                                <Button
                                    variant="contained"
                                    disabled={loader}
                                    fullWidth={true}
                                    size="medium"
                                    style={{ backgroundColor: "#2e86de", color: "#ffffff" }}
                                    onClick={handleSubmit}>Login
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                    <Card
                        variant="outlined"
                        style={{ marginTop: "2rem" }}>
                        <Typography
                            style={{ textAlign: "center", padding: "0.5rem" }}
                            variant="body1"
                            gutterBottom>
                            Don't have an account? <LinkButton content="Sign up"
                                routeLink="/signup" />
                        </Typography>
                    </Card>
                </Grid>
            </Grid >
        </div>

    );
}

function LinkButton({ content, routeLink }) {
    return (
        <Link style={{ textDecoration: "none", color: "#2e86de" }} to={routeLink}>{content}</Link>
    );
}