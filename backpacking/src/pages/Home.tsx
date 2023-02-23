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
        <Card key={journey.title + " " + journey.uid} paddingBottom={4} margin={10} boxShadow={"2xl"} >
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
      ));
  }

  return (
    <div className="content-container position:relative" >
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