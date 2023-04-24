import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CategoriesComponent } from './components/admin/categories/categories.component';
import { ArticlesComponent } from './components/admin/articles/articles.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [{
  path:'',component:HomeComponent

},{
  path:'login',component:LoginComponent
},
{
  path:'register',component:RegisterComponent
},
{
  path:'profile',component:UserProfileComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
