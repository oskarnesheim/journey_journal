import { FormControl, FormLabel, Input, FormHelperText } from "@chakra-ui/react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase-config";

const Login = () => {
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
        
        
    }


    

    return(
        <div>
            // form that takes in email and password

            <FormControl>
                <FormLabel>Email address</FormLabel>
                    <Input type='email' />
                <FormLabel>Password</FormLabel>
                    <Input type='password' />
                    <button onClick={signInWithMailPassword} type="submit"></button>
            </FormControl>

            <button onClick={signInWithGoogle}>Login With Google</button>
        </div>
    )
}

export default Login;