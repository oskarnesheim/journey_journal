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

  const storeJourneyButton = () => {
    if (auth.currentUser?.uid === journey.uid || auth.currentUser === null)
      return <></>;
    return (
      <button
        className="bg-theme-green hover:text-pink-500 font-bold py-2 px-4 rounded m-5 absolute right-5 bottom-7"
        onClick={isJourneyStored ? unstoreJourneyToUser : storeJourneyToUser}
      >
        {isJourneyStored
          ? editJourneyButton("../../images/cancelIcon.png", "Cancel")
          : editJourneyButton("../../images/likeIcon.png", "Store")}
      </button>
    );
  };

  return (
    <Card paddingBottom={4} margin={10} boxShadow={"2xl"}>
      <CardHeader>
        <Heading size="md"> {journey.title}</Heading>
      </CardHeader>
      <CardBody>
        <p>Description : {journey.description}</p>
        <p>Distance : {journey.distance}</p>
        <p>Cost : {journey.cost}</p>
        <p>
          Countries: {journey.countries ? journey.countries.join(", ") : ""}
        </p>
        <p>Number of users that stored this journey : {storeCount}</p>
      </CardBody>
      <CardFooter>
        <button
          className="bg-theme-green hover:text-pink-500 font-bold py-2 px-4 rounded m-5"
          onClick={showJourneyPage}
        >
          View journey
        </button>
        {updateMessage}
        {storeJourneyButton()}

        <br />
        <br />
        <p className="absolute right-5 bottom-5">
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
