import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from 'src/app/emitters/emitters';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authenticated = false 
  constructor(private http:HttpClient){}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth:boolean)=>{
      this.authenticated = auth
    } )
  }

  logoutAdmin():void{
    console.log("anything")
    this.http.post('http://localhost:5000/api//logout-admin',{},{withCredentials:true}).subscribe(()=>this.authenticated = false)
  }

}
