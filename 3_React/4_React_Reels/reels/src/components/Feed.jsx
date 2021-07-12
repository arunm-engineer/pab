import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../Contexts/AuthProvider';
import { AppBar, makeStyles, Toolbar, Avatar, Container, IconButton } from '@material-ui/core';
import ExploreIcon from '@material-ui/icons/Explore';
import HomeIcon from '@material-ui/icons/Home';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Button from '@material-ui/core/Button';
import { database, storage } from '../firebase';
import LikeIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/ChatBubble';
import CommentModal from './CommentModal';
import uuid from 'react-uuid';


export default function Feed() {
    const useStyles = makeStyles((theme) => ({
        appBar: {
            height: "4rem",
            display: "flex",
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
        root: {
            '& > *': {
                margin: theme.spacing(1),
                paddingLeft: "7%"
            },
        },
        input: {
            display: 'none',
        },
        feedContainer: {
            width: "100vw",
            // backgroundColor: "lightblue",
            marginTop: "5rem"
        },
        reelsContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "3rem",
            gap: "8rem"
        },
        likeIcon : {
            position: "absolute",
            bottom: "0.5rem",
            left: "0.5rem",
            fontSize: "x-large"
        },
        commentIcon: {
            position: "absolute",
            bottom: "0.5rem",
            left: "3rem",
            fontSize: "x-large"
        },
        liked: {
            color: "#ff5252"
        },
        unliked: {
            color: "#f1f2f6"
        },
        videoContainer: {
            position: "relative",
            display: "flex"
        }
    }))
    let classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const [pageLoading, setPageLoading] = useState(true);
    const [videos, setVideos] = useState([]);
    const [likeAction, setLikeAction] = useState(false);
    const [commentVideoObj, setCommentVideoObj] = useState(null);
    const [postComments, setPostComments] = useState([]);
    const { signout, currentUser } = useContext(AuthContext);

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

    const handleInputFile = (e) => {
        e.preventDefault();

        // Get file from html
        let file = e?.target?.files[0];
        if (file != null) console.log(e.target.files[0]);

        // If file size is too large then don't upload 
        if (file.size / (1024*1024) > 20) {
            alert('Your file size is too large');
            return;
        }

        console.log('Before upload start');
        
        // 1. Upload
        const uploadFileTask = storage.ref(`/posts/${uuid()}`).put(file);
        setLoading(true);
        
        console.log('After upload start');

         // On upload do update all entities in firestore
         uploadFileTask.on('state_changed', progressFn, errorFn, successFn);

        function progressFn(snapshot) {
            //This callback is for providing the progress
            const progress = snapshot.bytesTransferred / snapshot.totalBytes;
            console.log(progress)
        }
        function errorFn() {
            console.log('Some error occured while video uploading...');
            setLoading(false);
            return;
        }
        function successFn() {
            uploadFileTask.snapshot.ref.getDownloadURL()
            .then(async (url) => {
                // 2. Put new document of uploaded post in Post collection in firestore
                // auid -> uid of the author who uploaded the post
                let postObjStructure = {
                    comments: [],
                    likes: [],
                    url,
                    auid: currentUser.uid,
                    createdAt: database.getUserTimeStamp()
                }

                // Also add Post obj in Post collection in firestore 
                let postObj = await database.posts.add(postObjStructure);
                // 3. Update PostObj uid in author(current user's) collection in firestore in his all posts array
                await database.users.doc(currentUser.uid).update({
                    postIds: [...user.postIds, postObj.id]
                })

                console.log(postObj);
                setLoading(false);
            })
        }
    }

    // Get currentuser Data
    useEffect(async () => {
        console.log(currentUser.uid);
        // Get user data (how get a document from a collection in firebase 
        // auth user doen't contains any other data besides email ,password , uid
        //  you need to get the complete document from  the firstore using either of email or uid 

        // 1. Snapshot (resource intensive) (realtime)
        // database.users.doc(currentUser.uid).onSnapshot((snapshot) => {
        //     console.log(snapshot.data());
        //     setUser(snapshot.data());
        //     setPageLoading(false);
        // })

        // 2. Normal get data from firebase
        let dataObject = await database.users.doc(currentUser.uid).get();
        setUser(dataObject.data());
        setPageLoading(false);
    }, [])

    // Get all posts to display in feed
    useEffect(async () => {
        // snapshot objects to be unsubscribed to avoid memory leaks
        let unsubscribe = await database.posts.orderBy("createdAt", "desc").onSnapshot(async snapshot => {
            console.log(snapshot);
            let videos = snapshot.docs.map(doc => doc.data());

            // Extract videosURL from post collection and user's data from user collection
            // ProfileImg of the author of the post(video)
            let videosDataArrFromFireStore = [];
            for (let i = 0;i < videos.length;i++) {
                let { url: videoUrl, auid, likes } = videos[i];
                let puid = snapshot.docs[i].id;
                let userObject = await database.users.doc(auid).get();
                let { profileImageURL: userProfileImageURL, username } = userObject.data();

                // For likes, check if current user has liked the post
                videosDataArrFromFireStore.push({ videoUrl, userProfileImageURL, username, puid, liked: likes.includes(currentUser.uid) });
            }

            // Set Received videos for further dispaly in feed
            setVideos(videosDataArrFromFireStore);
        })

        // Since snapshot is realtime we receive from unsubscribe function which has to be returned during cleanup
        return unsubscribe;
    }, [])

    const handleLiked = async (puid, liked) => {
        console.log(puid);

        // Get clicked post
        // Find liked or unliked
        // If liked -> append user uid who liked
        // If unliked -> remove user uid who unliked
        let postRef = await database.posts.doc(puid).get();
        let post = postRef.data();

        // Not yet Liked
        if (liked == false) {
            let likes = post.likes;
            database.posts.doc(puid).update({
                "likes": [...likes, currentUser.uid]
            })
        }
        else {
            let likes = post.likes.filter(likedByUid => {
                return likedByUid !== currentUser.uid;
            })
            database.posts.doc(puid).update({
                "likes": likes
            })
        }

        // Change state to have action on UI
        setLikeAction(!likeAction);
    }

    const handleComment = async (videoObj) => {
        // Set state to current Video obj of comments
        setCommentVideoObj(videoObj);


        // Get all comments in recent timely order from firestore comments collection
        let unsubscribe = await database.comments.orderBy("createdAt", "desc").onSnapshot(async snapshot => {
            let comments = snapshot.docs.map(doc => doc.data());

            // Store all required data to display for comments in an object and push in an array
            let commentsDataArrFromFirestore = [];
            for (let i = 0;i < comments.length;i++) {
                let {profileImageURL, description, username, puid} = comments[i];
                commentsDataArrFromFirestore.push({profileImageURL, description, username, puid});
            }

            // Filter the comments of the current post
            commentsDataArrFromFirestore = commentsDataArrFromFirestore.filter((commentObj) => {
                return commentObj.puid === (videoObj ? videoObj.puid : "");
            })

            // Set Received comments for further dispaly in comments feed
            console.log(commentsDataArrFromFirestore);
            setPostComments(commentsDataArrFromFirestore);

        })

    }

    
    return (
        pageLoading == true ? <div>Loading...</div> :
        <> 
            <AppBar className={classes.appBar}
                position="fixed"
                color="white">
                <Toolbar
                    className={classes.toolBar}
                    variant="dense">
                    <img height="100%" width="150vw" src="https://www.logo.wine/a/logo/Instagram/Instagram-Wordmark-Black-Logo.wine.svg" />
                    <Container className={classes.iconContainer}>
                        <IconButton className={classes.iconButton}><HomeIcon /></IconButton>
                        <IconButton onClick={handleSignOut} disabled={loading} className={classes.iconButton}><ExploreIcon /></IconButton>
                        <IconButton>
                            <Avatar alt="Profile" style={{ height: "1.5rem", width: "1.5rem" }} src={user.profileImageURL} />
                        </IconButton>
                    </Container>
                </Toolbar>
            </AppBar>

            <Container className={classes.feedContainer}>
                <div>
                    <div className="uploadImage">
                        <div className={classes.root}>
                            <input accept="file" className={classes.input} id="icon-button-file" type="file"
                                onChange={handleInputFile}
                            />
                            <label style={{ paddingLeft: "0" }} htmlFor="icon-button-file">
                                <Button variant="outlined" color="secondary" component="span" disabled={loading} endIcon={<PhotoCamera />}>
                                    Upload
                                </Button>
                            </label>
                        </div>
                    </div>
                </div>
                <div className={classes.reelsContainer}>
                    {videos.map((videoObj, idx) => {
                        return ( 
                            <div className={classes.videoContainer} key={videoObj.puid}>
                                <Video
                                src={videoObj.videoUrl}
                                id={idx}
                                userName={videoObj.username}>
                                </Video>
                                <LikeIcon 
                                    className={[classes.likeIcon, videoObj.liked ? classes.liked : classes.unliked]}
                                    onClick={() => handleLiked(videoObj.puid, videoObj.liked)}
                                />
                                <CommentIcon
                                    className={[classes.commentIcon, classes.unliked]}
                                    onClick={() => {handleComment(videoObj)}}
                                />
                            </div>
                        )
                    })}
                </div>
            </Container>
            
            <CommentModal commentVideoObj={commentVideoObj} postComments={postComments} setCommentVideoObj={setCommentVideoObj}/>
        </>
    );
}

function Video(props) {
    return (
        <>
            <video loop autoPlay muted="true" id={props.id}>
                <source src={props.src} type="video/mp4"></source>
            </video>
        </>
    )
}