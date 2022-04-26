import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import {DashboardComponent} from "../pages/dashboard/dashboard.component";
import {AuthGuard} from "../services/auth.guard";
import {RegisterComponent} from "../pages/register/register.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
