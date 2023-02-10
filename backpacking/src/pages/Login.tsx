import { useState } from "react"
import { Iuser } from "../components/Interfaces"
import {setDoc, doc} from "firebase/firestore"
import {auth, database, provider} from "../firebase-config"
import { FormControl, FormLabel, Input, FormHelperText, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Button } from "@chakra-ui/react"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"

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
    const [createUserOrLogin, setcreateUserOrLogin] = useState(true);
    const [user, setUser] = useState<Iuser>({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        email: "",
        age: 0,
        isAdmin : false}as Iuser)
        
    const addUser = ():void => {
        setDoc(doc(database, 'users/' ,user.firstname + " " + user.lastname), user)
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

    const signInWithGoogle = async () => {
        try{
            const userCredential = await signInWithPopup(auth,provider)
            const user =  userCredential.user;
            console.log(userCredential)
            console.log(user)

        } catch (error){
            console.log(error)
        }
    }

    const signOutUser = async () => {
        try{
            await signOut(auth);
            alert("You have been signed out");
        } catch (error){
            console.log(error)
        }
    }
        
      
    
    if (createUserOrLogin){

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
                        <Input type='email' value={user.password} onChange={(e) => setUser(
                            {...user, password: e.target.value})}/>
                    <FormHelperText><b> We'll never share your password or email</b></FormHelperText>
                    <br />
                    <Button colorScheme='teal' variant='outline' onClick={addUser}>
                        Button
                    </Button>
                </FormControl>
                <button onClick={signOutUser}>Logg out</button>
            </div>
            : 
            

        </div>
      );
    }
    else{
        return(
            <div>
                <button onClick={signInWithGoogle}>Login With Google</button>
            </div>
        )
    }
    } 