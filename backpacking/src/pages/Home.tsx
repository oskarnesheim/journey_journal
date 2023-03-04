import {
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Ijourney, IStoredJourney, Iuser } from "../interfaces/Interfaces";
import { auth, getCollection } from "../firebase-config";
import "../components/css/components.css";
import JourneyCard from "../components/JourneyCard";
import { useRecoilState } from "recoil";
import { StoredUserJourneys } from "../recoil/atoms";
import SearchBar from "../components/SearchBar";

export interface searchInputType {
  text: string;
}

export default function Home() {
  const [journeys, setJourneys] = useState<Ijourney[]>([]);
  const [filteredJourneys, setFilteredJourneys] = useState<Ijourney[]>([]);
  const [storedJData, setStoredJData] = useState<IStoredJourney[]>([]);
  const [users, setUsers] = useState<Iuser[]>([]);

  const [searchInput, setSearchInput] = useState<searchInputType>({
    text: "",
  });

  const getJourneysRef = getCollection("journeys");
  const getStoredJRef = getCollection("storedJourneys");
  const getUsersRef = getCollection("users");

  useEffect(() => {
    try {
      getUsers();
    } catch (error) {
      console.log(error);
    }
    console.log(auth.currentUser?.uid);
  }, []);

  useEffect(() => {
    console.log(searchInput.text);
    setFilteredJourneys(filterJourneys());
  }, [searchInput]);

  const getUsers = async () => {
    const journeyData = await getDocs(getJourneysRef);
    const storedJData = await getDocs(getStoredJRef);
    const usersData = await getDocs(getUsersRef);

    setStoredJData(
      storedJData.docs.map(
        (journey) => ({ ...journey.data() } as IStoredJourney)
      )
    );
    setJourneys(
      journeyData.docs.map((journey) => ({ ...journey.data() } as Ijourney))
    ); // adds all users to the users state
    setUsers(usersData.docs.map((user) => ({ ...user.data() } as Iuser)));
  };

  const getAuthorName = (journey: Ijourney) => {
    return users.find((user) => user.uid === journey.uid)?.username;
  };

  // const handleSearch = () => {
  //   console.log(searchInput.text);
  //   // setFilteredJourneys(filterJourneys());

  //   return <div>{searchInput.text}</div>;
  // };

  const showJourneys = () => {
    const f = filterJourneys();
    return f.map((journey) => (
      <JourneyCard
        authorUsername={getAuthorName(journey)!}
        fromWhatPage="home"
        key={journey.journeyID}
        journey={journey}
        usersThatStoredJourney={whoHaveStoredJourney(journey)}
      />
    ));
  };

  const filterJourneys = () => {
    const allCountriesString = (journeys: Ijourney) => {
      const countries = journeys.countries.map((country) => country);
      return countries.join(" ");
    };
    console.log("filtering");
    if (searchInput.text === "") return journeys;
    return journeys.filter(
      (journeyToBeFiltered) =>
        journeyToBeFiltered.title
          .toLowerCase()
          .includes(searchInput.text.toLowerCase()) ||
        journeyToBeFiltered.description
          .toLowerCase()
          .includes(searchInput.text.toLowerCase()) ||
        allCountriesString(journeyToBeFiltered)
          .toLowerCase()
          .includes(searchInput.text.toLowerCase())
    );
  };

  const whoHaveStoredJourney = (journey: Ijourney) => {
    return storedJData
      .filter((storedJ) => storedJ.journeyID === journey.journeyID)
      .map((storedJ) => storedJ);
  };

  return (
    <div className="content-container mt-14">
      <div className="left-panel shadow-xl fixed right-20 top-24">
        <SearchBar setSearch={setSearchInput} />
      </div>
      <div className="middle-panel">
        {storedJData && journeys ? showJourneys() : <div>Loading...</div>}
      </div>
      <div className="right-panel fixed right-20 top-40">
        <p>Right panel</p>
        {/* {handleSearch()} */}
      </div>
    </div>
  );
}
