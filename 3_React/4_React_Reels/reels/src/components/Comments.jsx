import React, { useState } from 'react';
import { makeStyles, Avatar, Typography } from '@material-ui/core';


export default function Comments({commentObj}) {

    const useStyles = makeStyles({
        commentBox: {
            display: "flex",
        },
        avatarIcon: {
            marginLeft: "1rem",
            height: "1.5rem",
            width: "1.5rem"
        },
        commentContent: {
            marginLeft: "1rem",
        },
        commentText: {
            fontFamily: "Nuntino Sans, sans-serif",
            color: "#4b4b4b",
            letterSpacing: "0.8px",
        }
    })

    const classes = useStyles();

    const [comment, setComment] = useState("");

    return (
        <div className={classes.commentBox}>
            <Avatar alt="Remy Sharp" className={classes.avatarIcon} src={commentObj.profileImageURL}/>
            <div className={classes.commentContent}>
                <Typography variant="subtitle2" className={classes.profile} >{commentObj.username}</Typography>
                <Typography variant="body2" className={classes.commentText}>{commentObj.description}</Typography>
            </div>
        </div>
    )
}