import React, { useEffect } from 'react'
import v1 from './video1.mp4';
import v2 from './video2.mp4';
import v3 from './video3.mp4';
import v4 from './video4.mp4';
import './inter.css';

function InterObserver() {

    function callback(entries) {
        // Each entry on which observer is applied
        entries.forEach(entry => {
            let child = entry.target.children[0];
            console.log(child.id);

            // play -> async work 
            // pause -> sync work
            // if (entry.isIntersecting) {
            //     console.log(child.id)
            // } else {
            //     console.log(child.id)

            // }
            
            child.play().then(function(){
                if (entry.isIntersecting == false) {
                  child.pause();
                }  
            })
        })
    }

    useEffect(() => {
        // root -> null [When mentioned null observer is applied on the whole page]
        // threshold -> [encounters callback when the element view size is of mentioned value]
        let conditionObject = {
            root: null,
            threshold: "0.9"
        }
        
        let observer = new IntersectionObserver(callback, conditionObject);
        let elements = document.querySelectorAll(".video-container");
        elements.forEach(elem => {
            observer.observe(elem);
        })
    }, [])

    return (
        <div>
            <div className="video-container">
                <Video src={v1} id="a" />
            </div>
            <div className="video-container">
                <Video src={v2} id="b" />
            </div>
            <div className="video-container">
                <Video src={v3} id="c" />
            </div>
            <div className="video-container">
                <Video src={v4} id="d" />
            </div>
        </div>
    )
}

function Video(props) {
    return (
        <video className="video-styles" controls muted="true" id={props.id}>
            <source src={props.src} type="video/mp4" />
        </video>
    );
}

export default InterObserver
