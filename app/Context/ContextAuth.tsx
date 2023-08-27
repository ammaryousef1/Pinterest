"use client"
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { Children, createContext, useContext, useEffect, useState } from "react";
import { auth } from '../firebaseConfig'
const  Authcontext  = createContext()


export const ContextProvider = ({children}) => {
    const [user , setUser] = useState(null)

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth , provider)
    }

    const LogOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth , (currentUser) => {
            setUser(currentUser)
        })
        return () => unsubscribe()
    } ,  [user])

    return <Authcontext.Provider value={{user , LogOut ,googleSignIn }}>{children}</Authcontext.Provider>
}

export const useAuth = () => {
    const context = useContext(Authcontext);
    return context; // Add this line to return the context value
  };