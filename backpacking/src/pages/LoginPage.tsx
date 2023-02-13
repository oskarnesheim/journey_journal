import { useState } from "react"
import {auth} from "../firebase-config"
import { signOut } from "firebase/auth"
import CreateUser from "../components/CreateUser"
import Login from "../components/Login"


export default function LoginPage() {
    const [createUserOrLogin, setcreateUserOrLogin] = useState(false);
    
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
        <div className='w-1/2 content-evenly' >
            <h1 className="font-extrabold ">Welcome to Journey Journal</h1>
            <div>
                {createUserOrLogin ? <CreateUser/> : <Login/>}
            </div>
            <button onClick={createUserOrLoginSwitcher}>{createUserOrLogin? "Login" : "Create a user"}</button>
            <button onClick={signOutUser}>Logg out</button>
        </div>
    )
    } 