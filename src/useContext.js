import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from './firebase/authentication';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase/firebase";

export const navBarSearch = createContext({ search: null, setSearch: () => { } });

const userAuth = createContext();

export function UserAuthContext({ children }) {

    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    function googleSignIn() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                navigate("/login");
            }
            else {
                if (localStorage.getItem("user")===JSON.stringify(currentUser)) {
                    const docRef = doc(db, "Users", currentUser.uid);
                    await updateDoc(docRef, {
                        lastLogin: new Date().toUTCString()
                    })
                        .then(() => {
                            console.log("Document successfully updated!");
                        })
                        .catch(err => { console.log("error updating already authenticated user", err) });
                }
                localStorage.setItem("user", JSON.stringify(currentUser));
                setUser(currentUser);
                navigate("/home");
            }
        });

        return () => {
            unsubscribe();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <userAuth.Provider value={{ user, googleSignIn }}>
            {children}
        </userAuth.Provider>
    );
}

//custom hook

export function useAuth() {
    return useContext(userAuth);
}
