import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Editable,
  EditablePreview,
  EditableTextarea,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import {
  setDoc,
  doc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database, getCollection } from "../firebase-config";
import { UserState } from "../recoil/atoms";
import { useRecoilState } from "recoil";
import { Ijourney } from "../interfaces/Interfaces";
import "../components/css/components.css";
import EditText from "../components/EditText";

type JourneyProps = {
  journey: Ijourney;
};

const JourneyPage = (props: JourneyProps) => {
  const getJourneyRef = getCollection("journeys/");
  const [journey, setJourney] = useState<Ijourney>(props.journey);
  const [averageRating, setAverageRating] = useState<number>(0);
  const navigate = useNavigate();
  const [isJourneyRated, setIsJourneyRated] = useState<boolean>();
  const [user, setUser] = useRecoilState(UserState);

  const getAverageRating = async (journeyID: string) => {
    const ratingsRef = collection(database, "ratingJourneys");
    const querySnapshot = await getDocs(
      query(ratingsRef, where("journeyID", "==", journeyID))
    );

    let totalRating = 0;
    let numRatings = 0;

    querySnapshot.forEach((doc) => {
      const ratingData = doc.data();
      totalRating += ratingData.rating;
      numRatings++;
    });

    if (numRatings === 0) {
      return 0;
    } else {
      return totalRating / numRatings;
    }
  };

  if (journey != undefined) {
    useEffect(() => {
      const fetchAverageRating = async () => {
        const rating = await getAverageRating(journey.journeyID);
        setAverageRating(rating);
      };
      fetchAverageRating();
    }, [journey.journeyID]);
  } else {
    console.log("Error");
  }

  const saveChanges = async (journey: Ijourney) => {
    const journeyToBeSaved: Ijourney = {
      title: journey.title,
      description: journey.description,
      cost: journey.cost,
      countries: journey.countries,
      uid: journey.uid,
      journeyID: journey.journeyID,
    };
    try {
      await setDoc(
        doc(database, "journeys/", journeyToBeSaved.journeyID),
        journeyToBeSaved
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = (journey: Ijourney) => {
    try {
      deleteDoc(doc(getJourneyRef, journey.journeyID));
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const giveJourneyRating = async () => {
    let dropdownList = document.getElementById(
      "selectList"
    ) as HTMLSelectElement | null;
    if (dropdownList != null && journey != undefined) {
      const data = {
        uid: auth.currentUser?.uid,
        rating: dropdownList,
        journeyID: journey.journeyID,
      };
      const journeyRated = doc(
        database,
        "ratingJourneys",
        user?.uid + ":" + journey.journeyID
      );
      try {
        setDoc(journeyRated, {
          journeyID: journey.journeyID,
          rating: Number(dropdownList.value),
          uid: user?.uid,
        });

        alert("You have successfully rated this journey!");
        setIsJourneyRated(true);
        dropdownList.disabled = true;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeJourneyRating = async () => {
    let dropdownList = document.getElementById(
      "selectList"
    ) as HTMLSelectElement | null;
    if (dropdownList != null && journey != undefined) {
      const data = {
        uid: auth.currentUser?.uid,
        rating: journey.uid,
        journeyID: journey.journeyID,
      };
      try {
        deleteDoc(
          doc(database, "storedJourneys/", data.journeyID + ":" + data.uid)
        );
        setIsJourneyRated(false);
        dropdownList.disabled = false;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const submitRating = async () => {
    if (journey) {
      await giveJourneyRating();
      const rating = await getAverageRating(journey.journeyID);
      setAverageRating(rating);
    }
  };

  const rateJourneyButton = () => {
    return (
      <button
        className="bg-theme-green hover:text-pink-500 font-bold py-2 px-4 rounded m-5"
        onClick={isJourneyRated ? removeJourneyRating : submitRating}
      >
        {isJourneyRated ? "Change rating" : "Submit rating"}
      </button>
    );
  };

  return (
    <div className="viewJourney dark:bg-theme-dark dark:text-theme-green">
      {/* <h1>Title : {journey?.title}</h1> */}
      {
        <EditText
          whatAttribute="title"
          journey={journey}
          setJourney={setJourney}
          text={journey?.title}
          saveChanges={saveChanges}
        />
      }
      {
        <EditText
          whatAttribute="description"
          journey={journey}
          setJourney={setJourney}
          text={journey?.description}
          saveChanges={saveChanges}
        />
      }
      {
        <EditText
          whatAttribute="cost"
          journey={journey}
          setJourney={setJourney}
          text={journey?.cost.toString()}
          saveChanges={saveChanges}
        />
      }

      <p>Countries : {journey?.countries.join(", ")}</p>
      <p>
        Current rating :{" "}
        {averageRating === 0 ? "Not yet rated" : averageRating + "/5"}
      </p>

      <button
        className="bg-theme-green hover:text-pink-500 font-bold py-2 px-4 rounded m-5 dark:text-theme-dark"
        onClick={() => navigate("/home")}
      >
        Home
      </button>
      {auth.currentUser?.uid === journey?.uid ? (
        <button
          className="bg-theme-green hover:text-pink-500 font-bold py-2 px-4 rounded m-5 dark:text-theme-dark"
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>
      ) : null}
      {auth.currentUser?.uid === journey?.uid ? (
        <button
          className="bg-theme-green hover:text-pink-500 font-bold py-2 px-4 rounded m-5 dark:text-theme-dark"
          onClick={() => deletePost(journey!)}
        >
          Delete
        </button>
      ) : null}
      {user && auth.currentUser?.uid !== journey?.uid ? (
        <div>
          <label>Give the journey a rating: </label>
          <select className="Rating" id="selectList" defaultValue={"0"}>
            <option value="0" disabled selected hidden>
              Rating
            </option>
            <option value="1">1: Poor</option>
            <option value="2">2: Ok</option>
            <option value="3">3: Good</option>
            <option value="4">4: Very good</option>
            <option value="5">5: Excellent</option>
          </select>
          {rateJourneyButton()}
        </div>
      ) : null}
    </div>
  );
};
export const getAverageRating = async (journeyID: string) => {
  const ratingsRef = collection(database, "ratingJourneys");
  const querySnapshot = await getDocs(
    query(ratingsRef, where("journeyID", "==", journeyID))
  );

  let totalRating = 0;
  let numRatings = 0;

  querySnapshot.forEach((doc) => {
    const ratingData = doc.data();
    totalRating += ratingData.rating;
    numRatings++;
  });

  if (numRatings === 0) {
    return 0;
  } else {
    return totalRating / numRatings;
  }
};

export default JourneyPage;
