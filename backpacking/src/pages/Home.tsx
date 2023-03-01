import {
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Ijourney, IStoredJourney, Iuser } from "../interfaces/Interfaces";
import { auth, getCollection } from "../firebase-config";
import "../components/css/components.css";
import JourneyCard from "../components/JourneyCard";
import { useRecoilState } from "recoil";
import { StoredUserJourneys } from "../recoil/atoms";

export default function Home() {
  const [journeys, setJourneys] = useState<Ijourney[]>([]);
  const [storedJData, setStoredJData] = useState<IStoredJourney[]>([]);
  const [users, setUsers] = useState<Iuser[]>([]);

  const getJourneysRef = getCollection('journeys');
  const getStoredJRef = getCollection('storedJourneys');
  const getUsersRef = getCollection('users');

  useEffect(() => {
    try {
        getUsers();
    } catch (error) {
        console.log(error);
    }
  }, []);

  const getUsers = async () => {
    const journeyData = await getDocs(getJourneysRef)
    const storedJData = await getDocs(getStoredJRef)
    const usersData = await getDocs(getUsersRef)

    setStoredJData(storedJData.docs.map((journey) => ({ ...journey.data() } as IStoredJourney)))
    setJourneys(journeyData.docs.map((journey) => ({ ...journey.data() } as Ijourney)))// adds all users to the users state
    setUsers(usersData.docs.map((user) => ({ ...user.data() } as Iuser)))
  }

  const getAuthorName = (journey : Ijourney) => {
    return users.find((user) => user.uid === journey.uid)?.username;
    // return users.filter((user) => user.uid === journey.uid)
    //     .map((user) => user.username);
    }

  const showJourneys = () => {
    return (
      journeys.map((journey) =>
        <JourneyCard authorUsername={getAuthorName(journey)!} fromWhatPage="home" key={journey.journeyID} journey={journey} usersThatStoredJourney={whoHaveStoredJourney(journey)}/>
      ));
  }

  const whoHaveStoredJourney = (journey : Ijourney) => {
    return storedJData.filter((storedJ) => storedJ.journeyID === journey.journeyID)
        .map((storedJ) => storedJ);
    }

  return (
    <div className="content-container relative mt-14" >
      <div className="left-panel">
      </div>
      <div className="middle-panel">
        {storedJData && journeys ?  showJourneys() : <div>Loading...</div>}
      </div>
      <div className="right-panel">
      </div>
    </div>
  )

}