import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import CreateJourney from "../components/CreateJourney";
import UseAuth from "../custom-hooks/UseAuth";
import { getCollection } from "../firebase-config";
import { Ijourney, Iuser } from "../interfaces/Interfaces";
import { UserState } from "../recoil/atoms";


export default function Profile() {
    const userAuth = UseAuth();
    const [newPostToggle, setNewPostToggle] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [currentUser, setCurrentUser] = useRecoilState(UserState);
    const [userPosts, setUserPosts] = useState<Ijourney[]>([]);
    
    
    const getJourneyRef = getCollection('journeys');

    const getUserPosts = async () => {
        if (userAuth) {
            const q = query(getJourneyRef,where('userID', '==', userAuth.uid));
            const data = await getDocs(q)
            console.log("🚀 ~ file: Profile.tsx:25 ~ getUserPosts ~ data", data)
            setUserPosts(
                data.docs.map((journey) => ({...journey.data()} as Ijourney))
            )
        }
    }
    
    useEffect(() => {
        console.log(userAuth?.displayName)
        if (!userAuth) {
            setErrorMessage("You are not logged in, and can therefore not post a message");
            return;
        }
        try{
            getUserPosts();
        }catch(error){
            console.log(error)
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

    const viewUserPosts = () => {
        if (userPosts.length > 0) {
            return (
                <div>
                    {userPosts.map((post) => {
                        return (
                            <div key={post.title}>
                                <h1>{post.title}</h1>
                                <p>{post.description}</p>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div>
                    <p>You have not created any journeys yet</p>
                </div>
            )
        }
    }


    return (
        <div className='w-full'>
            <h1> {currentUser? "Welcome back "+ currentUser.firstname+ " " + currentUser.lastname: "Not Logged In"}</h1>
            <h3>{errorMessage}</h3>
            <div>
                {currentUser?.email}
            </div>
            <div>
                {CreateJourneyFunc()}
            </div>
            <div>
                {viewUserPosts()}
            </div>
            <div>
                <button onClick={e => setNewPostToggle(!newPostToggle)}>{!newPostToggle ? "Click here to create a new journey" : "Back"}</button>
            </div>
        </div>
    )
    }