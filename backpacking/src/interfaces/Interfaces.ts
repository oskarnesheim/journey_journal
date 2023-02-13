import { GeoPoint } from "firebase/firestore";

export interface Iuser{
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    email: string,
    age: number,
    isAdmin : boolean,
    description : string | null
}

export interface Ijourney{
    distanse: string,
    kostnad: string,
    userID: string,
    journeyPath: Array<GeoPoint>,
}