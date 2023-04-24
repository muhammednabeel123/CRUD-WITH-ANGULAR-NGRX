import { ChangeDetectorRef, Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UserEditComponent } from '../../user-edit/user-edit.component';
import { LoginAdminComponent } from '../login-admin/login-admin.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/service.service';
import { select,Store } from '@ngrx/store'
import {  FetchUserAPI, invokeUserAPI,  } from 'src/app/store/user.actions';
import { userModel } from 'src/app/user/user';
import { selectUser } from 'src/app/store/user.selector';
// import { uniqueUserIds } from 'src/app/store/user.selector';
 
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent  implements OnInit  {
  
  url:string = "http://localhost:5000/";
  email:any;
  
  //  $userId = this.store.pipe(select(uniqueUserIds))
    //  users$ = this.store.pipe(select(selectUser))
   
  

  constructor(private http:HttpClient, private cd: ChangeDetectorRef,private router:Router,private userService:UserService, private store:Store<{allUser:userModel[]}> ){}
  users$ = this.store.pipe(select(selectUser))
  ngOnInit(): void {
    // this.http.get('http://localhost:5000/api/getUser').subscribe((res:any) => {
    //   this.user = res
    //   console.log(this.user,"hey therw")
     
    // }) 
    //  this.store.pipe(select(uniqueUserIds))
   
    // console.log(this.store.pipe(select(selectUser)));
    

    // this.userService.loadUser().subscribe((data:any)=>{
    //   this.store.dispatch(FetchUserAPI({allUser:data as userModel[]}))
    // })
    

       this.store.dispatch(invokeUserAPI())
       

    
  } 
  
  onDelete(index: any){
    console.log(index);
    this.http.delete(`http://localhost:5000/api/deleteUser?id=${index}`).subscribe(response => {
      console.log(response);
      this.store.dispatch(invokeUserAPI())
      // Remove deleted user from local array
      // this.allUser.splice(index, 1 );
      // Use Angular's change detection to update the UI
      this.cd.detectChanges();
    }, error => {
      console.error(error);
    });
  }
  
  onEdit(index:any){
    console.log('hey nabeel')
    this.store.dispatch(invokeUserAPI())
    this.router.navigate([`/admin/edit/${index}`])
    
  }
  openAddEditForm() {
    console.log("hey there")
    this.router.navigate(['/admin/create'])
  }
 

}
  
  


