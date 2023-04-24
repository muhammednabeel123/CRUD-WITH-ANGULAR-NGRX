import { Component } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Profile } from 'src/app/user/user';
import { retrieveprofile } from 'src/app/store/user.actions';
import { FormBuilder, FormGroup } from '@angular/forms';
import { userProfile } from 'src/app/store/user.selector';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})


export class UserProfileComponent {

  public name: any = ""
  public email: any = ""
  public img: any = ""
  public state: boolean | any = false
  public state1: boolean | any = true
  form: FormGroup | any
  selectedFile: any | File = null;

  sss$=this.store.pipe(select(userProfile)).subscribe(userProfileData => {
    // Extract the necessary values from the userProfileData object
   this.name = userProfileData.name;
    this.email = userProfileData.email;
    this.img = userProfileData.image;
    if (userProfileData.image == null) {
      this.state = false
      this.state1 = true
    } else {
      this.state = true
      this.state1 = false
    }
  })
  constructor(private http:HttpClient,private store:Store<{userdetails:Profile}>, private router: Router,private formBuilder: FormBuilder){}
  ngOnInit():void{
    this.form = this.formBuilder.group({
      image: [''],
    }),
      this.http.get('http://localhost:5000/api/user',{
        withCredentials:true
      }).subscribe((response: any) => {
        this.store.dispatch(retrieveprofile())
        // this.router.navigate(['/profile']);
        Emitters.authEmitter.emit(true)
      }, (err) => {
        this.router.navigate(['/']);
        Emitters.authEmitter.emit(false)
      })
      console.log( this.name ,"this is name")
   

  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0]
  }


  onSubmit() {
    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    console.log(formData);
    this.http.post('http://localhost:5000/api/profile-upload-single', formData, {
      withCredentials: true
    }).subscribe((response: any) => {
      // this.appService.loadProfile()
      // .subscribe((data) => {
        Emitters.authEmitter.emit(true)
        this.store.dispatch(retrieveprofile())
      // })
      Emitters.authEmitter.emit(true)
      Swal.fire('Success', "Saved", "success")
    }, (err) => {
      Swal.fire('Error', err.error.message, "error")
    })
  }
}





