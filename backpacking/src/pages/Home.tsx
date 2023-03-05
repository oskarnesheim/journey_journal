import { Grid, GridItem } from "@chakra-ui/react";
import { getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Ijourney, IStoredJourney, Iuser } from "../interfaces/Interfaces";
import { auth, getCollection } from "../firebase-config";
import "../components/css/components.css";
import JourneyCard from "../components/JourneyCard";
import FilterBox from "../components/Home/FilterBox";

export interface filterType {
  text: string;
  minPrice: number;
  maxPrice: number;
  activeFilter: boolean;
  minPriceActive: boolean;
  maxPriceActive: boolean;
}

export default function Home() {
  const [journeys, setJourneys] = useState<Ijourney[]>([]);
  const [filteredJourneys, setFilteredJourneys] = useState<Ijourney[]>([]);
  const [storedJData, setStoredJData] = useState<IStoredJourney[]>([]);
  const [users, setUsers] = useState<Iuser[]>([]);

  const [searchInput, setSearchInput] = useState<filterType>({
    text: "",
    minPrice: 0,
    maxPrice: 0,
    activeFilter: false,
    minPriceActive: false,
    maxPriceActive: false,
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
    setFilteredJourneys(filterBySearch());
    // console.log(
    //   searchInput.text,
    //   searchInput.minPrice,
    //   searchInput.maxPrice,
    //   searchInput.activeFilter,
    //   searchInput.minPriceActive,
    //   searchInput.maxPriceActive
    // );
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
    );
    setUsers(usersData.docs.map((user) => ({ ...user.data() } as Iuser)));
  };

  const getAuthorName = (journey: Ijourney) => {
    return users.find((user) => user.uid === journey.uid)?.username;
  };

  const showJourneys = () => {
    return filterBySearch().map((journey) => (
      <JourneyCard
        authorUsername={getAuthorName(journey)!}
        fromWhatPage="home"
        key={journey.journeyID}
        journey={journey}
        usersThatStoredJourney={whoHaveStoredJourney(journey)}
      />
    ));
  };

  const filterBySearch = () => {
    const allCountriesString = (journeys: Ijourney) => {
      const countries = journeys.countries.map((country) => country);
      return countries.join(" ");
    };
    // console.log("filtering by search");
    if (searchInput.text === "" && !searchInput.activeFilter) return journeys;
    const filteredBySearch = journeys.filter(
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

    const filteredByFilterBox = filteredBySearch.filter((journey) =>
      filterByFilterBox(journey)
    );

    return filteredByFilterBox;
  };

  const filterByFilterBox = (journey: Ijourney) => {
    if (!searchInput.activeFilter) return true; //? if no filters are active, return all journeys
    console.log(
      searchInput.minPriceActive,
      searchInput.minPrice,
      searchInput.maxPriceActive,
      searchInput.maxPrice,
      journey.cost
    );
    //? if price is active check if the price is in the range
    if (searchInput.minPriceActive && journey.cost < searchInput.minPrice) {
      console.log(
        "🚀 ~ file: Home.tsx:134 ~ filterByFilterBox ~ searchInput.minPriceActive:",
        searchInput.minPriceActive
      );
      return false;
    }
    if (searchInput.maxPriceActive && journey.cost > searchInput.maxPrice) {
      console.log(
        "🚀 ~ file: Home.tsx:141 ~ filterByFilterBox ~ searchInput.maxPriceActive:",
        searchInput.maxPriceActive
      );
      //? if price is active check if the price is in the range
      return false;
    }

    return true;
  };

  const whoHaveStoredJourney = (journey: Ijourney) => {
    return storedJData
      .filter((storedJ) => storedJ.journeyID === journey.journeyID)
      .map((storedJ) => storedJ);
  };

  return (
    <div className="content-container ">
      {storedJData && journeys ? showJourneys() : <div>Loading...</div>}
      <FilterBox
        maxPriceActive={setSearchInput}
        minPriceActive={setSearchInput}
        maxPrice={setSearchInput}
        minPrice={setSearchInput}
        activeFilter={setSearchInput}
        text={setSearchInput}
      />
    </div>
  );
}
