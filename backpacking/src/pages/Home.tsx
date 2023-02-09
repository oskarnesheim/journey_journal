import { getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Iuser } from "../components/Interfaces";
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

    const showUsers = () => {
        const output: JSX.Element[] = []
            users.forEach((user) =>
            output.push(
                <div key={user.firstname}>
                    <div>Firstname: {user.firstname} </div>
                    <div>Lastname: {user.lastname}</div>
                    <div>Username: {user.username}</div>
                    <div>Age: {user.age}</div>
                    <br />
                </div>) 
    )
    return output;
    } 
    return (
        <div>
        <h1>Home</h1>
        <div>
            {showUsers()}
        </div>
        </div>
    )
}