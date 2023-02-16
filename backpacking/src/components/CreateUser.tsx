import { FormControl, FormLabel, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormHelperText, Button } from "@chakra-ui/react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { database, auth, firestoreAutoId } from "../firebase-config";
import { Iuser } from "../interfaces/Interfaces";
import "../index.css"
import { useNavigate } from "react-router-dom";
import { UserState } from "../recoil/atoms";
import { useRecoilState } from "recoil";

const CreateUser = () =>{
    const navigate = useNavigate();
    const [newUser, setUser] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        email: "",
        age: 0,
        isAdmin : false,
        uid : ""}as Iuser)
        
    const [globalUser, setGlobalUser] = useRecoilState(UserState);

    const addUser = ():void => {
        signUpUser().then((res)=>{
            setDoc(doc(database, 'users/' ,newUser.firstname + " " + newUser.lastname), newUser)
        });
        setGlobalUser(newUser)
        // setUser({
        //     firstname: "",
        //     lastname: "",
        //     username: "",
        //     password: "",
        //     email: "",
        //     age: 0,
        //     isAdmin : false} as Iuser)
        navigate('/home');
    }

    const signUpUser = async ():Promise<string> => {
        const email = newUser.email;
        const password = newUser.password;
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // onAuthStateChanged(auth, (user) => {
            
        // });
            const userCredentialUID = userCredential.user.uid;
            setUser({...newUser, uid: userCredentialUID})
            newUser.uid = userCredential.user.uid;
            return userCredentialUID;
        } catch (error){
            console.log(error);
        }
        return "feil i bruker";
    }
    return(
        <div>
            <FormControl>
                <FormLabel>Firstname</FormLabel>
                    <Input type='email' value={newUser.firstname} onChange={(e) => setUser(
                        {...newUser, firstname: e.target.value})}/>


                <FormLabel>Lastname</FormLabel>
                    <Input type='email' value={newUser.lastname} onChange={(e) => setUser(
                {...newUser, lastname: e.target.value})}/>


                <FormLabel>Username</FormLabel>
                    <Input type='email' value={newUser.username} onChange={(e) => setUser(
                        {...newUser, username: e.target.value})}/>


                <FormLabel>Email address</FormLabel>
                    <Input type='email' value={newUser.email} onChange={(e) => setUser(
                        {...newUser, email: e.target.value})}/>
                <br />
                <br />
                
                <p>Age</p>
                <NumberInput defaultValue={0} min={16} max={169} onChange={(e) => setUser(
                {...newUser, age: parseInt(e)})}>
                    <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                <FormHelperText>You must be over 15 to join</FormHelperText>
                </NumberInput >

                <FormLabel>Password</FormLabel>
                    <Input type='password' value={newUser.password} onChange={(e) => setUser(
                        {...newUser, password: e.target.value})}/>
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