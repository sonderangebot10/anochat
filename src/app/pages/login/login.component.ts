import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  groupIdValue: string;
  groupPasswordValue: string;

  constructor(public auth: AuthService, private router: Router) {
    if (auth.user$) {
      this.router.navigate(['/user']);
    }
  }

  onJoin() {
    console.log(this.groupIdValue);
  }
}
