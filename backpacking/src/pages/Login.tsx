import { useState } from "react"
import { Iuser } from "../components/Interfaces"

// export interface Iuser{
//     firstname: string,
//     lastname: string,
//     username: string,
//     password: string,
//     email: string,
//     age: number,
//     isAdmin : boolean
// }


export default function Login() {
    const [user, setUser] = useState<Iuser>({} as Iuser)
        
    // const addUser = ():void => {
    //     setDoc(doc(database, 'users/Oskar/hikes' ,newUser.fullname), newUser)
    // }

    const handleClick = () => {

    }
        
      
    

    return (
        <div>
            <h1>Login</h1>

            <div>
                <p><input value={user.firstname} onChange={(e) => {}} type="text" /> firstname</p>
                <p><input type="text" /> lastname</p>
                <p><input type="number" /> age</p>
                <p><input type="text" /> email</p>
                <p><input type="text" /> password</p>
                <p><input type="text" /> username</p>
            </div>
        </div>
      );
    }   