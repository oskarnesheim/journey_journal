import { query, where, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { database, getAllRatings } from "../firebase-config";
import {
  Ijourney,
  IRating,
  IStoredJourney,
  Iuser
} from "../interfaces/Interfaces";
import { getAverageRating } from "../pages/JourneyPage";
import { UserState } from "../recoil/atoms";
import JourneyCard from "./JourneyCard";

type showJourneyProps = {
  journeys: Ijourney[];
  storedJData: IStoredJourney[];
  users: Iuser[];
  ratings: IRating[];
  searchInput: {
    text: string;
    minPrice: number;
    maxPrice: number;
    minPriceActive: boolean;
    maxPriceActive: boolean;
  };
  whatToSortBy: string;
};

function ShowJourneys({
  journeys,
  storedJData,
  users,
  searchInput,
  whatToSortBy,
  ratings,
}: showJourneyProps) {
  const [sortedJourneys, setSortedJourneys] = useState<Ijourney[]>([]);
  const [user, setUser] = useRecoilState(UserState);

  useEffect(() => {
    setSortedJourneys(journeys);
  }, [journeys]);

  useEffect(() => {
    filterBySearch();
  }, [searchInput]);

  useEffect(() => {
    if (whatToSortBy === "price") {
      sortJourneysByPrice();
    } else if (whatToSortBy === "likes") {
      sortByNumberOfLikes();
    } else if (whatToSortBy === "countries") {
      sortJourneysByNumberOfCountriesVisited();
    } else if (whatToSortBy === "rating") {
      sortByRating();
    } else {
      setSortedJourneys(journeys);
    }
  }, [whatToSortBy]);

  const filterBySearch = () => {
    const allCountriesString = (journeys: Ijourney) => {
      const countries = journeys.countries.map((country) => country);
      return countries.join(" ");
    };
    if (
      searchInput.text === "" &&
      !searchInput.maxPriceActive &&
      !searchInput.minPriceActive
    )
      return journeys;
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
    setSortedJourneys(filteredByFilterBox);
  };

  const whoHaveStoredJourney = (journey: Ijourney) => {
    return storedJData
      .filter((storedJ) => storedJ.journeyID === journey.journeyID)
      .map((storedJ) => storedJ);
  };

  const getAuthorName = (journey: Ijourney) => {
    return users.find((user) => user.uid === journey.uid)?.username;
  };

  const filterByFilterBox = (journey: Ijourney) => {
    if (searchInput.minPriceActive && journey.cost < searchInput.minPrice) {
      return false;
    }
    if (searchInput.maxPriceActive && journey.cost > searchInput.maxPrice) {
      return false;
    }
    return true;
  };

  //? Sort functions

  const sortJourneysByPrice = () => {
    var sortedJourneys = journeys.sort((a, b) => {
      if (a.cost === b.cost) return 0;
      return a.cost > b.cost ? -1 : 1;
    });

    setSortedJourneys([]);
    setSortedJourneys([...sortedJourneys]);
  };

  const sortByNumberOfLikes = () => {
    const sortedJourneys = journeys.sort((a, b) => {
      const aLikes = whoHaveStoredJourney(a).length;
      const bLikes = whoHaveStoredJourney(b).length;

      if (aLikes === bLikes) return 0;
      return aLikes > bLikes ? -1 : 1;
    });

    setSortedJourneys([]);
    setSortedJourneys([...sortedJourneys]);
  };

  const sortJourneysByNumberOfCountriesVisited = () => {
    const sortedJourneys = journeys.sort((a, b) => {
      const numOfCountriesA = a.countries.length;
      const numOfCountriesB = b.countries.length;

      if (numOfCountriesA === numOfCountriesB) return 0;
      return numOfCountriesA > numOfCountriesB ? -1 : 1;
    });

    setSortedJourneys([]);
    setSortedJourneys([...sortedJourneys]);
  };

  async function sortByRating() {
    const averageRating = (journey: Ijourney) => {
      var avg = 0;
      var numberOfRatings = 0;

      ratings?.forEach((rating) => {
        if (rating.journeyID === journey.journeyID) {
          avg += rating.rating;
          numberOfRatings++;
        }
      });
      if (numberOfRatings === 0) return -1;
      return avg / numberOfRatings;
    };

    const getUserSavedJourneys = async () => {
      const likedJourneyID: string[] = []; 
      const likedJourneyIDRef = collection(database, "storedJourneys");
      const querySnapshot = await getDocs(
        query(likedJourneyIDRef, where("uid", "==", user?.uid))
      );
      querySnapshot.forEach((doc) => {
        const likedCountriesData = doc.data();
        likedJourneyID.push(likedCountriesData.journeyID);
      });
      console.log(likedJourneyID)
      return likedJourneyID
    };

    const getStoredCountries = async () => {
      const likedJourneyID: string[] = await getUserSavedJourneys();
      const likedCountries: string[] = [];

      const journeysRef = collection(database, "journeys");
      const querySnapshot = await getDocs(query(journeysRef, where("journeyID", "in", likedJourneyID)));
    
      const countryArrays = querySnapshot.docs.map((doc) => {
        const journeyData = doc.data();
        return journeyData.countries;
      });
    
      const flattenedCountryArray = countryArrays.flat();
      const uniqueCountries = [...new Set(flattenedCountryArray)];

      console.log(uniqueCountries)
      return uniqueCountries;
    };

    const getTailoredPosts = async () => {
      const storedCountries: string[] = await getStoredCountries();
      const tailoredJourneys: Ijourney[] = []

      const querySnapshot = await getDocs(
        query(collection(database, "journeys"), where("countries", "array-contains-any", storedCountries))
      );
      querySnapshot.forEach((doc) => {
        const tailoredJourney = doc.data();
        const myJourney: Ijourney = {
          title: tailoredJourney.title,
          description: tailoredJourney.des,
          cost: tailoredJourney.cost,
          uid: tailoredJourney.uid,
          countries: tailoredJourney.countries,
          journeyID: tailoredJourney.journeyID,
        };
        tailoredJourneys.push(myJourney)
      });

      return tailoredJourneys
    };

   
    const sortedJourneys = journeys.sort((a, b) => {
      const averageA = averageRating(a);
      const averageB = averageRating(b);

      if (averageA === averageB) return 0;
      return averageA > averageB ? -1 : 1;
    });

    setSortedJourneys([]);
    setSortedJourneys([...sortedJourneys]);
  }
  return (
    <div>
      {sortedJourneys?.map((journey) => (
        <JourneyCard
          authorUsername={getAuthorName(journey)!}
          fromWhatPage="home"
          key={journey.journeyID}
          journey={journey}
          usersThatStoredJourney={whoHaveStoredJourney(journey)}
        />
      ))}
    </div>
  );
}

export default ShowJourneys;
