import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import {DashboardComponent} from "../pages/dashboard/dashboard.component";
import {AuthGuard} from "../services/auth.guard";
import {RegisterComponent} from "../pages/register/register.component";
import { CreateComponent } from '../pages/post/create/create.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { PostViewComponent } from '../pages/post/single-view/post-view/post-view.component';
import { ProfilePostViewComponent } from '../pages/post/profile-post-view/profile-post-view.component';

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
  {
    path: 'create',
    component: CreateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'my-posts',
    component: ProfilePostViewComponent, canActivate: [AuthGuard]
  },
  {
    path: 'single-view/:id',
    component: PostViewComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
