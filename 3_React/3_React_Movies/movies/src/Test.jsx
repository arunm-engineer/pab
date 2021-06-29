import React, { useState, useEffect } from 'react';

// export function Test() {
//     const [name, setName] = useState('BackBencher');
//     const [age, setAge] = useState(23);
//     return (
//         <div>
//             <form>
//                 <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
//                 <input type="text" onChange={(e) => setAge(Number(e.target.value))} value={age}/>
//                 <h2>
//                     Name: {name}, Age: {age}
//                 </h2>
//             </form>
//         </div>
//     );
// }


// export function Test() {
//     const [count, setCount] = useState(0);

//     useEffect(() => {
//         console.log('Boom');
//     });

//     return (
//         <div>
//             <button onClick={()=>{setCount(count+1)}}>State: {count}</button>
//         </div>
//     );
// }


// export function Test() {
//     const [count, setCount] = useState(0);
//     return (
//         <div>
//             <button onClick={()=>{setCount(count+1)}}>Count: {count}</button>
//         </div>
//     );
// }


// export function Test() {
//     const [name, setName] = useState("");
//     const [count, setCount] = useState(0);

//     useEffect(() => {
//         console.log('Count is updated');
//     }, [1]);
    
//     return (
//         <div>
//             <button onClick={()=>{setCount(count+1)}}>State: {count}</button>
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//         </div>
//     );
// }

// export function Test() {
//     useEffect(() => {
//         window.addEventListener("mousemove", this.handleMousePosition);
        
//         return () => {
//             window.removeEventListener('mousemove', this.handleMousePosition)
//           }
//     }, []);
// }