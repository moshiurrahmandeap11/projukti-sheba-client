import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { AuthContext } from '../../hooks/AuthContexts/AuthContexts';
import { auth } from '../../firebase/firebase.config';


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // google login
    const googleLogin = async () => {
        setLoading(true);
        try {
            return await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };


    // email Signup
    const createUser = async (email, password) => {
        setLoading(true);
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }

    // email login
    const emailLogin = async (email, password) => {
        setLoading(true);
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }


    // logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    // monitoring
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
    }, [])

    const authInfo = {
        googleLogin,
        loading,
        setLoading,
        user,
        logOut,
        createUser,
        emailLogin,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;