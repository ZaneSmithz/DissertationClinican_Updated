import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase';

const AuthContext = React.createContext();

// useContext allows props to be passed down to children without specifying in children componenet,
// can just be wrapped

const UseAuth = () => {
    return (
        useContext(AuthContext)
    )
}

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [uid, setUid] = useState();

    const login = (email, password) => {
        signInWithEmailAndPassword( auth, email, password)
    }

    const logout = () => {
        console.log("logout called");
        return auth.signOut();
        
    }

    useEffect(() => {
        const unsubscribe =  auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
            
        
        })

        return unsubscribe();
        // unsubsribe = umount from onAuthStateChanged
    }, []);
   
     const value = {
        currentUser,
        login,
        logout,
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export {AuthProvider};
export {UseAuth};
