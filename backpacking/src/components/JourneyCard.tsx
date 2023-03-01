import { Card, CardHeader, Heading, CardBody, CardFooter, Button } from "@chakra-ui/react";
import { getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { auth, database } from "../firebase-config";
import { Ijourney, IStoredJourney } from "../interfaces/Interfaces";
import JourneyPage from "../pages/JourneyPage";
import { JourneyState, UserState } from "../recoil/atoms";

type JourneyCardProps = {
    journey: Ijourney;
    usersThatStoredJourney: IStoredJourney[];
    // setJourney: React.Dispatch<React.SetStateAction<Ijourney>>;
}

const JourneyCard = (props : JourneyCardProps) => {
    const navigate = useNavigate();
    const [editJourney, setEditJourney] = useRecoilState(JourneyState);
    const [journey, setJourney] = useState<Ijourney>({} as Ijourney);
    const [isJourneyStored, setIsJourneyStored] = useState<boolean>();

    const [updateMessage, setUpdateMessage] = useState<string>("");


    const showJourneyPage = () => {
        setEditJourney(journey)
        navigate('/journey');
    }

    useEffect(() => {
        setJourney(props.journey)
        setIsJourneyStored(currentUserHaveStoredJourney())
    }, [])
    

    const storeJourneyToUser = async () => {
        const data = {
            uid : auth.currentUser?.uid, 
            authorID : journey.uid, 
            journeyID : journey.journeyID
        }
        try {
            setDoc(doc(database, 'storedJourneys/' ,journey.journeyID),data)
            setIsJourneyStored(true)
            setUpdateMessage('')
        } catch (error) {
            console.log(error)
        }
    }
    
    const unstoreJourneyToUser = async () => {
        try {
            deleteDoc(doc(database, 'storedJourneys/' ,journey.journeyID))
            setIsJourneyStored(false)
            setUpdateMessage('The journey will be away when reloading the page')
        } catch (error) {
            console.log(error)
        }
    }

    const currentUserHaveStoredJourney = () => {
        const currentUserHaveStoredJourney = props.usersThatStoredJourney.filter((storedJ) => storedJ.uid === auth.currentUser?.uid);
        return currentUserHaveStoredJourney.length > 0;
    }

    const storeJourneyButton = () => {
        if (auth.currentUser?.uid === journey.uid) return (<></>);
        return(
            <button className="bg-theme-green hover:text-pink-500 font-bold py-2 px-4 rounded m-5"
                onClick={isJourneyStored? unstoreJourneyToUser : storeJourneyToUser}>
               {isJourneyStored ? 'Unstore journey' : 'Store journey'}
            </button>
        )
    }

    return (
        <Card paddingBottom={4} margin={10} boxShadow={"2xl"} >
          <CardHeader >
            <Heading size='md'> {journey.title}</Heading>
          </CardHeader>
          <CardBody>
            <p>Description : {journey.description}</p>
            <p>Distance : {journey.distance}</p>
            <p>Cost : {journey.cost}</p>
          </CardBody>
          <CardFooter>
            <button className="bg-theme-green hover:text-pink-500 font-bold py-2 px-4 rounded m-5"
                onClick={showJourneyPage}>
                View journey
            </button>
            {updateMessage}
            {journey && storeJourneyButton()}

            <br />
            <br />
            <p className="absolute right-5 bottom-5">Author: {auth.currentUser?.uid === journey.uid ? 'You!':journey.uid}</p>
          </CardFooter>
        </Card>
    )
}

export default JourneyCard;