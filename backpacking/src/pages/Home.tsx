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
import { Ijourney, Iuser } from "../interfaces/Interfaces";
import { getCollection } from "../firebase-config";
import "../components/css/components.css";
import JourneyCard from "../components/JourneyCard";

export default function Home() {
  const [journeys, setJourneys] = useState<Ijourney[]>([]);

  const getJourneysRef = getCollection('journeys');


  useEffect(() => {
    const getUsers = async () => {
      const journeyData = await getDocs(getJourneysRef)
      setJourneys(journeyData.docs.map((journey) => ({ ...journey.data() } as Ijourney)))// adds all users to the users state
    }
    getUsers();
  }, []);

  const showJourneys = () => {
    return (
      journeys.map((journey) =>
        <JourneyCard key={journey.journeyID} journey={journey}/>
      ));
  }

  return (
    <div className="content-container relative mt-14" >
      <div className="left-panel">
      </div>
      <div className="middle-panel">
        {showJourneys()}
      </div>
      <div className="right-panel">
      </div>
    </div>
  )

}