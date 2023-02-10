import { useState } from "react"
import { Iuser } from "../interfaces/Interfaces"
import {auth} from "../firebase-config"
import { signOut } from "firebase/auth"
import CreateUser from "../components/CreateUser"
import Login from "../components/Login"


export default function LoginPage() {
    const [createUserOrLogin, setcreateUserOrLogin] = useState(false);

    const [user, setUser] = useState<Iuser>({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        email: "",
        age: 0,
        isAdmin : false}as Iuser)
    
    const signOutUser = async () => {
        try{
            await signOut(auth);
            alert("You have been signed out");
        } catch (error){
            console.log(error)
        }
    }

    const createUserOrLoginSwitcher = () => {
        setcreateUserOrLogin(!createUserOrLogin);
    }
    
    return(
        <div>
            <h1>Welcome to Journey Journal</h1>
            <div>
                {createUserOrLogin ? <CreateUser/> : <Login/>}
            </div>
            <button onClick={createUserOrLoginSwitcher}>{createUserOrLogin? "Create a user": "Back"}</button>
            <button onClick={signOutUser}>Logg out</button>
        </div>
    )
    } 