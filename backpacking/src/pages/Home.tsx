import { getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import {
  Ijourney,
  IRating,
  IStoredJourney,
  Iuser,
} from "../interfaces/Interfaces";
import {
  getAllRatings,
  getJourneysRef,
  getStoredJRef,
  getUsersRef,
} from "../firebase-config";
import "../components/css/components.css";
import FilterBox from "../components/Home/FilterBox";
import SortingBox from "../components/SortingBox";
import ShowJourneys from "../components/ShowJourneys";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

export interface filterType {
  text: string;
  minPrice: number;
  maxPrice: number;
  minPriceActive: boolean;
  maxPriceActive: boolean;
}

export default function Home() {
  const [journeys, setJourneys] = useState<Ijourney[]>([]);
  const [storedJData, setStoredJData] = useState<IStoredJourney[]>([]);
  const [users, setUsers] = useState<Iuser[]>([]);
  const [ratings, setRatings] = useState<IRating[]>([]);

  const [whatToSortBy, setWhatToSortBy] = useState<string>("");
  const [searchInput, setSearchInput] = useState<filterType>({
    text: "",
    minPrice: 0,
    maxPrice: 0,
    minPriceActive: false,
    maxPriceActive: false,
  });

  useEffect(() => {
    try {
      const getData = async () => {
        await getUsersAndJourneys();
        // getPictures();
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getUsersAndJourneys = async () => {
    const [storedJData, journeyData, usersData] = await Promise.all([
      getDocs(getStoredJRef),
      getDocs(getJourneysRef),
      getDocs(getUsersRef),
    ]);

    setStoredJData(
      storedJData.docs.map(
        (journey) => ({ ...journey.data() } as IStoredJourney)
      )
    );

    const ratings = await getAllRatings();
    setRatings(ratings!);

    const localJourneys = journeyData.docs.map(
      (journey) => ({ ...journey.data() } as Ijourney)
    );
    setJourneys(
      journeyData.docs.map((journey) => ({ ...journey.data() } as Ijourney))
    );

    setUsers(usersData.docs.map((user) => ({ ...user.data() } as Iuser)));
  };

  return (
    <div className="content-container ">
      <ShowJourneys
        ratings={ratings}
        journeys={journeys}
        storedJData={storedJData}
        users={users}
        searchInput={searchInput}
        whatToSortBy={whatToSortBy}
      />

      <div className="fixed top-28 right-5 shadow-2xl w-1/5 p-5 min-h-3/4 dark:bg-theme-dark2 dark:text-theme-green rounded-md hover:dark:shadow-[0_35px_60px_-15px_rgba(201,239,199,0.3)]">
        <FilterBox
          maxPriceActive={setSearchInput}
          minPriceActive={setSearchInput}
          maxPrice={setSearchInput}
          minPrice={setSearchInput}
          text={setSearchInput}
        />

        <SortingBox
          whatToSortBy={whatToSortBy}
          setWhatToSortBy={setWhatToSortBy}
        />
      </div>
    </div>
  );
}
