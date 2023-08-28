import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Iuser } from "../interfaces/Interfaces";
import { auth } from "../firebase-config";


const UseAuth = () => {
    const [currentUser, setCurrentUser] = useState<User>();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser({} as User);
            }
        });
        return unsubscribe;
    },[]);
    return currentUser;
}

export default UseAuth;