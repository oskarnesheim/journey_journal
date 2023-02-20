import { atom } from "recoil";
import { Iuser } from "../interfaces/Interfaces";

export const UserState = atom({
    key : 'UserState',
    default : undefined as Iuser | undefined
})

