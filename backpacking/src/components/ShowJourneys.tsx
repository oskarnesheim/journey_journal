import { useEffect } from "react";
import { Ijourney, IStoredJourney, Iuser } from "../interfaces/Interfaces";
import JourneyCard from "./JourneyCard";

type journeysP = {
  journeys: Ijourney[] | undefined;
  getAuthorName: (journey: Ijourney) => string | undefined;
  whoHaveStoredJourney: (journey: Ijourney) => IStoredJourney[];
};

function ShowJourneys({
  journeys,
  getAuthorName,
  whoHaveStoredJourney,
}: journeysP) {
  useEffect(() => {
    console.log("ShowJourneys");
    console.log(journeys);
  });

  return (
    <div>
      {journeys?.map((journey) => (
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
