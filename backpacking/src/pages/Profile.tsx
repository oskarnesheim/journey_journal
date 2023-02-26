import { getDocs, query, where} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import CreateJourney from "../components/CreateJourney";
import JourneyCard from "../components/JourneyCard";
import { auth, getCollection } from "../firebase-config";
import { Ijourney} from "../interfaces/Interfaces";
import { UserState } from "../recoil/atoms";


export default function Profile() {
    const [newPostToggle, setNewPostToggle] = useState(false); //? Velger om man skal lage en ny post eller ikke
    const [errorMessage, setErrorMessage] = useState<string>("");  //? Error message
    const [currentUser, setCurrentUser] = useRecoilState(UserState); //? Henter bruker fra recoil
    const [userPosts, setUserPosts] = useState<Ijourney[]>([]); //? Henter alle brukerens poster
    const [refreshPosts, setRefreshPosts] = useState<boolean>(false);
    const navigate = useNavigate();
    const getJourneyRef = getCollection('journeys/');
    
    useEffect(() => {
        if (!auth.currentUser) {
            navigate('/');
            return;
        }
        try{
            getUserPosts();
        }catch(error){
            console.log(error)
        }
    },[refreshPosts]);
    

    const getUserPosts = async () => {
        try {
            const q = query(getJourneyRef,where('uid', '==', auth.currentUser?.uid));
            const data = await getDocs(q)
            setUserPosts(
                data.docs.map((journey) => ({...journey.data()} as Ijourney))
            )
        } catch (error) {
            console.log(error);
        }
    }
    
    const CreateJourneyFunc = () => {
    if(newPostToggle){
        return (
                <CreateJourney refreshPosts={refreshPosts} setRefreshPosts={setRefreshPosts}/>
            )
        }
    }

    const showJourneys = () => {
        return (
            <div className="p-5 bg-slate-500">
                <h3 className="font-semibold text-xl">
                    Overview:
                </h3>
                {userPosts.length === 0 ? <p>No posts yet</p> : userPosts.map((journey) =>
                    <JourneyCard key={journey.journeyID} journey={journey}/>)}
                </div>
            );} 
            


    return (
        <div className='w-full absolute top-40' >
            <div>
                <h1 className="font-semibold text-xl"> {!newPostToggle? "Welcome back "+ currentUser?.firstname+ " " + currentUser?.lastname: ""}</h1>
                {CreateJourneyFunc()}
            </div>
            <button className="bg-theme-green hover:text-pink-500 font-bold py-2 px-4 rounded m-5"
                onClick={e => setNewPostToggle(!newPostToggle)}>
                {!newPostToggle ? "Click here to create a new journey" : "Back"}
            </button>
            <div className="journeyOverview">
                {!newPostToggle && showJourneys()}
            </div>
        </div>
    )
    }