import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import CreateJourney from "../components/CreateJourney";
import UseAuth from "../custom-hooks/UseAuth";
import { getCollection } from "../firebase-config";
import { Iuser } from "../interfaces/Interfaces";


export default function Profile() {

    const [newPostToggle, setNewPostToggle] = useState(false);
    const userAuth = UseAuth();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [currentUser, setCurrentUser] = useState<Iuser>({} as Iuser);

    const getUsersRef = getCollection('users');

    const getUser = async () => {
        const data = await getDocs(getUsersRef)
        const users = data.docs.map((person) => ({...person.data()} as Iuser))
        console.log(users)
        const user = users.find((user) => 
        {
            console.log(user.email, userAuth?.email)
            user.email === userAuth?.email

        });
        setCurrentUser(user => user as Iuser)
    }
    
    useEffect(() => {
        try{
            getUser();
        }catch(error){
            console.log(error)
        }
        if (!userAuth) {
            setErrorMessage("You are not logged in, and can therefor not post a message");
            return;
        }
        

        
    },[]);

    
    const CreateJourneyFunc = () => {
    if(newPostToggle){
        return (
            <div>
                <CreateJourney />
            </div>
        )
    }
}

    return (
        <div className='w-full'>
            <h1>Profile</h1>
            <div>
                {currentUser?.email}
            </div>
            <div>
                {CreateJourneyFunc()}
            </div>
            <div>
                <button onClick={e => setNewPostToggle(!newPostToggle)}>{!newPostToggle ? "Click here to create a new journey" : "Back"}</button>
            </div>
        </div>
    )
    }