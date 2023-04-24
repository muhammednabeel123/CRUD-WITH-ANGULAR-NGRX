import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/router';
import { UserService } from 'src/app/services/service.service';


@Component({
  selector: 'app-edit-add',
  templateUrl: './edit-add.component.html',
  styleUrls: ['./edit-add.component.css']
})
export class EditAddComponent implements OnInit {
  selectedFile: any ;
  id:any
  constructor(private empService:UserService, private http:HttpClient,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
   if (this.id) {
    this.empService.getEmployeesBy(this.id).subscribe((res:any)=>{
      console.log({res})
      this.data=res.item
    
    })

    
   }
  };

  onFileSelected(event:any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile,"this")
  }



  
  
  name:string

  data = {
    name:'sadas',
    email:'',
    password:''

  }

  onSubmit(){
    if(this.id){
     
console.log("hey is there you")
          
      this.empService.editEmployeesBy(this.id,this.data).subscribe((res:any)=>{
        console.log(res,"this is response")
        this.router.navigate(['/admin/users'])
       

      })
    
      
    }else{
      console.log("are you wroking");
      
      const fd = new FormData();
      fd.append('file', this.selectedFile,this.selectedFile.name,);
      fd.append('name', this.data.name);
      fd.append('email', this.data.email);
      fd.append('password', this.data.password);
      this.http.post('http://localhost:5000/api/register', fd)
        .subscribe(res => {
          this.http.post('http://localhost:5000/api/register', fd)
          this.router.navigate(['/admin/users'])
        });
    
      // this.http.post("http://localhost:5000/api/register",this.data).subscribe((res:any)=>{
      //   console.log(res)
       
        //  this.router.navigate(['/admin/users'])
         
  
      // })
      
    }
   
  }



}
