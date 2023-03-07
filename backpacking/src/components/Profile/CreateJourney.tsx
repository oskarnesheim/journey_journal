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
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { setDoc, doc, GeoPoint, Firestore } from "firebase/firestore";
import { useState } from "react";
import SelectedCountries from "../../custom-hooks/SelectedCountries";
import { database, auth, firestoreAutoId } from "../../firebase-config";
import { Ijourney } from "../../interfaces/Interfaces";
import "../css/components.css";

type CreateJourneyProps = {
  setRefreshPosts: React.Dispatch<React.SetStateAction<boolean>>;
  refreshPosts: boolean;
};

const CreateJourney = (props: CreateJourneyProps) => {
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [journeyForm, setJourneyForm] = useState<Ijourney>({
    title: "",
    distance: "",
    cost: 0,
    uid: "",
    countries: [],
    description: "",
    journeyID: "",
  });

  const addJourney = (): void => {
    try {
      const newJourneyPost: Ijourney = {
        title: journeyForm.title,
        distance: journeyForm.distance,
        description: journeyForm.description,
        cost: journeyForm.cost,
        uid: auth.currentUser?.uid!,
        countries: journeyForm.countries,
        journeyID: firestoreAutoId(),
      };
      console.log(
        "🚀 ~ file: CreateJourney.tsx:49 ~ addJourney ~ newJourneyPost:",
        newJourneyPost
      );
      setDoc(
        doc(database, "journeys/", newJourneyPost.journeyID),
        newJourneyPost
      );

      setJourneyForm({
        title: "",
        distance: "",
        description: "",
        cost: 0,
        uid: "",
        countries: [],
        journeyID: "",
      } as Ijourney);
      setStatusMessage(
        "You have successfully posted a journey\n You can check it out under profile"
      );

      props.setRefreshPosts(!props.refreshPosts);
    } catch (error) {
      setStatusMessage("Something went wrong, please try again");
    }
  };

  return (
    <div className="dark:text-theme-green dark:bg-theme-dark">
      <FormControl>
        {statusMessage}
        <FormLabel colorScheme="#454545" marginLeft={"160"}>
          Trip name
        </FormLabel>
        <Input
          placeholder="Trip name"
          type="text"
          width="80%"
          value={journeyForm.title}
          onChange={(e) =>
            setJourneyForm({ ...journeyForm, title: e.target.value })
          }
        />
        <br />
        <br />
        <FormLabel colorScheme="pink" marginLeft={"160"}>
          Cost in kr
        </FormLabel>
        <Input
          placeholder="Cost"
          type="number"
          width="80%"
          value={journeyForm.cost}
          onChange={(e) =>
            setJourneyForm({ ...journeyForm, cost: parseInt(e.target.value) })
          }
        />
        <br />
        <br />
        <FormLabel colorScheme="pink" marginLeft={"160"}>
          Distance in km
        </FormLabel>
        <Input
          placeholder="How far?"
          type="number"
          width="80%"
          value={journeyForm.distance}
          onChange={(e) =>
            setJourneyForm({ ...journeyForm, distance: e.target.value })
          }
        />
        <br />
        <br />
        <FormLabel colorScheme="#454545" marginLeft={"160"}>
          {" "}
          Tell about your trip!
        </FormLabel>
        <Input
          placeholder="Write about all your fun experiences!"
          type="text"
          width="80%"
          value={journeyForm.description}
          onChange={(e) =>
            setJourneyForm({ ...journeyForm, description: e.target.value })
          }
        />
        <br />
        <br />

        <FormLabel colorScheme="#454545" marginLeft={"160"}>
          Select your countries
        </FormLabel>
        <div className="dropDownCountries dark:text-theme-dark">
          <SelectedCountries setSelected={setJourneyForm} />
        </div>
        <button
          className="bg-theme-green hover:text-pink-500 font-bold py-2 px-4 rounded m-5 dark:text-theme-dark"
          onClick={addJourney}
        >
          Post
        </button>
      </FormControl>
    </div>
  );
};

export default CreateJourney;
