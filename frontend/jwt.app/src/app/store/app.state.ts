import { userModel } from "../user/user";
import { Profile } from"../user/user";
export interface AppState{
    allUser:userModel[];
}
export interface appProfile{
    userdetails:Profile;
}