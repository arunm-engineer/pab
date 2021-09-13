import React, { useState, useEffect } from 'react'

export default function Test() {

    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log("Mount");
    }, [])
    useEffect(() => {
        console.log("Update");
    }, [count])
    return (
        <>
        {console.log("Render")}
        
        <h1 onClick={() => setCount(prevCount => prevCount+1)}>Click</h1>
        <div>
            {count}
        </div>
        </>
    )
}
