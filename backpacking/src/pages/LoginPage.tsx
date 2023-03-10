import { useState } from "react"
import {auth} from "../firebase-config"
import { signOut } from "firebase/auth"
import CreateUser from "../components/CreateUser"
import Login from "../components/Login"
import { UserState } from "../recoil/atoms"
import { useRecoilState } from "recoil"
import "../components/css/components.css"


export default function LoginPage() {
    const [createUserOrLogin, setcreateUserOrLogin] = useState(false);
    const [globalUser, setGlobalUser] = useRecoilState(UserState);
    
    const signOutUser = async () => {
        try{
            await signOut(auth);
            setGlobalUser(undefined);
            alert("You have been signed out");
        } catch (error){
            console.log(error)
        }
    }

    const createUserOrLoginSwitcher = () => {
        setcreateUserOrLogin(!createUserOrLogin);
    }
    
    return(
        <div className='authUser dark:bg-theme-dark dark:text-theme-green' >
            <h1 className="welcomeText font-extrabold">Welcome to Journey Journal</h1>
            <div>
                {createUserOrLogin ? <CreateUser/> : <Login/>}
            </div>
            <button className="m-10 hover:text-pink-500 border-solid border-lime-500 order-slate-500 rounded-md pl-4 pr-4" onClick={createUserOrLoginSwitcher}>{createUserOrLogin? "Login instead" : "Create a user"}</button>
            {auth.currentUser && <button className="m-10 hover:text-pink-500 border-solid border-lime-500  order-slate-500 rounded-md pl-4 pr-4" onClick={signOutUser}>Log out</button>}
        </div>
    )
    } 