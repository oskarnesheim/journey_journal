import { atom } from "recoil";
import { Ijourney, Iuser } from "../interfaces/Interfaces";

export const UserState = atom({
    key : 'UserState',
    default : undefined as Iuser | undefined
})

export const JourneyState = atom({
    key : 'JourneyState',
    default : undefined as Ijourney | undefined
})
