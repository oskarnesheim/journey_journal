import { FormControl, FormLabel, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormHelperText, Button } from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { database, auth } from "../firebase-config";
import { Iuser } from "../interfaces/Interfaces";

export const firestoreAutoId = (): string => {
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  
    let autoId = ''
  
    for (let i = 0; i < 20; i++) {
      autoId += CHARS.charAt(
        Math.floor(Math.random() * CHARS.length)
      )
    }
    return autoId
}

const CreateUser = () =>{

    const [user, setUser] = useState<Iuser>({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        email: "",
        age: 0,
        isAdmin : false}as Iuser)
        
    const addUser = ():void => {
        setDoc(doc(database, 'users/' ,firestoreAutoId()), user)
        signUpUser();
        setUser({firstname: "",
        lastname: "",
        username: "",
        password: "",
        email: "",
        age: 0,
        isAdmin : false} as Iuser)

    }

    const signUpUser = async () => {
        const email = user.email;
        const password = user.password;
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user)
        } catch (error){
            console.log(error);
        }
    }
    return(
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
                <NumberInput defaultValue={0} min={16} max={169} onChange={(e) => setUser(
                {...user, age: parseInt(e)})}>
                    <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                <FormHelperText>You must be over 15 to join</FormHelperText>
                </NumberInput >

                <FormLabel>Password</FormLabel>
                    <Input type='password' value={user.password} onChange={(e) => setUser(
                        {...user, password: e.target.value})}/>
                <FormHelperText><b> We'll never share your password or email</b></FormHelperText>
                <br />
                <Button colorScheme='teal' variant='outline' onClick={addUser}>
                    Create
                </Button>
            </FormControl>
        </div>
    )
}
    
export default CreateUser;