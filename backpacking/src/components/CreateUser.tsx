import {
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { database, auth, firestoreAutoId } from "../firebase-config";
import { Iuser } from "../interfaces/Interfaces";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { UserState } from "../recoil/atoms";
import { useRecoilState } from "recoil";
import "./css/components.css";
import GeneralButton from "./GeneralButton";

const CreateUser = () => {
  const navigate = useNavigate();
  const [formUser, setFormUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    age: 0,
    isAdmin: false,
    uid: "",
  } as Iuser);

  const [globalUser, setGlobalUser] = useRecoilState(UserState);
  const [emailIsValid, setEmailIsValid] = useState(false);

  const addUser = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    try {
      signUpUser();
      navigate("/home");
      alert("You have successfully registered a user");
    } catch (error) {
      console.log(error);
    }
  };

  const signUpUser = async () => {
    const email = formUser.email;
    const password = formUser.password;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userCredentialUID = userCredential.user.uid;

      const userToBeWritten: Iuser = {
        email: formUser.email,
        password: formUser.password,
        firstname: formUser.firstname,
        lastname: formUser.lastname,
        username: formUser.username,
        age: formUser.age,
        isAdmin: formUser.isAdmin,
        uid: userCredentialUID,
        description: "",
      };
      setDoc(doc(database, "users", userToBeWritten.uid), userToBeWritten);
      setGlobalUser(userToBeWritten);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="createUser-container">
      <form onSubmit={(e) => addUser(e)}>
        <FormControl></FormControl>
        <FormControl>
          <FormLabel>Firstname</FormLabel>
          <Input
            required
            type="text"
            value={formUser.firstname}
            onChange={(e) =>
              setFormUser({ ...formUser, firstname: e.target.value })
            }
          />

          <FormLabel>Lastname</FormLabel>
          <Input
            required
            type="text"
            value={formUser.lastname}
            onChange={(e) =>
              setFormUser({ ...formUser, lastname: e.target.value })
            }
          />

          <FormLabel>Username</FormLabel>
          <Input
            required
            type="text"
            value={formUser.username}
            onChange={(e) =>
              setFormUser({ ...formUser, username: e.target.value })
            }
          />

          <FormLabel>Email address</FormLabel>
          <Input
            required
            type="email"
            value={formUser.email}
            pattern="[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}"
            onChange={(e) => {
              setFormUser({ ...formUser, email: e.target.value });
              setEmailIsValid(e.target.validity.valid);
            }}
          />

          <FormLabel>Age</FormLabel>
          <NumberInput
            defaultValue={20}
            min={16}
            max={169}
            onChange={(e) => setFormUser({ ...formUser, age: parseInt(e) })}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
            <FormHelperText>You must be over 15 to join</FormHelperText>
          </NumberInput>

          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            required
            value={formUser.password}
            onChange={(e) =>
              setFormUser({ ...formUser, password: e.target.value })
            }
            // onKeyPress={handleKeyPress}
          />
          <FormHelperText>
            <b> We'll never share your password or email</b>
          </FormHelperText>
          <br />
          <GeneralButton type="submit" description={"Create"} />
        </FormControl>
      </form>
    </div>
  );
};

export default CreateUser;
