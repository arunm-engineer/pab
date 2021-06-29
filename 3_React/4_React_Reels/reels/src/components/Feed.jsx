import React, { useContext, useState } from 'react'
import { AuthContext } from '../Contexts/AuthProvider';
import { AppBar, makeStyles, Toolbar, Avatar, Grid, IconButton } from '@material-ui/core';
import ExploreIcon from '@material-ui/icons/Explore';
import HomeIcon from '@material-ui/icons/Home';

export default function Feed() {
    const useStyles = makeStyles({
        appBar: {
            height: "4rem",
            display: "flex",
            paddingLeft: "20rem",
            paddingRight: "20rem"
        },
        toolBar: {
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "0",
            paddingRight: "0"
        },
        grid: {
            width: "10rem",
            display: "flex",
            justifyContent: "space-around",
        },
        iconButton: {
            color: "black"
        }
    }) 
    let classes = useStyles();

    const [loader, setLoader] = useState(false);
    const { signout } = useContext(AuthContext);

    const handleSignOut = async (e) => {
        try {
            setLoader(true);
            await signout();
            setLoader(false);
        } catch (error) {
            console.log(error);
            setLoader(false);
        }
    } 

    return (

        <AppBar className={classes.appBar}
        position="fixed"
        color="transparent">
            <Toolbar
            className={classes.toolBar}
            variant="dense"
            style={{}}>
                <img height="100%" width="150vw" src="https://www.logo.wine/a/logo/Instagram/Instagram-Wordmark-Black-Logo.wine.svg"/>
                <Grid container className={classes.grid}>

                    <Grid item>
                        <IconButton className={classes.iconButton}><HomeIcon/></IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton className={classes.iconButton}><ExploreIcon/></IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton><Avatar style={{height:"1.5rem", width: "1.5rem"}} src="https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png" /></IconButton>
                    </Grid>

                </Grid>
            </Toolbar>
        </AppBar>
        

        // <div>
        //     Feed
        //     <button onClick={handleSignOut} disabled={loader} >Logout</button>
        // </div>
    );
}