import React from 'react';
import video1 from '../videos/Reels_Video1.mp4';
import video2 from '../videos/Reels_Video2.mp4';
import video3 from '../videos/Reels_Video3.mp4';

export default function CommentVideo({commentVideoObj}) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
        }}>
            <video width="288" autoPlay loop muted={true} src={commentVideoObj.videoUrl} ></video>
        </div>
    )
}
