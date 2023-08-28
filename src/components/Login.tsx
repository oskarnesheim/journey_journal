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

type LoginUser = {
  email: string;
  password: string;
};

const Login = () => {
  const [formUser, setFormUser] = useState({
    email: "",
    password: "",
  } as LoginUser);

  const [errorMessage, setErrorMessage] = useState("");
  const [globalUser, setGlobalUser] = useRecoilState(UserState);

  const navigate = useNavigate();
  const getUsersRef = getCollection("users/");

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("sign in");
    try {
      const emailSignIn = formUser.email;
      const passwordSignIn = formUser.password;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailSignIn,
        passwordSignIn
      );
      console.log(userCredential);
      const user = userCredential.user;
      const userID = user.uid;

      const q = query(getUsersRef, where("uid", "==", userID));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);

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

  return (
    <div className="formControlLogin">
      <form onSubmit={(e) => signIn(e)}>
        <FormControl>
          <h2 className="text-red-600 font-bold">{errorMessage}</h2>
          <FormLabel>Email address</FormLabel>
          <Input
            required
            value={formUser.email}
            type="email"
            onChange={(e) =>
              setFormUser({ ...formUser, email: e.target.value })
            }
          />
          <FormLabel>Password</FormLabel>
          <Input
            required
            type="password"
            value={formUser.password}
            onChange={(e) =>
              setFormUser({ ...formUser, password: e.target.value })
            }
          />
          <GeneralButton description={"Sign in"} type="submit" />
        </FormControl>
      </form>
    </div>
  );
};

export default Login;
