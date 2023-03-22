import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { Ijourney, IStoredJourney, Iuser } from "../../interfaces/Interfaces";
import JourneyCard from "../JourneyCard";

type ShowJourneysProps = {
  userPosts: Ijourney[];
  storedJData: IStoredJourney[];
  users: Iuser[];
  storedJourneys: Ijourney[];
  anyUserPosts: boolean;
  anyStoredJourneys: boolean;
};

export function ShowJourneysProfile({
  userPosts,
  storedJourneys,
  users,
  anyUserPosts,
  anyStoredJourneys,
  storedJData,
}: ShowJourneysProps) {
  const journeyView = (fromList: Ijourney[]) => {
    return Array.isArray(fromList) ? (
      fromList.map((journey) => (
        <JourneyCard
          authorUsername={getAuthorName(journey)!}
          fromWhatPage="profile"
          key={journey.journeyID}
          journey={journey}
          usersThatStoredJourney={whoHaveStoredJourney(journey)}
        />
      ))
    ) : (
      <div>Her gikk noe galt.</div>
    );
  };

  if (!anyUserPosts && !anyStoredJourneys) {
    return <h1>No journeys of your own or stored journeys</h1>;
  }

  const whoHaveStoredJourney = (journey: Ijourney) => {
    return storedJData
      .filter((storedJ) => storedJ.journeyID === journey.journeyID)
      .map((storedJ) => storedJ);
  };
  const getAuthorName = (journey: Ijourney) => {
    return users.find((user) => user.uid === journey.uid)?.username;
  };
  return (
    <div className="p-5 dark:text-theme-green dark:bg-theme-dark journeyOverview">
      <h3 className="font-semibold text-xl">Overview:</h3>

      <Tabs>
        <TabList>
          <Tab>Own Journeys</Tab>
          <Tab>Stored Journeys</Tab>
        </TabList>

        <TabPanels className="dark:bg-theme-dark w-screen">
          <TabPanel>
            <div>{journeyView(userPosts)}</div>
          </TabPanel>
          <TabPanel>
            <div>{journeyView(storedJourneys)}</div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
