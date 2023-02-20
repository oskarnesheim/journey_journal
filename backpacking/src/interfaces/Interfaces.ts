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
    journeyPath: Array<GeoPoint>,
    journeyID : string
}

export interface Ipost{
    title: string,
    startPlace: string,
    finishplace: string,
    cost: string,
    story: string,
}