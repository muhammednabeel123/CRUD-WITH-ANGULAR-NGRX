import { Component, NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { ArticlesComponent } from './articles/articles.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { EditAddComponent } from './edit-add/edit-add.component';



const routes: Routes = [
  {
    path:'admin',component:LoginAdminComponent
  },
  {path:'admin',children:[{
    path:'categories',component:CategoriesComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'users',component:ArticlesComponent },
    {path:'create',component:EditAddComponent },
     {path:'edit/:id',component:EditAddComponent}]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
  ,
  exports: [RouterModule]
})
export class AdminRoutingModule { }
