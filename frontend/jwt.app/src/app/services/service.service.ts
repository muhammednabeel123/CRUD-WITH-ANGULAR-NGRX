 import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import { Profile, userModel } from '../user/user';

 @Injectable({
       providedIn: 'root'
 })
 export class UserService {
   constructor(private http: HttpClient) {}

//    getUser(): Observable<any> {
//      return this.http.get('http://localhost:5000/api/getUser');   }

    getEmployeesBy(data:any){
        return this.http.get<any>(`http://localhost:5000/api/edit/${data}`)
    } 

    editEmployeesBy(id:any,data:any){
        return this.http.put<any>(`http://localhost:5000/api/editUser/${id}`,data)
    }

    loadUser(){
        console.log('service');
        
        return this.http.get<userModel[]>('http://localhost:5000/api/getUser');
     }

     loadProfile(){
        console.log('hey there')
        return this.http.get('http://localhost:5000/api/user',{withCredentials:true});

        
     }
 }






function getEmployeesBy(data: any, any: any) {
    throw new Error('Function not implemented.');
}

