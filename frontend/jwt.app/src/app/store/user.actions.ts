import { createAction,props } from "@ngrx/store";
import { userModel } from "../user/user";
import { Profile } from "../user/user";
// export const retreievedUser = createAction(
//     '[User API] API Success',props<{allUser:userModel[]}>()

// )

export const invokeUserAPI = createAction(
    '[user API] Invoke API'
)
console.log("asdassadasdasdasdasdasdsadas")

export const FetchUserAPI = createAction(
    '[user API]  fetch api success',
    props<{allUser:userModel[]}>()

)
console.log("asdasdasdasdsadas")

export const retrieveprofile=createAction('[profile API]API success',

)

export const retrieveprofileSucces=createAction('[Profile API]API SuccessSuccess',
props<{ userdetails: Profile }>()
)