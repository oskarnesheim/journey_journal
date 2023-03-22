import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { auth, database } from "../firebase-config";
import { Ijourney, IStoredJourney } from "../interfaces/Interfaces";
import JourneyPage from "../pages/JourneyPage";
import { JourneyState, UserState } from "../recoil/atoms";
import { getAverageRating } from "../pages/JourneyPage";
import GeneralButton from "./GeneralButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons'
import { faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";
library.add(fasFaStar, farFaStar, faStarHalfAlt)

type JourneyCardProps = {
  journey: Ijourney;
  usersThatStoredJourney: IStoredJourney[];
  fromWhatPage: string;
  authorUsername: string;
};

const JourneyCard = (props: JourneyCardProps) => {
  const navigate = useNavigate();
  const [editJourney, setEditJourney] = useRecoilState(JourneyState);
  const [journey, setJourney] = useState<Ijourney>({} as Ijourney);
  const [isJourneyStored, setIsJourneyStored] = useState<boolean>();
  const [storeCount, setStoreCount] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [globalUser, setGlobalUser] = useRecoilState(UserState);

  const [updateMessage, setUpdateMessage] = useState<string>("");

  const showJourneyPage = () => {
    setEditJourney(journey);
    navigate("/journey");
  };

  useEffect(() => {
    setJourney(props.journey);
    setIsJourneyStored(currentUserHaveStoredJourney());
    setStoreCount(numberOfUsersThatStoredJourney());
  }, []);

  const storeJourneyToUser = async () => {
    const data = {
      uid: auth.currentUser?.uid,
      authorID: journey.uid,
      journeyID: journey.journeyID,
    };
    try {
      setDoc(
        doc(database, "storedJourneys/", data.journeyID + ":" + data.uid),
        data
      );
      setIsJourneyStored(true);
      setStoreCount(storeCount + 1);
      setUpdateMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const unstoreJourneyToUser = async () => {
    const data = {
      uid: auth.currentUser?.uid,
      authorID: journey.uid,
      journeyID: journey.journeyID,
    };
    try {
      deleteDoc(
        doc(database, "storedJourneys/", data.journeyID + ":" + data.uid)
      );
      setIsJourneyStored(false);
      setStoreCount(storeCount - 1);
      if (props.fromWhatPage === "profile")
        setUpdateMessage("The journey will be away when reloading the page");
    } catch (error) {
      console.log(error);
    }
  };

  function getStarRating(averageRating: number): JSX.Element {
    const totalStars = 5;
    const fullStars = Math.floor(averageRating);
    const halfStar = Math.round(averageRating - fullStars) === 1;
    const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);
    const starElement = <FontAwesomeIcon icon={fasFaStar} />;
    const halfStarElement = <FontAwesomeIcon icon={faStarHalfAlt} />;
    const emptyStarElement = <FontAwesomeIcon icon={["far", "star"]} />;
  
    const stars: JSX.Element[] = [];
  
    for (let i = 0; i < fullStars; i++) {
      stars.push(starElement);
    }
  
    if (halfStar) {
      stars.push(halfStarElement);
    }
  
    for (let i = 0; i < emptyStars; i++) {
      stars.push(emptyStarElement);
    }
  
    const rating = averageRating.toFixed(2);
  
    return (
      <div>
        <span>{stars}</span>
        <span>({rating})</span>
      </div>
    );
  }
  
  
  

  const currentUserHaveStoredJourney = () => {
    const currentUserHaveStoredJourney = props.usersThatStoredJourney.filter(
      (storedJ) => storedJ.uid === auth.currentUser?.uid
    );
    return currentUserHaveStoredJourney.length > 0;
  };

  const numberOfUsersThatStoredJourney = () => {
    return props.usersThatStoredJourney.length;
  };

  const editJourneyButton = (path: string, alternative: string) => {
    return <img className="max-h-8" src={path} alt={alternative} />;
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

  function countriesList() {
    if (!journey.countries) return "";
    var countries = "";

    journey.countries.forEach((country) => {
      countries += country + " -> ";
    });
    countries = countries.slice(0, -4);
    return countries;
  }

  return (
    <Card
      paddingBottom={4}
      margin={5}
      boxShadow={"xl"}
      className="hover:shadow-2xl dark:bg-theme-dark2 hover:dark:shadow-[0_35px_60px_-15px_rgba(201,239,199,0.3)] "
    >
      <CardHeader>
        <Heading className="dark:text-theme-green" size="md">
          {" "}
          {journey.title}
        </Heading>
      </CardHeader>

      <CardBody className="dark:text-theme-green" onClick={showJourneyPage}>
        <p className="dark:text-theme-green">
          Description : {journey.description}
        </p>
        <p className="dark:text-theme-green">Cost : {journey.cost} kr</p>
        <Heading size="sm">{getStarRating(averageRating)}</Heading>
        <p className="dark:text-theme-green">Countries: {countriesList()}</p>
        <p className="dark:text-theme-green">
          Number of users that stored this journey : {storeCount}
        </p>
      </CardBody>
      <CardFooter>
        {updateMessage}
        {auth.currentUser?.uid === journey.uid || auth.currentUser === null ? (
          <></>
        ) : (
          <div className="absolute right-5 bottom-5">
            <GeneralButton
              onClick={
                isJourneyStored ? unstoreJourneyToUser : storeJourneyToUser
              }
              description={
                isJourneyStored
                  ? editJourneyButton("../../images/cancelIcon.png", "Cancel")
                  : editJourneyButton("../../images/likeIcon.png", "Store")
              }
            />
          </div>
        )}
        <br />
        <br />
        <p className="absolute right-5 bottom-5 dark:text-theme-green">
          Author:{" "}
          {auth.currentUser?.uid === journey.uid
            ? "You!"
            : props.authorUsername}
        </p>
      </CardFooter>
    </Card>
  );
};

export default JourneyCard;
