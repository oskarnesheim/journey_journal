import { useState } from "react"
import { Iuser } from "../components/Interfaces"
import {setDoc, doc} from "firebase/firestore"
import {database} from "../firebase-config"
import { FormControl, FormLabel, Input, FormHelperText, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Button } from "@chakra-ui/react"

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
    const [user, setUser] = useState<Iuser>({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        email: "",
        age: 0,
        isAdmin : false}as Iuser)
        
    const addUser = ():void => {
        setDoc(doc(database, 'users/' ,user.firstname + user.lastname), user)
        setUser({} as Iuser)
    }

    const handleClick = () => {

    }
        
      
    

    return (
        <div>
            <h1>Login</h1>

            <div>
                <FormControl>
                    <FormLabel>Firstname</FormLabel>
                        <Input type='email' value={user.firstname} onChange={(e) => setUser(
                    {...user, firstname: e.target.value})}/>


                    <FormLabel>Lastname</FormLabel>
                        <Input type='email' value={user.lastname} onChange={(e) => setUser(
                    {...user, lastname: e.target.value})}/>


                    <FormLabel>Username</FormLabel>
                        <Input type='email' value={user.username} onChange={(e) => setUser(
                    {...user, username: e.target.value})}/>


                    <FormLabel>Email address</FormLabel>
                        <Input type='email' value={user.email} onChange={(e) => setUser(
                    {...user, email: e.target.value})}/>
                    <br />
                    <br />
                    
                    <p>Age</p>
                    <NumberInput defaultValue={18} min={0} max={169}>
                        <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>

                    <FormLabel>Password</FormLabel>
                        <Input type='email' value={user.password} onChange={(e) => setUser(
                    {...user, password: e.target.value})}/>
                    <FormHelperText><b> We'll never share your password or email</b></FormHelperText>
                    <br />
                    <Button colorScheme='teal' variant='outline' onClick={addUser}>
                        Button
                    </Button>
                </FormControl>
            </div>
        </div>
      );
    }   

