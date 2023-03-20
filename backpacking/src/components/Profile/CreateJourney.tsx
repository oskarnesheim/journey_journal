import { Alert, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { setDoc, doc, GeoPoint, Firestore } from "firebase/firestore";
import { useState } from "react";
import SelectedCountries from "../../custom-hooks/SelectedCountries";
import { database, auth, firestoreAutoId } from "../../firebase-config";
import { Ijourney } from "../../interfaces/Interfaces";
import "../css/components.css";
import GeneralButton from "../GeneralButton";
import { useNavigate } from "react-router-dom";
import { UploadPictures } from "./UploadPictures";
import { getStorage, uploadBytes, ref } from "firebase/storage";
// import { ref } from "firebase/database";

export type newImages = {
  id: string;
  file: File;
};

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
    journeyID: firestoreAutoId(),
    pictures: [],
  });
  const storage = getStorage();

  const addJourney = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    try {
      uploadImages();
      const newJourneyPost: Ijourney = {
        title: journeyForm.title,
        description: journeyForm.description,
        cost: journeyForm.cost,
        uid: auth.currentUser?.uid!,
        countries: journeyForm.countries,
        pictures: journeyForm.pictures,
        journeyID: journeyForm.journeyID,
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
        pictures: [],
      } as Ijourney);

      setRefreshPosts(!refreshPosts);
      setNewPostToggle(!newPostToggle);
      alert("Your journey has been created!");
    } catch (error) {
      setStatusMessage("Something went wrong, please try again");
    }
  };

  const [images, setImages] = useState<newImages[]>([]);

  const uploadImages = () => {
    console.log(images);
    if (images.length === 0) return;
    try {
      images.forEach((image) => {
        const imageRef = ref(
          storage,
          `images/${journeyForm.journeyID}/${image.id}`
        );

        uploadBytes(imageRef, image.file).then((snapshot) => {
          console.log("Uploaded", snapshot);
        });
        const ids = images.map((image) => image.id);
        setJourneyForm({
          ...journeyForm,
          pictures: ids,
        });
      });
    } catch (error) {
      console.log(error);
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
          <div className="w-[90%] ml-[150px] dark:text-theme-dark">
            <SelectedCountries 
              journey={journeyForm}
              setJourney={setJourneyForm}
            />
          </div>
          <UploadPictures
            images={images}
            journey={journeyForm}
            setJourney={setJourneyForm}
            setImages={setImages}
          />
          <GeneralButton description="Post" type="submit" />
        </FormControl>
      </form>
    </div>
  );
};

export default CreateJourney;
