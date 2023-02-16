import { FormControl, FormLabel, Input, FormHelperText } from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { getDocs, where,query } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { auth, getCollection, provider } from "../firebase-config";
import { Iuser } from "../interfaces/Interfaces";
import { UserState } from "../recoil/atoms";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [globalUser, setGlobalUser] = useRecoilState(UserState)
    // const auth = getAuth();
    
    const navigate = useNavigate();
    const getUsersRef = getCollection('users');

    const signInWithGoogle = async () => {
        try{
            const userCredential = await signInWithPopup(auth,provider)
            const user =  userCredential.user;
            const userID = user.uid;


            const q = query(getUsersRef,where('userID', '==', userID));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                setErrorMessage("Invalid login - no users with that email");
                console.log('No matching documents.');
                return;
            } else{
                setGlobalUser(
                    querySnapshot.docs.map((person) => ({...person.data()} as Iuser))[0]
                )
                navigate('/home')
            }

        } catch (error){
            console.log(error)
        }
    }

    const signInWithMailPassword = async () => {
        try{
            const emailSignIn = email;
            const passwordSignIn = password;
            const userCredential = await signInWithEmailAndPassword(auth, emailSignIn, passwordSignIn);
            const user =  userCredential.user;
            const userID = user.uid;

            const q = query(getUsersRef,where('userID', '==', userID));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.log('No matching documents.');
                setErrorMessage("Invalid login - no users with that email");
                return;
            } else{
                setGlobalUser(
                    querySnapshot.docs.map((person) => ({...person.data()} as Iuser))[0]
                )
                navigate('/home')
            }
        }catch(error){
            console.log(error);
            setErrorMessage("Invalid login");}  
    }

    return(
        <div>
            <FormControl>
                <h2 className="text-red-600 font-bold">
                    {errorMessage}
                </h2>
                <FormLabel>Email address</FormLabel>
                    <Input type='email' onChange={e => {
                        setEmail(e.target.value)
                    }}/>
                <FormLabel>Password</FormLabel>
                    <Input type='password' onChange={e =>{
                        setPassword(e.target.value)
                    }}/>
                    <button onClick={signInWithMailPassword} type="submit">Sign in</button>
            </FormControl>

            <p>Or sign in with  
                <button onClick={signInWithGoogle}> Google</button>
            </p>
        </div>
    )
}

export default Login;