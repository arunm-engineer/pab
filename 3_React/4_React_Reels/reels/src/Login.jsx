import React, { useState, useEffect } from 'react'
// import { Link } from "react-router-dom"
import auth from './firebase'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [mainLoader, setMainLoader] = useState(true);

    const handleSubmit = async () => {
        try {
            setLoader(true);
            console.log('yes');
            let res = await auth.signInWithEmailAndPassword(email, password);
            console.log(res);
            setUser(res.user);
            setLoader(false);
        }
        catch(err) {
            setError(true);
            setLoader(false);
        } 
    }
    const handleEmail = (e) => {
        console.log(e.target.value);
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        console.log(e.target.value);
        setPassword(e.target.value);
    }
    // const handleReLogin = (e) => {
    //     setError(false);
    //     setUser(null);
    //     setEmail("");
    //     setPassword("");
    //     setLoader(false);
    // }
    const handleLogout = async (e) => {
        setLoader(true);
        await auth.signOut();
        setUser(null);
        setLoader(false);
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            console.log(user);
            setUser(user);
            setMainLoader(false);
        })
    }, [])
    return (
        <React.Fragment>
            {   
                (mainLoader === true) ? <h1>Wait for a second...</h1> :
                (
                    (loader === true) ? <h1>Loading...</h1> :
                    (
                        (user !== null) ? 
                        (<>
                            <h1>{user.uid}</h1>
                            <button onClick={handleLogout}>Logout</button>
                        </>)
                        :
                        <>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" value={email} onChange={handleEmail}/>
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" value={password} onChange={handlePassword}/>
                                <input type="submit" onClick={handleSubmit} value="Submit"/>
                        </>
                    )
                )            
            }
        </React.Fragment>

        
    );
}