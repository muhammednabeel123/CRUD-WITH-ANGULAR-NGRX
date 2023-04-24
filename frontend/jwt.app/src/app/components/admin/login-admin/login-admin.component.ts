import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import Swal from 'sweetalert2'; 
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit  {

  form: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private http:HttpClient,
    private router:Router
  ){}
  ngOnInit(): void {
    console.log('hey there')
    this.form=this.formBuilder.group({
      email:'',
      password:'',
    })
  }

  submit():void{
    let admin = this.form.getRawValue() 
    console.log(admin)
    if(admin.email == '' || admin.password == ''){
      Swal.fire('Error','Please enter all the fields','error' )
    }
    else{
      this.http.post("http://localhost:5000/api/login-admin",admin,{
        withCredentials:true
      }).subscribe(
        (res) => this.router.navigate(['/admin/dashboard']),
        (err) => {
          Swal.fire("Error",err.error.message,"error")
        }
      )
    }
  }


}
