import React, { useState, createContext, useEffect } from 'react';
import { app, auth, database } from '../services/firebase'; // Adjust the path as needed
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const history = useHistory();

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);

    useEffect(() => {
        function loadStorage() {
            const storageUser = localStorage.getItem('SystemUser');
            if (storageUser) {
                setUser(JSON.parse(storageUser));
            }
        }

        loadStorage();
    }, []);

    async function signUp(firstname, lastname, username, pass) {
        setLoadingAuth(true);

        try {
            const userCredential = await auth.createUserWithEmailAndPassword(username, pass);
            const uid = userCredential.user.uid;

            await database.ref('users').child(uid).set({
                firstname,
                lastname,
                username,
                pass,
            });

            const data = {
                uid,
                firstname,
                lastname,
                pass,
                username,
            };

            setUser(data);
            storageUser(data);
            toast.success('Registration completed successfully!');
            setLoadingAuth(false);
            history.push('/');
        } catch (error) {
            setLoadingAuth(false);
            if (error.code === 'auth/email-already-in-use') {
                toast.error('An account with this email already exists.');
            } else {
                toast.error('Oops, something went wrong.');
            }
        }
    }

    function storageUser(data) {
        localStorage.setItem('SystemUser', JSON.stringify(data));
    }

    async function signOut() {
        await auth.signOut();
        localStorage.removeItem('SystemUser');
        setUser(null);
    }

    async function logIn(email, password) {
        setLoadingAuth(true);

        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const uid = userCredential.user.uid;

            const userProfile = await database.ref('users').child(uid).get();

            const data = {
                uid,
                firstname: userProfile.val().firstname,
                lastname: userProfile.val().lastname,
                username: userProfile.val().username,
                pass: userProfile.val().pass,
            };

            setUser(data);
            storageUser(data);
            toast.success('Welcome back!');
            setLoadingAuth(false);
        } catch (error) {
            setLoadingAuth(false);
            toast.error('Oops, something went wrong!');
        }
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                signUp,
                signOut,
                logIn,
                loadingAuth,
                setUser,
                storageUser,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
