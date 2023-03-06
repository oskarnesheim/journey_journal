import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import CreateJourney from "../components/Profile/CreateJourney";
import JourneyCard from "../components/JourneyCard";
import { auth, getCollection } from "../firebase-config";
import { Ijourney, IStoredJourney, Iuser } from "../interfaces/Interfaces";
import { StoredUserJourneys, UserState } from "../recoil/atoms";

export default function Profile() {
  const [newPostToggle, setNewPostToggle] = useState(false); //? Velger om man skal lage en ny post eller ikke
  const [errorMessage, setErrorMessage] = useState<string>(""); //? Error message
  const [currentUser, setCurrentUser] = useRecoilState(UserState); //? Henter bruker fra recoil
  const [users, setUsers] = useState<Iuser[]>([]);

  const [userPosts, setUserPosts] = useState<Ijourney[]>([]); //? Henter alle brukerens poster
  const [storedJData, setStoredJData] = useState<IStoredJourney[]>([]);
  const [storedJourneys, setStoredJourneys] = useState<Ijourney[]>(
    {} as Ijourney[]
  );

  const [refreshPosts, setRefreshPosts] = useState<boolean>(false);
  const [OwnJourneysToggle, setOwnJourneysToggle] = useState<boolean>(true);

  const navigate = useNavigate();

  const getUsersRef = getCollection("users");
  const getJourneyRef = getCollection("journeys/");
  const getStoredJourneysRef = getCollection("storedJourneys/");

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/");
      return;
    }
    try {
      getJourneys();
    } catch (error) {
      console.log(error);
    }
  }, [refreshPosts]);

  const getJourneys = async () => {
    try {
      //? Henter alle brukerens poster
      const q = query(getJourneyRef);
      const data = await getDocs(q);
      const journeys: Ijourney[] = data.docs.map(
        (journeyData) => ({ ...journeyData.data() } as Ijourney)
      );

      const userJourneys: Ijourney[] = journeys.filter(
        (journey) => journey.uid === auth.currentUser?.uid
      );

      // //? Henter alle lagrede reiser sine IDer, hvem som la de ut og hvem som lagret dem
      const q2 = query(
        getStoredJourneysRef,
        where("uid", "==", auth.currentUser?.uid)
      );
      const data2 = await getDocs(q2);
      const storedJourneysData: IStoredJourney[] = data2.docs.map(
        (journeyData) => ({ ...journeyData.data() } as IStoredJourney)
      );

      const newStoredJourneys: Ijourney[] = [];
      storedJourneysData.forEach((storeData) => {
        journeys.forEach((journey) => {
          if (journey.journeyID === storeData.journeyID) {
            newStoredJourneys.push(journey);
          }
        });
      });

      const usersData = await getDocs(getUsersRef);

      setUsers(usersData.docs.map((user) => ({ ...user.data() } as Iuser)));
      setUserPosts(userJourneys.map((journey) => ({ ...journey } as Ijourney)));
      setStoredJourneys(
        newStoredJourneys.map((journey) => ({ ...journey } as Ijourney))
      );
      setStoredJData(
        storedJourneysData.map((journey) => ({ ...journey } as IStoredJourney))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const CreateJourneyFunc = () => {
    if (newPostToggle) {
      return (
        <CreateJourney
          refreshPosts={refreshPosts}
          setRefreshPosts={setRefreshPosts}
        />
      );
    }
  };

  const showJourneys = () => {
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

    if (userPosts?.length === 0 && storedJourneys?.length === 0) {
      return <h1>No journeys of your own or stored journeys</h1>;
    }
    return (
      <div className="p-5  w-full h-screen dark:text-theme-green dark:bg-theme-dark">
        <h3 className="font-semibold text-xl">Overview:</h3>

        <Tabs>
          <TabList>
            <Tab>Own Journeys</Tab>
            <Tab>Stored Journeys</Tab>
          </TabList>

          <TabPanels>
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
  };

  const whoHaveStoredJourney = (journey: Ijourney) => {
    return storedJData
      .filter((storedJ) => storedJ.journeyID === journey.journeyID)
      .map((storedJ) => storedJ);
  };
  const getAuthorName = (journey: Ijourney) => {
    return users.find((user) => user.uid === journey.uid)?.username;
  };

  return (
    <div className="w-full absolute top-40">
      <div>
        <h1 className="font-semibold text-xl">
          {" "}
          {!newPostToggle
            ? "Welcome back " +
              currentUser?.firstname +
              " " +
              currentUser?.lastname
            : ""}
        </h1>
        {CreateJourneyFunc()}
      </div>
      <button
        className="bg-theme-green hover:text-pink-500 font-bold py-2 px-4 rounded m-5"
        onClick={(e) => setNewPostToggle(!newPostToggle)}
      >
        {!newPostToggle ? "Click here to create a new journey" : "Back"}
      </button>
      <div className="journeyOverview w-full h-screen ">
        {!newPostToggle &&
          userPosts &&
          storedJData &&
          storedJourneys &&
          showJourneys()}
      </div>
    </div>
  );
}
