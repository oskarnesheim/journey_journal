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
import "../components/components.css";

export default function Home() {
    const [viewUsers, setviewUsers] = useState(false);
    const [users, setUsers] = useState<Iuser[]>([]);
    const [journeys, setJourneys] = useState<Ijourney[]>([]);
    
    const getUsersRef = getCollection('users');
    const getJourneysRef = getCollection('journeys');

    
    useEffect(() =>{
            const getUsers = async () =>{
            const userData = await getDocs(getUsersRef)
            const journeyData = await getDocs(getJourneysRef)
            setUsers(userData.docs.map((person) => ({...person.data()} as Iuser)))// adds all users to the users state
            setJourneys(journeyData.docs.map((journey) => ({...journey.data()} as Ijourney)))// adds all users to the users state
            // data.docs.map((person) => console.log({...person.data()})) // logs all users
    }
    getUsers();
    }, []);

    const showUsers = () => {
        return (
            users.map((user) =>
                <Card key={user.firstname + " " + user.lastname} paddingBottom={4} >
                    <CardHeader >
                        <Heading size='md'> {user.firstname} {user.lastname}</Heading>
                    </CardHeader>
                    <CardBody>
                        <p>username : {user.username}</p>
                        <p>age : {user.age}</p>
                    </CardBody>
                    <CardFooter>
                        <Button>View profile</Button>
                    </CardFooter>
                 </Card>
            ));} 
    
    const showJourneys = () => {
        return (
            journeys.map((journey) =>
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
        <div className='relative'>
            <div className="h-56 grid grid-cols-2 gap-10 content-evenly p-16 relative">
                {viewUsers ? showUsers() : showJourneys()}
            </div>
            <div>
                <button onClick={e => setviewUsers(!viewUsers)}>{viewUsers? "View journeys": "View users"}</button>
            </div>
        </div>
    )
}