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
import {
  auth,
  database,
  getCollection,
  getRatingsRef,
} from "../firebase-config";
import { UserState } from "../recoil/atoms";
import { useRecoilState } from "recoil";
import { Ijourney } from "../interfaces/Interfaces";
import "../components/css/components.css";
import EditCountryList from "../components/EditCountryList";
import GeneralButton from "../components/GeneralButton";
import EditText from "../components/EditText";
import {
  getStorage,
  ref,
  getDownloadURL,
  list,
  listAll,
} from "firebase/storage";
import { ViewPictures } from "../components/Profile/ViewPictures";

type JourneyProps = {
  journey: Ijourney | undefined;
};

const JourneyPage = (props: JourneyProps) => {
  const getJourneyRef = getCollection("journeys/");
  const [journey, setJourney] = useState<Ijourney>(props.journey!);
  const [averageRating, setAverageRating] = useState<number>(0);
  const navigate = useNavigate();
  const [isJourneyRated, setIsJourneyRated] = useState<boolean>();
  const [user, setUser] = useRecoilState(UserState);

  const [imgURLs, setImgURLs] = useState<string[]>([]);

  const storage = getStorage();

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
      const averageRating = totalRating / numRatings;
      return Number(averageRating.toFixed(2));
    }
  };

  if (journey != undefined) {
    useEffect(() => {
      const folderRef = ref(storage, `journeys/${journey.journeyID}`);

      const fetchAverageRating = async () => {
        const rating = await getAverageRating(journey.journeyID);
        setAverageRating(rating);
      };
      fetchAverageRating();
      listAll(folderRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImgURLs((prev) => [...prev, url]);
          });
        });
      });
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

  return (
    <div className="viewJourney">
      <div className=" dark:bg-theme-dark dark:text-theme-green align-top justify-center flex flex-col p-10 ml-20 mr-20">
        <ViewPictures imgURLs={imgURLs} />
        <EditText
          whatAttribute="Title"
          journey={journey}
          setJourney={setJourney}
          text={journey?.title}
          saveChanges={saveChanges}
        />
        <EditText
          whatAttribute="Description"
          journey={journey}
          setJourney={setJourney}
          text={journey?.description}
          saveChanges={saveChanges}
        />
        <EditText
          whatAttribute="Cost"
          journey={journey}
          setJourney={setJourney}
          text={journey?.cost.toString()}
          saveChanges={saveChanges}
        />

        <div className="shadow-md p-5">
          {user && auth.currentUser?.uid !== journey?.uid ? (
            <div>
              <label>Give the journey a rating: </label>
              <select
                className="Rating dark:bg-theme-dark"
                id="selectList"
                defaultValue={"0"}
              >
                <option value="0" disabled selected hidden>
                  Rating
                </option>
                <option value="1">1: Poor</option>
                <option value="2">2: Ok</option>
                <option value="3">3: Good</option>
                <option value="4">4: Very good</option>
                <option value="5">5: Excellent</option>
              </select>
              <GeneralButton
                description={isJourneyRated ? "Change rating" : "Submit rating"}
                onClick={isJourneyRated ? removeJourneyRating : submitRating}
              />
            </div>
          ) : null}
          <p>
            Current rating :{" "}
            {averageRating === 0 ? "Not yet rated" : averageRating + "/5"}
          </p>
        </div>
        <EditCountryList
          journey={journey}
          setJourney={setJourney}
          saveChanges={saveChanges}
        />
      </div>
      <GeneralButton description="Home" onClick={() => navigate("/home")} />
      {auth.currentUser?.uid === journey?.uid ? (
        <GeneralButton
          description="Profile"
          onClick={() => navigate("/profile")}
        />
      ) : null}
      {auth.currentUser?.uid === journey?.uid ? (
        <GeneralButton
          description="Delete"
          onClick={() => deletePost(journey!)}
        />
      ) : null}
    </div>
  );
};
export const getAverageRating = async (journeyID: string) => {
  const querySnapshot = await getDocs(
    query(getRatingsRef, where("journeyID", "==", journeyID))
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
    const averageRating = totalRating / numRatings;
    return Number(averageRating.toFixed(2));
  }
};

export default JourneyPage;
