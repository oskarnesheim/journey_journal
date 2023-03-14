import { useEffect, useState } from "react";
import { Ijourney, IStoredJourney, Iuser } from "../interfaces/Interfaces";
import JourneyCard from "./JourneyCard";

type showJourneyProps = {
  journeys: Ijourney[];
  storedJData: IStoredJourney[];
  users: Iuser[];
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
}: showJourneyProps) {
  const [sortedJourneys, setSortedJourneys] = useState<Ijourney[]>([]);

  useEffect(() => {
    setSortedJourneys(journeys);
  }, [journeys]);

  useEffect(() => {
    filterBySearch();
  }, [searchInput]);

  useEffect(() => {
    console.log("whatToSortBy");
    console.log(whatToSortBy);

    if (whatToSortBy === "price") {
      sortJourneysByPrice();
    } else if (whatToSortBy === "likes") {
      sortByNumberOfLikes();
    } else if (whatToSortBy === "countries") {
      sortJourneysByNumberOfCountriesVisited();
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
    console.log(filteredByFilterBox);
    setSortedJourneys(filteredByFilterBox);
  };

  const sortJourneysByPrice = () => {
    var sortedJourneys = journeys.sort((a, b) => {
      if (a.cost == b.cost) return 0;
      return a.cost > b.cost ? -1 : 1;
    });

    setSortedJourneys([]);
    setSortedJourneys([...sortedJourneys]);
    console.log(sortedJourneys);
  };

  const sortByNumberOfLikes = () => {
    const sortedJourneys = journeys.sort((a, b) => {
      if (whoHaveStoredJourney(a).length == whoHaveStoredJourney(b).length)
        return 0;
      return whoHaveStoredJourney(a).length > whoHaveStoredJourney(b).length
        ? -1
        : 1;
    });

    setSortedJourneys([]);
    setSortedJourneys([...sortedJourneys]);
    console.log(sortedJourneys);
  };

  const sortJourneysByNumberOfCountriesVisited = () => {
    const sortedJourneys = journeys.sort((a, b) => {
      if (a.countries.length == b.countries.length) return 0;
      return a.countries.length > b.countries.length ? -1 : 1;
    });

    setSortedJourneys([]);
    setSortedJourneys([...sortedJourneys]);

    console.log(sortedJourneys);
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
