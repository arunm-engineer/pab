import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, Grid, Avatar, Container, Divider, CircularProgress } from '@material-ui/core';
import LikeIcon from '@material-ui/icons/FavoriteBorder';
import HeaderBar from './HeaderBar';
import { AuthContext } from '../Contexts/AuthProvider';
import { database } from '../firebase';

function Profile() {
    const useStyles = makeStyles({
        imageSection: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        userImageIcon: {
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
            height: "9rem",
            width: "9rem",
        },
        userName: {
            fontFamily: "Quicksand, sans-serif",
            fontSize: "xx-large",
            color: "#485460",
        },
        userDescription: {
            paddingTop: "2rem",
            paddingLeft: "3rem",
            lineHeight: "2",
        },
        videoSection: {
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            marginTop: "2rem",
            gap: "2rem",
        },
        videoContainer: {
            position: "relative",
        },
        overlayContainer: {
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            fontWeight: "lighter",
            fontFamily: "Roboto, sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: '#fff',
            backgroundColor: "#211e1e8c",
            opacity: "0",
            zIndex: "2",
        },
    })

    const classes = useStyles();

    const [user, setUser] = useState();
    const [pageLoading, setPageLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState([]);
    const { currentUser } = useContext(AuthContext);

    // Get currentuser Data
    useEffect(async () => {
        let dataObject = await database.users.doc(currentUser.uid).get();
        setUser(dataObject.data());
        setPageLoading(false);
    }, [])

    // Get all posts to display in feed
    useEffect(async () => {
        console.log('Again');
        setLoading(true);

        // Since snapshot is realtime we receive from unsubscribe function which has to be returned during cleanup
        let unsubscribe =
            await database.posts
                .orderBy("createdAt", "desc")
                .onSnapshot(async snapshot => {
                    console.log(snapshot);
                    let videos = snapshot.docs.map(doc => doc.data());

                    // Extract videosURL from post collection and user's data from user collection
                    // ProfileImg of the author of the post(video)
                    let videosDataArrFromFireStore = [];
                    for (let i = 0; i < videos.length; i++) {
                        let { url: videoUrl, auid, likes } = videos[i];
                        let puid = snapshot.docs[i].id;
                        let userObject = await database.users.doc(auid).get();
                        let { profileImageURL: userProfileImageURL, username } = userObject.data();

                        // For likes, check if current user has liked the post
                        videosDataArrFromFireStore.push({ videoUrl, userProfileImageURL, username, puid, liked: likes.includes(currentUser.uid), likesCount: likes.length });
                    }

                    setLoading(false);
                    // Set Received videos for further dispaly in feed
                    setVideos(videosDataArrFromFireStore);
                })
    }, [])

    return (
        pageLoading == true ? <CircularProgress color="secondary" className={classes.circularLoader} /> :
            <Container style={{ backgroundColor: "", width: "70%", marginTop: "5rem" }}>
                <HeaderBar loading={loading} setLoading={setLoading} user={user}></HeaderBar>
                <Grid spacing={5} container style={{ minHeight: "30vh", marginBottom: "3rem" }}>
                    <Grid item sm={5} md={5} lg={5}
                        className={classes.imageSection}>
                        <Avatar alt="Profile" className={classes.userImageIcon} src={user?.profileImageURL} />
                    </Grid>
                    <Grid item sm={6} md={7} lg={7} className={classes.userDescription}>
                        <div className={classes.userName}>{user.username}</div>
                        <div style={{ color: "#485460" }}>
                            <span style={{ fontWeight: "500", color: "#3d3d3d", fontSize: "large" }}>{user.postIds.length}</span> posts
                        </div>
                        <div style={{ color: "#485460" }}>Kuch toh log kahenge, logon ka kaam hain kehna!! ⚡</div>
                    </Grid>
                </Grid>
                
                <Divider />
                
                <div className={classes.videoSection}>
                    {
                        videos.map(videoObj => {
                            console.log(videoObj);
                            return (
                                <div className={classes.videoContainer}>
                                        <Video
                                            src={videoObj.videoUrl}
                                            id={videoObj.puid}
                                        ></Video>
                                        <div className={classes.overlayContainer}
                                        onMouseOver={(e) => e.currentTarget.style.opacity = "1"}
                                        onMouseOut={(e) => e.currentTarget.style.opacity = "0"}
                                        onClick={handlePostSound}>
                                            <LikeIcon />&nbsp;{videoObj.likesCount} {videoObj.likesCount === 1 ? "like" : "likes"}
                                        </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Container>
    )
}

function Video(props) {
    return (
        <video
            id={props.id}
            loop
            width="250"
            muted={true}
            autoPlay
            style={{minHeight: "100%"}}>
            <source src={props.src} type="video/mp4" />
        </video>
    )
}

function handlePostSound(e) {
    e.currentTarget.previousSibling.muted = !e.currentTarget.previousSibling.muted;
}

export default Profile;
