import { Card, CardHeader, Heading, CardBody, CardFooter, Button } from "@chakra-ui/react";
import { getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { auth, database } from "../firebase-config";
import { Ijourney, IStoredJourney } from "../interfaces/Interfaces";
import JourneyPage from "../pages/JourneyPage";
import { JourneyState } from "../recoil/atoms";

type JourneyCardProps = {
    journey: Ijourney;
    usersThatStoredJourney: IStoredJourney[];
}

const JourneyCard = (props : JourneyCardProps) => {
    const navigate = useNavigate();
    const [editJourney, setEditJourney] = useRecoilState(JourneyState);


    const showJourneyPage = () => {
        setEditJourney(props.journey)
        navigate('/journey');
    }

    const storeJourneyToUser = async () => {
        const data = {
            uid : auth.currentUser?.uid, 
            authorID : props.journey.uid, 
            journeyID : props.journey.journeyID
        }
        try {
            setDoc(doc(database, 'storedJourneys/' ,props.journey.journeyID),data)
            
        } catch (error) {
            console.log(error)
        }
    }

    const unstoreJourneyToUser = async () => {
        try {
            deleteDoc(doc(database, 'storedJourneys/' ,props.journey.journeyID))
        } catch (error) {
            console.log(error)
        }
    }

    const currentUserHaveStoredJourney = () => {
        const currentUserHaveStoredJourney = props.usersThatStoredJourney.filter((storedJ) => storedJ.uid === auth.currentUser?.uid);
        return currentUserHaveStoredJourney.length > 0;
    }

    const storeJourneyButton = () => {
        if (auth.currentUser?.uid === props.journey.uid) return (<></>);
        if(!currentUserHaveStoredJourney()){
            return <button className="bg-theme-green hover:text-pink-500 font-bold py-2 px-4 rounded m-5"
            onClick={storeJourneyToUser}>
            Store journey
        </button>
        } 
        return (
            <button className="bg-theme-green hover:text-pink-500 font-bold py-2 px-4 rounded m-5"
            onClick={unstoreJourneyToUser}>
            Unstore journey
        </button>
        )
    }

    return (
        <Card paddingBottom={4} margin={10} boxShadow={"2xl"} >
          <CardHeader >
            <Heading size='md'> {props.journey.title}</Heading>
          </CardHeader>
          <CardBody>
            <p>Description : {props.journey.description}</p>
            <p>Distance : {props.journey.distance}</p>
            <p>Cost : {props.journey.cost}</p>
          </CardBody>
          <CardFooter>
            <button className="bg-theme-green hover:text-pink-500 font-bold py-2 px-4 rounded m-5"
                onClick={showJourneyPage}>
                View journey
            </button>

            {storeJourneyButton()}

            <br />
            <br />
            <p>Author: {auth.currentUser?.uid === props.journey.uid ? 'You!':props.journey.uid}</p>
          </CardFooter>
        </Card>
    )
}

export default JourneyCard;