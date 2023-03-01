import { atom } from "recoil";
import { Ijourney, IStoredJourney, Iuser } from "../interfaces/Interfaces";

export const UserState = atom({
    key : 'UserState',
    default : undefined as Iuser | undefined
})

export const JourneyState = atom({
    key : 'JourneyState',
    default : undefined as Ijourney | undefined
})

export const StoredUserJourneys = atom({
    key : 'StoredUserJourneys',
    default : undefined as IStoredJourney | undefined
})

