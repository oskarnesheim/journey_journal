import { Alert, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { setDoc, doc, GeoPoint, Firestore } from "firebase/firestore";
import { useState } from "react";
import SelectedCountries from "../../custom-hooks/SelectedCountries";
import { database, auth, firestoreAutoId } from "../../firebase-config";
import { Ijourney } from "../../interfaces/Interfaces";
import "../css/components.css";
import GeneralButton from "../GeneralButton";

type CreateJourneyProps = {
  setRefreshPosts: React.Dispatch<React.SetStateAction<boolean>>;
  refreshPosts: boolean;
  newPostToggle: boolean;
  setNewPostToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateJourney = ({
  setRefreshPosts,
  refreshPosts,
  newPostToggle,
  setNewPostToggle,
}: CreateJourneyProps) => {
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [journeyForm, setJourneyForm] = useState<Ijourney>({
    title: "",
    cost: 0,
    uid: "",
    countries: [],
    description: "",
    journeyID: "",
  });

  const addJourney = (e: React.FormEvent<HTMLFormElement>): void => {
    console.log(
      "🚀 ~ file: CreateJourney.tsx:35 ~ addJourney ~ addJourney:",
      addJourney
    );

    e.preventDefault();
    try {
      const newJourneyPost: Ijourney = {
        title: journeyForm.title,
        description: journeyForm.description,
        cost: journeyForm.cost,
        uid: auth.currentUser?.uid!,
        countries: journeyForm.countries,
        journeyID: firestoreAutoId(),
      };
      setDoc(
        doc(database, "journeys/", newJourneyPost.journeyID),
        newJourneyPost
      );

      setJourneyForm({
        title: "",
        description: "",
        cost: 0,
        uid: "",
        countries: [],
        journeyID: "",
      } as Ijourney);

      setRefreshPosts(!refreshPosts);
      setNewPostToggle(!newPostToggle);
      alert("Your journey has been created!");
    } catch (error) {
      setStatusMessage("Something went wrong, please try again");
    }
  };

  return (
    <div className="dark:text-theme-green dark:bg-theme-dark createJourney shadow-2xl">
      <form onSubmit={(e) => addJourney(e)}>
        <FormControl>
          {statusMessage}
          <FormLabel colorScheme="#454545" marginLeft={"160"}>
            Trip name
          </FormLabel>

          <Input
            required
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
            required
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
          <FormLabel colorScheme="#454545" marginLeft={"160"}>
            {" "}
            Tell about your trip!
          </FormLabel>
          <Input
            required
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
          <div className="w-4/5 ml-[150px] dark:text-theme-dark">
            <SelectedCountries
              journey={journeyForm}
              setJourney={setJourneyForm}
            />
          </div>
          <GeneralButton description="Post" type="submit" />
        </FormControl>
      </form>
    </div>
  );
};

export default CreateJourney;
