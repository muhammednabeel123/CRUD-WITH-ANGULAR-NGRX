import {  createSelector } from '@ngrx/store'
import { AppState,appProfile, } from './app.state'
import { userModel,Profile} from '../user/user';
import { createFeatureSelector} from '@ngrx/store'


 export const userRootSelector = (state:AppState)=> state.allUser;
// export const uniqueUserIds = createSelector(
//         userRootSelector,(user:userModel[])=>{
//             return user;
//         }
// )

// export const userIdsSelector = createSelector(
//   userRootSelector,
//   users => users.map(user => user._id)
// );

// export const selectUser = createFeatureSelector<userModel[]>("myusers")

// function userRootSelector(state: unknown): userModel[] {
//     throw new Error('Function not implemented.');
// }
console.log("helloasdasdasdsdasdas")
export const selectUser  =  createSelector(
    userRootSelector,(allUser:userModel[])=>{
        
        return[...allUser]
    }
)
export const profileRootSelector=(state:appProfile)=>state.userdetails;
export const userProfile=createSelector(
    profileRootSelector,
    (userdetails:Profile)=>{
        return userdetails
    }
)
console.log("hellosdasdas")