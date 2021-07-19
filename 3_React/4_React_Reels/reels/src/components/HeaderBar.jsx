import React, { useState, useContext, useEffect } from 'react';
import { AppBar, makeStyles, Toolbar, Avatar, Container, IconButton, LinearProgress, Menu, MenuItem, Fade } from '@material-ui/core';
import { AuthContext } from '../Contexts/AuthProvider';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from "react-router-dom";

export default function HeaderBar({loading, setLoading, user}) {
    const useStyles = makeStyles((theme) => ({
        appBar: {
            height: "4rem",
            display: "flex",
            backgroundColor: "white"
        },
        toolBar: {
            display: "flex",
            justifyContent: "space-between",
            // backgroundColor: "yellow",
            width: "80vw",
            margin: "auto",
            padding: "0"
        },
        iconContainer: {
            // backgroundColor: "lightgreen",
            width: "12rem",
            marginLeft: "0",
            marginRight: "0"
        },
        iconButton: {
            color: "black",
            // backgroundColor: "pink"
        },
    }))

    let classes = useStyles();
    const { signout } = useContext(AuthContext);

    // Managing menu options
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleAnchorElClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleSignOut = async (e) => {
        try {
            setLoading(true);
            await signout();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <div>
            <AppBar className={classes.appBar} position="fixed">
                {loading ? <LinearProgress color="secondary" /> : null}

                <Toolbar
                    className={classes.toolBar}
                    variant="dense">
                    <img height="100%" width="150vw" src="https://www.logo.wine/a/logo/Instagram/Instagram-Wordmark-Black-Logo.wine.svg" />
                    <Container className={classes.iconContainer}>
                        <IconButton className={classes.iconButton}>
                            <Link to="/" style={{textDecoration: "none", color: "inherit"}} >
                                <HomeIcon onClick={() => { window.scrollTo(0, 0) }} />
                            </Link>
                        </IconButton>
                        <IconButton onClick={handleAnchorElClick}>
                            <Avatar alt="Profile" style={{ height: "1.5rem", width: "1.5rem" }} src={user?.profileImageURL} />
                        </IconButton>
                        <Menu
                            id="fade-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                        >
                            <MenuItem><Link style={{ textDecoration: "none", color: "inherit", padding: "0" }} to="/profile">Profile</Link></MenuItem>
                            <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                        </Menu>
                    </Container>
                </Toolbar>
            </AppBar>
        </div>
    )
}

