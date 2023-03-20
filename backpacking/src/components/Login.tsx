import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getDocs, where, query } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { auth, getCollection, provider } from "../firebase-config";
import { Iuser } from "../interfaces/Interfaces";
import { UserState } from "../recoil/atoms";
import "./css/components.css";
import GeneralButton from "./GeneralButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [globalUser, setGlobalUser] = useRecoilState(UserState);

  const navigate = useNavigate();
  const getUsersRef = getCollection("users/");

  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      const userID = user.uid;

      const q = query(getUsersRef, where("uid", "==", userID));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setErrorMessage("Invalid login - no users with that email");
        console.log("No matching documents.");
        return;
      } else {
        setGlobalUser(
          querySnapshot.docs.map((person) => ({ ...person.data() } as Iuser))[0]
        );
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async () => {
    try {
      const emailSignIn = email;
      const passwordSignIn = password;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailSignIn,
        passwordSignIn
      );
      const user = userCredential.user;
      const userID = user.uid;

      const q = query(getUsersRef, where("uid", "==", userID));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No matching documents.");
        setErrorMessage("Invalid login - no users with that email");
        return;
      } else {
        setGlobalUser(
          querySnapshot.docs.map((person) => ({ ...person.data() } as Iuser))[0]
        );
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Invalid login");
    }
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleKeypressPassword = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      signIn();
    }
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="formControlLogin">
      <FormControl>
        <h2 className="text-red-600 font-bold">{errorMessage}</h2>
        <FormLabel>Email address</FormLabel>
        <Input type="email" onChange={handleChangeEmail} />
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          onChange={handleChangePassword}
          onKeyPress={handleKeypressPassword}
        />
        <GeneralButton
          description={"Sign in"}
          type={"submit"}
          onClick={signIn}
        />
      </FormControl>
    </div>
  );
};

export default Login;
