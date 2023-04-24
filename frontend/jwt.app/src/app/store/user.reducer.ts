import {createReducer, on,StoreModule } from '@ngrx/store'
import { Profile, userModel } from '../user/user';
import { FetchUserAPI,retrieveprofileSucces  } from './user.actions';
import { state } from '@angular/animations';


// export  const initialState :userModel[] = [];   
// const _userReducer = createReducer(
//     initialState,
//     on(retreievedUser,(state,{allUser})=>{
//         if (Array.isArray(allUser)) {
//             return [...allUser];
//         }
//         return state;
//     })
// )
// export function userReducer(state:any,action:any){
//     return _userReducer(state,action)

// }
// console.log(_userReducer,"this is user reducer")

export const initialState:userModel[]=[]

 const _UserReducer = createReducer(
    initialState,
    on(FetchUserAPI,(state,{allUser})=>{
        return [...allUser]
    })


   
)

export function UserReducer(state:any,action:any){
    return _UserReducer(state,action)
    
}
export const initialStateofUser:Profile={
    _id:"",
    name:"",
    email:"",
    password:"",
    image:"",
    __v:"",
}



const _profileReducer=createReducer(
    initialStateofUser,
    on(retrieveprofileSucces,(state,{userdetails})=>{
        return userdetails
    })
)

export function profileReducer(state:any,action:any){
    return _profileReducer(state,action);
  }