import React, { useState, useEffect } from 'react';
import auth from '../firebase'
export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loader, setloader] = useState(true);

    // Loose Coupling
    // Wrapping auth functions in a generic fashion 
    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }
    const signout = () => {
        return auth.signOut();
    }
    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        // Adding an real-time event listener functionality which is monitored by firebase
        // Whenever, auth's State will be changed, this "onAuthStateChanged" listener will be triggered [ If user auth logged in ? -> user : -> null ]
        const unsubscribeAuthentication = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setloader(false);
        })

        return unsubscribeAuthentication;
    }, []);

    // These values may be used @ any level or depth in the application so pass it via context @Top-level
    let AuthValues = { currentUser, signout, login, signup }

    return (
        // This provider value will be applied to AuthProvider Component's children
        <AuthContext.Provider value={AuthValues}>
            {!loader && children}
        </AuthContext.Provider>
    );
}

    




