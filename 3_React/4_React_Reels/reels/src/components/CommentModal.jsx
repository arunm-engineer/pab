import React, { useState } from 'react';
import { makeStyles, Grid, Avatar, Typography, IconButton } from '@material-ui/core';
import OptionsIcon from '@material-ui/icons/MoreHoriz';
import Comments from './Comments';
import CommentEditor from './CommentEditor';
import CommentVideo from './CommentVideo';
import ClearIcon from '@material-ui/icons/Clear';
import { database } from '../firebase';

export default function CommentModal({commentVideoObj, postComments, setCommentVideoObj}) {
    const useStyles = makeStyles({
        mainContainer: {
            backgroundColor: "white",
            position: "fixed",
            height: "32rem",
            top: "calc( ( 100vh - 30rem ) / 2 )",
            left: "0rem",
            display: "flex",
            justifyContent: "center",
            boxSizing: "border-box"
        },
        videoSection: {
            // backgroundColor: "lightblue",
        },
        commentSection: {
            // backgroundColor: "lightblue",
            width: "25vw",
            borderWidth: "1px 1px 1px 1px",
            borderStyle: "solid",
            borderColor: "#ced6e0",
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "space-between",
        },
        commentSectionHeader: {
            // backgroundColor: "lightpink",
            height: "5rem",
            display: "flex",
            borderWidth: "0 0 1px 0",
            borderStyle: "solid",
            borderColor: "#f1f2f6",
        },
        avatarSection: {
            width: "85%",
            heigth: "100%",
            display: "flex",
            alignItems: "center",
            // backgroundColor: "grey"
        },
        profileName: {
            fontFamily: "Heebo, sans-serif",
            marginLeft: "1rem",
        },
        avatarIcon: {
            marginLeft: "1rem",
            height: "2rem",
            width: "2rem"
        },
        optionsSection: {
            width: "15%",
            // backgroundColor: "yellow",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        optionsIcon: {
            fontSize: "x-large",
            color: "#576574"
        },
        commentSectionBody: {
            // backgroundColor: "coral",
            height: "calc( 32rem - 5rem - 4rem )",
            // height: "50vh",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            overflow: "auto",
            paddingTop: "0.5rem",
            '&::-webkit-scrollbar': {
                width: '0'
              },
        },
        
    })

    const classes = useStyles();

    return (
        !commentVideoObj ? null :
        <Grid container className={classes.mainContainer}>
            <Grid item xs={"hide"} xs={1} sm={4} md={4} lg={3} className={classes.videoSection}>
                <CommentVideo commentVideoObj={commentVideoObj}></CommentVideo>
            </Grid>
            <Grid item xs={5} sm={5} md={4} lg={3} className={classes.commentSection}>
                <div className={classes.commentSectionHeader}>
                    <div className={classes.avatarSection}>
                        <Avatar alt="Remy Sharp" src={commentVideoObj.userProfileImageURL} className={classes.avatarIcon} />
                        <Typography variant="subtitle1" className={classes.profileName}>me_arunparihar</Typography>

                    </div>
                    <div className={classes.optionsSection}>
                        <IconButton onClick={() => {setCommentVideoObj(null)}}>
                            {/* <OptionsIcon className={classes.optionsIcon}></OptionsIcon> */}
                            <ClearIcon className={classes.optionsIcon}></ClearIcon>
                        </IconButton>
                    </div>
                </div>
                <div className={classes.commentSectionBody}>
                    {
                        postComments.map((commentObj) => {
                            return <Comments key={commentObj.cuid} commentObj={commentObj} />
                        })
                    }
                </div>
                <CommentEditor commentVideoObj={commentVideoObj} />
            </Grid>
        </Grid>
    )
}