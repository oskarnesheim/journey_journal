import { Card, CardHeader, Heading, CardBody, CardFooter, Button } from "@chakra-ui/react";
import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import CreateJourney from "../components/CreateJourney";
import UseAuth from "../custom-hooks/UseAuth";
import { auth, getCollection } from "../firebase-config";
import { Ijourney, Iuser } from "../interfaces/Interfaces";
import { UserState } from "../recoil/atoms";


export default function Profile() {
    const [newPostToggle, setNewPostToggle] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [currentUser, setCurrentUser] = useRecoilState(UserState);
    const [userPosts, setUserPosts] = useState<Ijourney[]>([]);
    
    useEffect(() => {
        try{
            if (!auth) {
                setErrorMessage("You are not logged in, and can therefore not post a message");
                return;
            }
            getUserPosts();
        }catch(error){
            console.log(error)
        }
    },[userPosts]);
    
    const getJourneyRef = getCollection('journeys/');

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
            <div>
                <CreateJourney />
            </div>
            )
        }
    }

    const showJourneys = () => {
        return (
            userPosts.map((journey) =>
                <Card key={journey.title + " " + journey.uid} paddingBottom={4} >
                    <CardHeader >
                        <Heading size='md'> {journey.title}</Heading>
                    </CardHeader>
                    <CardBody>
                        <p>Description : {journey.description}</p>
                        <p>Distance : {journey.distance}</p>
                        <p>Cost : {journey.cost}</p>
                    </CardBody>
                    <CardFooter>
                        <Button>View journey</Button>
                    </CardFooter>
                 </Card>
            ));} 


    return (
        <div className='w-full relative' >
                <h1> {currentUser? "Welcome back "+ currentUser.firstname+ " " + currentUser.lastname: "Not Logged In"}</h1>
                <h3>{errorMessage}</h3>
            <div>
                {currentUser?.email}
            </div>
            <div className="relative">
                {CreateJourneyFunc()}
            </div>
            <div className="h-56 grid grid-cols-2 gap-10 content-evenly p-16 relative">
                {showJourneys()}
            </div>
            <div className="relative">
                <button onClick={e => setNewPostToggle(!newPostToggle)}>{!newPostToggle ? "Click here to create a new journey" : "Back"}</button>
            </div>
        </div>
    )
    }