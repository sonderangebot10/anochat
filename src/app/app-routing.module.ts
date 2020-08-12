import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { RoomsWindowComponent } from './components/rooms-window/rooms-window.component';


const routes: Routes = [
  { path: '', component: DashboardComponent,  canActivate: [AuthGuard] },
  { path: 'user', component: UserProfileComponent,  canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'rooms', component: RoomsWindowComponent },

  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
