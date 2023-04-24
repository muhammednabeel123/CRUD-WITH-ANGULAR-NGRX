import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AdminRoutingModule } from './components/admin/admin-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import {HttpClientModule} from  '@angular/common/http'
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { HeaderComponent } from './components/admin/header/header.component';
import { ArticlesComponent } from './components/admin/articles/articles.component';
import { LoginAdminComponent } from './components/admin/login-admin/login-admin.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { EditAddComponent } from './components/admin/edit-add/edit-add.component';
import  { StoreModule } from '@ngrx/store'
// import { userReducer } from './store/user.reducer';
import { UserService } from './services/service.service';
 import { EffectsModule } from '@ngrx/effects';


//  import { userEffects } from './components/admin/articles/user.effect';

import { UserReducer, profileReducer } from './store/user.reducer';
import { userEffect } from './components/admin/articles/user.effect';
import { UserProfileComponent } from './components/user-profile/user-profile.component';









@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HeaderComponent,
    ArticlesComponent,
    LoginAdminComponent,
    UserEditComponent,
    EditAddComponent,
    UserProfileComponent
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    //  EffectsModule.forRoot([userEffects]),
    EffectsModule.forRoot([userEffect]),

    // StoreModule.forRoot({user:userReducer})
    StoreModule.forRoot({allUser:UserReducer,userdetails:profileReducer})
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
