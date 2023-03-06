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
import "./css/components.css";

const CreateUser = () =>{
    const navigate = useNavigate();
    const [formUser, setFormUser] = useState({
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
        try {
            signUpUser();
            navigate('/home');
            alert("You have successfully registered a user");
        } catch (error) {
            console.log(error)
        }
    }
    
    const signUpUser = async () => {
        const email = formUser.email;
        const password = formUser.password;
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userCredentialUID = userCredential.user.uid;

            const userToBeWritten:Iuser = {
                email : formUser.email,
                password : formUser.password,
                firstname : formUser.firstname,
                lastname : formUser.lastname,
                username : formUser.username,
                age : formUser.age,
                isAdmin : formUser.isAdmin,
                uid : userCredentialUID,
                description : "",
            }
                setDoc(doc(database, 'users' ,userToBeWritten.uid), userToBeWritten)
                setGlobalUser(userToBeWritten)
            } catch (error){
                console.log(error);
            }
    }
    return(
        <div className="createUser-container">
            <FormControl>
                <FormLabel>Firstname</FormLabel>
                    <Input type='email' value={formUser.firstname} onChange={(e) => setFormUser(
                        {...formUser, firstname: e.target.value})}/>


                <FormLabel>Lastname</FormLabel>
                    <Input type='email' value={formUser.lastname} onChange={(e) => setFormUser(
                {...formUser, lastname: e.target.value})}/>


                <FormLabel>Username</FormLabel>
                    <Input type='email' value={formUser.username} onChange={(e) => setFormUser(
                        {...formUser, username: e.target.value})}/>


                <FormLabel>Email address</FormLabel>
                    <Input type='email' value={formUser.email} onChange={(e) => setFormUser(
                        {...formUser, email: e.target.value})}/>
                <br />
                <br />
                
                <p>Age</p>
                <NumberInput defaultValue={0} min={16} max={169} onChange={(e) => setFormUser(
                {...formUser, age: parseInt(e)})}>
                    <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                <FormHelperText>You must be over 15 to join</FormHelperText>
                </NumberInput >

                <FormLabel>Password</FormLabel>
                    <Input type='password' value={formUser.password} onChange={(e) => setFormUser(
                        {...formUser, password: e.target.value})}/>
                <FormHelperText><b> We'll never share your password or email</b></FormHelperText>
                <br />
                <Button colorScheme='teal' variant='outline' onClick={addUser}>
                    Create
                </Button>
            </FormControl>
    
        </div>)
}
    
export default CreateUser;