import { GeoPoint } from "firebase/firestore";

export interface Iuser{
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    email: string,
    age: number,
    isAdmin : boolean,
    description : string | undefined,
    uid : string
}

export interface Ijourney{
    title: string,
    distance: string,
    description: string,
    cost: number,
    uid: string,
    countries: string[],
    journeyID : string
}

export type IStoredJourney = {
    uid : string,
    author : string,
    journeyID : string
}