import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { RoomsWindowComponent } from './components/rooms-window/rooms-window.component';
import { RoomUsersWindowComponent } from './components/room-users-window/room-users-window.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';


const routes: Routes = [
  { path: '', component: LoginComponent,  canActivate: [AuthGuard] },
  { path: 'user', component: UserProfileComponent,  canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
