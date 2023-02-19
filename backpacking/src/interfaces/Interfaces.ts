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
    userID: string,
    journeyPath: Array<GeoPoint>,
}