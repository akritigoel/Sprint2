import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';
import { UpdateComponent } from './update/update.component';
import { TestComponent } from './test/test.component';
import { MytestComponent } from './mytest/mytest.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:'',redirectTo:'user',pathMatch:'full'},
  {path:'sign-up',component:SignUpComponent},
  {path:'list-user',component:ListUserComponent},
  {path:'update/:id',component:UpdateComponent},
  {path:'test',component:TestComponent},
  {path:'mytest/:id',component:MytestComponent},
  {path:'home',component:HomeComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
