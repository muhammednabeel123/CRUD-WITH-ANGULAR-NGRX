import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap,map,tap, switchMap  } from "rxjs/operators"
import { UserService } from "src/app/services/service.service";
import { FetchUserAPI, invokeUserAPI,retrieveprofile,retrieveprofileSucces  } from "src/app/store/user.actions";
import { Profile } from "src/app/user/user";


// @Injectable()
// export class userEffects{
//     constructor( private $actions:Actions,private userService:UserService) {}
//     $loadUser = createEffect(()=>
//     this.$actions.pipe(
//       ofType('[user API] Invoke API'),
//       tap(() => console.log('Triggering API call...')),
//       mergeMap(() =>
//         this.userService.loadUser().pipe(
//           tap((data) => console.log('API call successful:', data)),
//           map(() => ({ type:'[User API] API Success' }))
//         )
//       )
//     )
//   );
  


// }



// function FetchUserAPI(_arg0: { allUser: any; }): any {
//     throw new Error("Function not implemented.");
// }

@Injectable()


export class userEffect {
    constructor(private actions$:Actions,private userService:UserService){}

    loadAllBooks$ = createEffect(()=>
        this.actions$.pipe(
            ofType(invokeUserAPI),
            switchMap(()=>{
                return this.userService.loadUser().pipe(
                    tap((data) => console.log(data,"yhis is data")),
                    map((data)=> FetchUserAPI({allUser:data})
                    )
                )
            })
        )
    );




    loadProfile$=createEffect(()=>
   this.actions$.pipe(
    ofType(retrieveprofile),
    switchMap(()=>{
       return this.userService.loadProfile()
       .pipe(map((data)=>retrieveprofileSucces({userdetails:data as Profile })
     ))
        
    })
   )
   )
}
