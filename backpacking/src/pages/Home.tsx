import { SimpleGrid, Card, CardHeader, Heading, CardBody, CardFooter, Button } from "@chakra-ui/react";
import { getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Iuser } from "../interfaces/Interfaces";
import { getCollection } from "../firebase-config";

export default function Home() {
    const [users, setUsers] = useState<Iuser[]>([]);
    
    const getUsersRef = getCollection('users');
    
    useEffect(() =>{
            const getUsers = async () =>{
            const data = await getDocs(getUsersRef)
            setUsers(data.docs.map((person) => ({...person.data()} as Iuser)))// adds all users to the users state
            // data.docs.map((person) => console.log({...person.data()})) // logs all users
    }
    getUsers();
    }, []);

    const showUsers = (usersIn:Iuser[]) => {
        return (
            usersIn.map((user) =>
            <SimpleGrid key={user.firstname + " " + user.lastname} spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>  
                <Card paddingBottom={4} >
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
         </SimpleGrid>
    )

    );
    } 
    return (
        <div>
        <h1 className="increase">Home</h1>
        <div>
            {showUsers(users)}
        </div>
        </div>
    )
}