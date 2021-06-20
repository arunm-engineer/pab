import React, { useState, useEffect } from 'react'

export default function Hooks() {
    // Variable, setterFunction -> default state as param
    const [count, setCount] = useState(0);
    const [time, setTime] = useState(Date.now());

    function fun() {
        console.log('Hello');
    }

    // Everytime @ render
    // useEffect(fun);

    // Once, like componetDidMount
    // useEffect(fun, []);

    // Everytime @ update, like componeneDidUpdate
    useEffect(fun, [time]);
    return (
        <div>
            <button onClick={()=>{setCount(count+1)}}>+</button>            
            <span>{count}</span>
            <button onClick={()=>{setCount(count-1)}}>-</button>
            <p onClick={()=>{setTime(Date.now())}}>{time}</p>
        </div>
    )
}
