import {
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import SelectedCountries from "../../custom-hooks/SelectedCountries";
import { database, auth, firestoreAutoId } from "../../firebase-config";
import { Ijourney } from "../../interfaces/Interfaces";
import "../css/components.css";
import GeneralButton from "../GeneralButton";

type CreateJourneyProps = {
  setRefreshPosts: React.Dispatch<React.SetStateAction<boolean>>;
  refreshPosts: boolean;
};

const CreateJourney = ({
  setRefreshPosts,
  refreshPosts,
}: CreateJourneyProps) => {
  const [statusMessage, setStatusMessage] = useState<string>("");
  const navigate = useNavigate();
  const [journeyForm, setJourneyForm] = useState<Ijourney>({
    title: "",
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
      navigate("/home");
      alert("You have successfully posted a journey. Check out your new post on your profile page!")
    } catch (error) {
      setStatusMessage("Something went wrong, please try again");
    }
  };

  return (
    <div className="dark:text-theme-green dark:bg-theme-dark createJourney">
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
        <div className="w-4/5 ml-[150px] dark:text-theme-dark">
          {/*dropDownCountries*/}
          <SelectedCountries
            journey={journeyForm}
            setJourney={setJourneyForm}
          />
        </div>
        <GeneralButton description={"Post"} onClick={addJourney} />
      </FormControl>
    </div>
  );
};

export default CreateJourney;
