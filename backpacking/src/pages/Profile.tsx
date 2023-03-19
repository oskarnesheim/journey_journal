import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import CreateJourney from "../components/Profile/CreateJourney";
import JourneyCard from "../components/JourneyCard";
import {
  auth,
  getCollection,
  getJourneysRef,
  getStoredJRef,
  getUsersRef,
} from "../firebase-config";
import { Ijourney, IStoredJourney, Iuser } from "../interfaces/Interfaces";
import { StoredUserJourneys, UserState } from "../recoil/atoms";
import "../components/css/components.css";
import GeneralButton from "../components/GeneralButton";
import { ShowJourneys } from "../components/Profile/ShowJourneys";

export default function Profile() {
  const [newPostToggle, setNewPostToggle] = useState(false); //? Velger om man skal lage en ny post eller ikke
  const [currentUser, setCurrentUser] = useRecoilState(UserState); //? Henter bruker fra recoil
  const [users, setUsers] = useState<Iuser[]>([]);

  const [userPosts, setUserPosts] = useState<Ijourney[]>([]); //? Henter alle brukerens poster
  const [storedJData, setStoredJData] = useState<IStoredJourney[]>([]);
  const [storedJourneys, setStoredJourneys] = useState<Ijourney[]>(
    {} as Ijourney[]
  );

  const [refreshPosts, setRefreshPosts] = useState<boolean>(false);

  const navigate = useNavigate();

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
      const q = query(getJourneysRef);
      const data = await getDocs(q);
      const journeys: Ijourney[] = data.docs.map(
        (journeyData) => ({ ...journeyData.data() } as Ijourney)
      );

      const userJourneys: Ijourney[] = journeys.filter(
        (journey) => journey.uid === auth.currentUser?.uid
      );

      // //? Henter alle lagrede reiser sine IDer, hvem som la de ut og hvem som lagret dem
      const q2 = query(
        getStoredJRef,
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

  return (
    <div className="dark:text-theme-dark dark:bg-theme-dark profilePage">
      <div>
        <h1 className="font-semibold text-xl dark:text-theme-green pt-10">
          {" "}
          {!newPostToggle
            ? "Welcome back " +
              currentUser?.firstname +
              " " +
              currentUser?.lastname
            : ""}
        </h1>
        {newPostToggle && (
          <CreateJourney
            refreshPosts={refreshPosts}
            setRefreshPosts={setRefreshPosts}
            newPostToggle={newPostToggle}
            setNewPostToggle={setNewPostToggle}
          />
        )}
      </div>
      <GeneralButton
        description={
          !newPostToggle ? "Click here to create a new journey" : "Back"
        }
        onClick={() => setNewPostToggle(!newPostToggle)}
      />
      <div className="journeyOverview">
        {userPosts && storedJData && storedJourneys && (
          <ShowJourneys
            storedJData={storedJData}
            storedJourneys={storedJourneys}
            users={users}
            anyStoredJourneys={storedJourneys?.length !== 0}
            anyUserPosts={userPosts?.length !== 0}
            userPosts={userPosts}
          />
        )}
      </div>
    </div>
  );
}
