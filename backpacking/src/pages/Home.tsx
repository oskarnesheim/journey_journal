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

  const getJourneysRef = getCollection('journeys');
  const getStoredJRef = getCollection('storedJourneys');

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

    setStoredJData(storedJData.docs.map((journey) => ({ ...journey.data() } as IStoredJourney)))
    setJourneys(journeyData.docs.map((journey) => ({ ...journey.data() } as Ijourney)))// adds all users to the users state
  }

  const showJourneys = () => {
    return (
      journeys.map((journey) =>
        <JourneyCard fromWhatPage="home" key={journey.journeyID} journey={journey} usersThatStoredJourney={whoHaveStoredJourney(journey)}/>
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
        {storedJData && journeys && showJourneys()}
      </div>
      <div className="right-panel">
      </div>
    </div>
  )

}