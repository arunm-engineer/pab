import React, { useContext, useState, useEffect, useRef } from 'react'
import { AuthContext } from '../Contexts/AuthProvider';
import { makeStyles, Avatar, Container, CircularProgress } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Button from '@material-ui/core/Button';
import { database, storage } from '../firebase';
import LikeIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/ChatBubble';
import CommentModal from './CommentModal';
import uuid from 'react-uuid';
import HeaderBar from './HeaderBar';


export default function Feed() {
    const useStyles = makeStyles((theme) => ({
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
            gap: "7rem"
        },
        likeIcon: {
            fontSize: "x-large"
        },
        commentIcon: {
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
        },
        circularLoader: {
            position: "absolute",
            top: "calc( 100% / 2 )"
        },
        videoActionsIconsContainer: {
            position: "absolute",
            bottom: "1rem",
            left: "0.5rem",
            display: "flex",
            width: "7rem",
            justifyContent: "space-around"
        }
    }))
    let classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const [pageLoading, setPageLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [videos, setVideos] = useState([]);
    const [commentVideoObj, setCommentVideoObj] = useState(null);
    const [postComments, setPostComments] = useState([]);
    const [lastVisiblePost, setLastVisiblePost] = useState();
    const { currentUser } = useContext(AuthContext);

    const handleInputFile = (e) => {
        e.preventDefault();

        // Get file from html
        let file = e?.target?.files[0];
        if (file != null) console.log(e.target.files[0]);
        if (!file) return;

        // If file size is too large then don't upload 
        if (file.size / (1024 * 1024) > 20) {
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

    // Last visible post is to keep track of last received doc, and fetch back next batch of data from firestore (Infinite scrolling)
    async function fetchPostsInBatches() {
        setLoading(true);

        let unsubscribe =
            await database.posts
                .orderBy("createdAt", "desc")
                .startAfter(lastVisiblePost)
                .limit(1)
                .onSnapshot(async snapshot => {
                    console.log(snapshot.docs.length, videos);
                    if (snapshot.docs.length === 0) {
                        setLastVisiblePost(null);
                        setLoading(false);
                        return;
                    }
                    let curVideos = snapshot.docs.map(doc => doc.data());
                    setLastVisiblePost(snapshot.docs[snapshot.docs.length - 1]);

                    // Extract videosURL from post collection and user's data from user collection
                    // ProfileImg of the author of the post(video)
                    let videosDataArrFromFireStore = [];
                    for (let i = 0; i < curVideos.length; i++) {
                        let { url: videoUrl, auid, likes } = curVideos[i];
                        let puid = snapshot.docs[i].id;
                        let userObject = await database.users.doc(auid).get();
                        let { profileImageURL: userProfileImageURL, username } = userObject.data();

                        // For likes, check if current user has liked the post
                        videosDataArrFromFireStore.push({ videoUrl, userProfileImageURL, username, puid, liked: likes.includes(currentUser.uid) });
                    }

                    setLoading(false);
                    // Set Received videos for further dispaly in feed
                    setVideos([...videos, ...videosDataArrFromFireStore]);
                    console.log(videosDataArrFromFireStore);
                })
    }

    // Get all posts to display in feed
    useEffect(async () => {
        console.log('Again');
        setLoading(true);

        // Since snapshot is realtime we receive from unsubscribe function which has to be returned during cleanup
        let unsubscribe =
            await database.posts
                .orderBy("createdAt", "desc")
                .limit(3)
                .onSnapshot(async snapshot => {
                    console.log(snapshot);
                    if (lastVisiblePost) return;
                    let videos = snapshot.docs.map(doc => doc.data());

                    setLastVisiblePost(snapshot.docs[snapshot.docs.length - 1]);

                    // Extract videosURL from post collection and user's data from user collection
                    // ProfileImg of the author of the post(video)
                    let videosDataArrFromFireStore = [];
                    for (let i = 0; i < videos.length; i++) {
                        let { url: videoUrl, auid, likes } = videos[i];
                        let puid = snapshot.docs[i].id;
                        let userObject = await database.users.doc(auid).get();
                        let { profileImageURL: userProfileImageURL, username } = userObject.data();

                        // For likes, check if current user has liked the post
                        videosDataArrFromFireStore.push({ videoUrl, userProfileImageURL, username, puid, liked: likes.includes(currentUser.uid) });
                    }

                    setLoading(false);
                    // Set Received videos for further dispaly in feed
                    setVideos(videosDataArrFromFireStore);
                })
    }, [])


    // Intersection observer to manage video play/pause when post intersects
    // Intersection observer also used for smooth scrolling of posts
    // Intersection observer to fetch post data in batches (infinite scrolling)
    let scrollAndVideoActionObserver;
    let infiniteScrollObserver;

    useEffect(() => {
        console.log('InterObs');
        let allPosts = document.querySelectorAll("video");

        let scrollAndVideoActionConditionObject = {
            root: null,
            rootMargin: "0px",
            threshold: "0.6"
        }
        let infiniteScrollConditionObject = {
            root: null,
            rootMargin: "0px",
            threshold: "1.0"
        }

        function scrollAndVideoActionCallback(entries) {
            entries.forEach(entry => {
                let post = entry.target;
                // Initially play all the post videos, 
                // Then analyse if the post video intersects, if it doesn't then we need to pause it
                post.play().then(() => {
                    if (entry.isIntersecting === false) post.pause();
                })
            })
            entries.forEach(entry => {
                let post = entry.target;
                if (entry.isIntersecting) {
                    let postDimensions = post.getBoundingClientRect();
                    window.scrollBy({
                        top: postDimensions.top,
                        left: postDimensions.left,
                        behavior: 'smooth'
                    })
                }
            })
        }
        function infiniteScrollCallback(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fetchPostsInBatches();
                    console.log(entry.isIntersecting, entry.target);
                    infiniteScrollObserver.unobserve(entry.target);
                }
            })
            // entries.forEach(entry => infiniteScrollObserver.unobserve(entry.target))
        }

        if (scrollAndVideoActionObserver) scrollAndVideoActionObserver.disconnect();
        if (infiniteScrollObserver) infiniteScrollObserver.disonnect();
        scrollAndVideoActionObserver = new IntersectionObserver(scrollAndVideoActionCallback, scrollAndVideoActionConditionObject);
        infiniteScrollObserver = new IntersectionObserver(infiniteScrollCallback, infiniteScrollConditionObject);
        console.log(allPosts.length, allPosts, videos);
        allPosts.forEach((post, idx) => {
            scrollAndVideoActionObserver.observe(post);
            if (idx === allPosts.length - 1) infiniteScrollObserver.observe(post);
        })
    }, [videos])


    const handleLiked = async (puid, liked) => {
        console.log(puid);

        // Get clicked post
        // Find liked or unliked
        // If liked -> append user uid who liked
        // If unliked -> remove user uid who unliked
        let postRef = await database.posts.doc(puid).get();
        let post = postRef.data();
        console.log(videos);
        // Not yet Liked
        if (liked == false) {
            let likes = post.likes;
            database.posts.doc(puid).update({
                "likes": [...likes, currentUser.uid]
            })
            setIsLiked(true);
        }
        else {
            let likes = post.likes.filter(likedByUid => {
                return likedByUid !== currentUser.uid;
            })
            database.posts.doc(puid).update({
                "likes": likes
            })
            setIsLiked(false);
        }
    }

    const handleComment = async (videoObj) => {
        // Set state to current Video obj of comments
        setCommentVideoObj(videoObj);

        // Get all comments in recent timely order from firestore comments collection
        let unsubscribe = await database.comments.orderBy("createdAt", "desc").onSnapshot(async snapshot => {
            let comments = snapshot.docs.map(doc => doc.data());

            // Store all required data to display for comments in an object and push in an array
            let commentsDataArrFromFirestore = [];
            for (let i = 0; i < comments.length; i++) {
                let { profileImageURL, description, username, puid } = comments[i];
                let cuid = snapshot.docs[i].id;
                commentsDataArrFromFirestore.push({ profileImageURL, description, username, puid, cuid });
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
        pageLoading == true ? <CircularProgress color="secondary" className={classes.circularLoader} /> :
            <>
                <HeaderBar loading={loading} setLoading={setLoading} user={user}></HeaderBar>

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
                        {videos.map((videoObj) => {
                            return (
                                <div className={classes.videoContainer} key={videoObj.puid}>
                                    <Video
                                        src={videoObj.videoUrl}
                                        id={videoObj.puid}
                                        userName={videoObj.username}>
                                    </Video>
                                    <div className={classes.videoActionsIconsContainer}>
                                        <Avatar alt="Profile" style={{ height: "1.5rem", width: "1.5rem" }} src={videoObj.userProfileImageURL} />
                                        <LikeIcon
                                            className={[classes.likeIcon, isLiked || videoObj.liked ? classes.liked : classes.unliked]}
                                            onClick={() => handleLiked(videoObj.puid, videoObj.liked)}
                                        />
                                        <CommentIcon
                                            className={[classes.commentIcon, classes.unliked]}
                                            onClick={() => { handleComment(videoObj) }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Container>

                <CommentModal commentVideoObj={commentVideoObj} postComments={postComments} setCommentVideoObj={setCommentVideoObj} setLoading={setLoading} />
            </>
    );
}

function Video(props) {
    return (
        <>
            <video 
            loop 
            onClick={handlePostSound}
            muted={true} 
            id={props.id}
            style={{minHeight: "100%"}}>
                <source src={props.src} type="video/mp4"></source>
            </video>
        </>
    )
}

function handlePostSound(e) {
    e.target.muted = !e.target.muted;
}