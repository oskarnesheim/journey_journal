import { getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import UseAuth from "../custom-hooks/UseAuth";
import { getCollection } from "../firebase-config";
import { Iuser } from "../interfaces/Interfaces";

export default function Profile() {

    const userAuth = UseAuth();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [currentUser, setCurrentUser] = useState<Iuser>({} as Iuser);

    const getUsersRef = getCollection('users');

    const getUser = async () => {
        const data = await getDocs(getUsersRef)
        const users = data.docs.map((person) => ({...person.data()} as Iuser))
        const user = users.find((user) => user.email === userAuth?.email);
        setCurrentUser(user => user as Iuser)
    }
    
    useEffect(() => {
        try{
            getUser();
            console.log(currentUser)
        }catch(error){
            console.log(error)
        }
        // if (!userAuth) {
        //     setErrorMessage("You are not logged in, and can therefor not post a message");
        //     return;
        // }
        

        
    },[]);

    
    return (
        <div>
        <h1>Profile</h1>
        <br />
        {errorMessage}
        <div>
            <h3>Welcome back {userAuth?.displayName}</h3>
            <h3>Her are alle your posts</h3>
        </div>
        <ul>
            
        </ul>
        <div>
            {userAuth?.email}
            <br />
            <div>
                <h3>{currentUser.firstname} {currentUser.lastname}</h3>
                <p>username : {currentUser.username}</p>
                <p>age : {currentUser.age}</p>
            </div>  
        </div>
        </div>
    )
    }