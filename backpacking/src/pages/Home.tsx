import { Grid, GridItem } from "@chakra-ui/react";
import { getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Ijourney, IStoredJourney, Iuser } from "../interfaces/Interfaces";
import { auth, getCollection } from "../firebase-config";
import "../components/css/components.css";
import JourneyCard from "../components/JourneyCard";
import FilterBox from "../components/Home/FilterBox";
import SortingBox from "../components/SortingBox";

export interface filterType {
  text: string;
  minPrice: number;
  maxPrice: number;
  minPriceActive: boolean;
  maxPriceActive: boolean;
}

export interface sortingType {
  price: boolean;
  countriesVisited: boolean;
  numberOfLikes: boolean;
}

export default function Home() {
  const [journeys, setJourneys] = useState<Ijourney[]>([]);
  const [storedJData, setStoredJData] = useState<IStoredJourney[]>([]);
  const [users, setUsers] = useState<Iuser[]>([]);

  const [searchInput, setSearchInput] = useState<filterType>({
    text: "",
    minPrice: 0,
    maxPrice: 0,
    minPriceActive: false,
    maxPriceActive: false,
  });

  const [sortingInput, setSortingInput] = useState<sortingType>({
    price: false,
    countriesVisited: false,
    numberOfLikes: false,
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
    filterBySearch();
  }, [searchInput]);

  useEffect(() => {
    sortJourneysByPrice(journeys);
  }, [sortingInput.price]);

  useEffect(() => {
    sortJourneysByNumberOfCountriesVisited(journeys);
  }, [sortingInput.countriesVisited]);

  useEffect(() => {
    sortByNumberOfLikes(journeys);
  }, [sortingInput.numberOfLikes]);

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
    if (searchInput.text === "") return journeys;
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

  const sortJourneysByPrice = (journeys: Ijourney[]) => {
    if (sortingInput.price) return;
    setJourneys(
      journeys.sort((a, b) => {
        if (a.cost == b.cost) return 0;
        return a.cost > b.cost ? -1 : 1;
      })
    );
  };

  const sortByNumberOfLikes = (journeys: Ijourney[]) => {
    if (sortingInput.numberOfLikes) return;
    setJourneys(
      journeys.sort((a, b) => {
        if (whoHaveStoredJourney(a).length == whoHaveStoredJourney(b).length)
          return 0;
        return whoHaveStoredJourney(a).length > whoHaveStoredJourney(b).length
          ? -1
          : 1;
      })
    );
  };
  const sortJourneysByNumberOfCountriesVisited = (journeys: Ijourney[]) => {
    if (sortingInput.countriesVisited) return;
    setJourneys(
      journeys.sort((a, b) => {
        if (a.countries.length == b.countries.length) return 0;
        return a.countries.length > b.countries.length ? -1 : 1;
      })
    );
  };

  const filterByFilterBox = (journey: Ijourney) => {
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
      <div className="fixed top-28 right-5 shadow-2xl w-1/3 p-5 min-h-3/4 dark:bg-theme-dark2 dark:text-theme-green rounded-md hover:dark:shadow-[0_35px_60px_-15px_rgba(201,239,199,0.3)]">
        <FilterBox
          maxPriceActive={setSearchInput}
          minPriceActive={setSearchInput}
          maxPrice={setSearchInput}
          minPrice={setSearchInput}
          text={setSearchInput}
        />

        <SortingBox
          numberOfLikes={setSortingInput}
          countriesVisited={setSortingInput}
          price={setSortingInput}
        />
      </div>
    </div>
  );
}
