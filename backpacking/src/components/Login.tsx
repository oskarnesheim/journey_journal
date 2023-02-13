import { FormControl, FormLabel, Input, FormHelperText } from "@chakra-ui/react";
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import { auth, provider } from "../firebase-config";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    const signInWithMailPassword = async () => {
        try{
            const emailSignIn = email;
            const passwordSignIn = password;
            const userCredential = await signInWithEmailAndPassword(auth, emailSignIn, passwordSignIn);
            const user = userCredential.user;
            console.log(user)
        }catch(error){console.log(error);}  
    }

    return(
        <div>
            <FormControl>
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